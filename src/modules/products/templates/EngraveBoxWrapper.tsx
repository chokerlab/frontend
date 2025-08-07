"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HttpTypes } from "@medusajs/types";
import EngraveBox from "./EngraveBox";
import { isEqual } from "lodash";

type EngraveBoxWrapperProps = {
  product: HttpTypes.StoreProduct;
};

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

const EngraveBoxWrapper: React.FC<EngraveBoxWrapperProps> = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | undefined>>({});

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options);
      setSelectedOptions(variantOptions ?? {});
    }
  }, [product.variants]);

  // Find the currently selected variant based on options
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return undefined;
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, selectedOptions);
    });
  }, [product.variants, selectedOptions]);
  // Get images to display - either variant images from metadata or product images
  const imagesToDisplay = useMemo(() => {
    console.log('Selected variant:', selectedVariant);
    console.log('Variant metadata:', selectedVariant?.metadata);

    // If we have a selected variant and it has images in metadata, use those
    if (selectedVariant?.metadata?.images && Array.isArray(selectedVariant.metadata.images) && selectedVariant.metadata.images.length > 0) {
      console.log('Using variant images from metadata:', selectedVariant.metadata.images);
      // Convert metadata images to the expected format
      // The images are objects with url property: { url: "..." }
      return selectedVariant.metadata.images
        .filter((imageObj: any) => imageObj && typeof imageObj === 'object' && imageObj.url && typeof imageObj.url === 'string' && imageObj.url.trim() !== '')
        .map((imageObj: any, index: number) => ({
          id: `variant-${selectedVariant.id}-${index}`,
          url: imageObj.url,
          rank: index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          metadata: null,
        }));
    }

    // If variant has a thumbnail in metadata, use that
    if (selectedVariant?.metadata?.thumbnail && typeof selectedVariant.metadata.thumbnail === 'string' && selectedVariant.metadata.thumbnail.trim() !== '') {
      console.log('Using variant thumbnail from metadata:', selectedVariant.metadata.thumbnail);
      return [{
        id: `variant-${selectedVariant.id}-thumbnail`,
        url: selectedVariant.metadata.thumbnail,
        rank: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
      }];
    }

    console.log('Falling back to product images:', product.images);
    // Otherwise, fall back to product images (also filter out empty URLs)
    return (product.images || []).filter(image => image.url && image.url.trim() !== '');
  }, [selectedVariant, product.images]);

  // Get the main image URL for the image generation
  const mainImageUrl = useMemo(() => {
    const url = imagesToDisplay.length > 0 ? imagesToDisplay[0].url : undefined;
    console.log('Main image URL:', url);
    return url;
  }, [imagesToDisplay]);

  // Listen for variant selection changes from ProductActions component
  useEffect(() => {
    const handleVariantChange = (event: CustomEvent) => {
      const { options } = event.detail;
      setSelectedOptions(options);
      console.log('Variant changed:', options);
    };

    window.addEventListener('variantChanged', handleVariantChange as EventListener);

    return () => {
      window.removeEventListener('variantChanged', handleVariantChange as EventListener);
    };
  }, []);

  console.log('Images to display:', imagesToDisplay);
  console.log('Images to display length:', imagesToDisplay.length);

  return (
    <EngraveBox
      images={imagesToDisplay}
      imageUrl={mainImageUrl}
      product={product}
    />
  );
};

export default EngraveBoxWrapper;
