import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function LatestDrops({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: latestProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 3, // 只显示前3个产品
      fields: "*variants.calculated_price",
      order: "created_at", // 按创建时间排序，最新的在前
    },
  })

  if (!latestProducts || latestProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between items-center mb-8">
        <Text className="txt-xlarge font-bold text-[#7c3aed]">Latest Drops</Text>
        <InteractiveLink href={`/${region.currency_code.toLowerCase()}/store`}>
          View all
        </InteractiveLink>
      </div>
      
      <div className="grid grid-cols-1 small:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ProductPreview product={product} region={region} isFeatured />
          </div>
        ))}
      </div>
    </div>
  )
} 