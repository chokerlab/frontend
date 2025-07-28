"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = (_pageParam === 1) ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  // 打印请求参数
  console.log("=== listProducts API 请求参数 ===")
  console.log("countryCode:", countryCode)
  console.log("regionId:", regionId)
  console.log("region:", region)
  console.log("queryParams:", queryParams)
  console.log("limit:", limit)
  console.log("offset:", offset)

  // 构建查询参数，将 handle 从 queryParams 中提取出来
  const { handle, ...otherQueryParams } = (queryParams as any) || {}
  
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...(handle && { handle }),
          ...otherQueryParams,
        },
        headers,
        next,
        cache: "no-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      // 打印 API 返回的数据
      console.log("=== listProducts API 返回数据 ===")
      console.log("products count:", count)
      console.log("products array:", products)
      console.log("nextPage:", nextPage)
      
      // 如果有产品，打印第一个产品的详细信息
      if (products && products.length > 0) {
        console.log("=== 第一个产品详细信息 ===")
        console.log("Product ID:", products[0].id)
        console.log("Product Title:", products[0].title)
        console.log("Product Handle:", products[0].handle)
        console.log("Product Description:", products[0].description)
        console.log("Product Variants:", products[0].variants)
        console.log("Product Images:", products[0].images)
        console.log("Product Thumbnail:", products[0].thumbnail)
        console.log("Product Collection:", products[0].collection)
        console.log("Product Tags:", products[0].tags)
        console.log("Product Metadata:", products[0].metadata)
      } else {
        console.log("=== 没有找到产品 ===")
      }

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
    .catch((error) => {
      // 打印错误信息
      console.error("=== listProducts API 错误 ===")
      console.error("Error:", error)
      throw error
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
