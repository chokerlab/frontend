"use client";

import React, { useEffect, useMemo } from "react";
import { HttpTypes } from "@medusajs/types";
import EngraveBox from "./EngraveBox";

type EngraveBoxWrapperProps = {
  product: HttpTypes.StoreProduct;
};

const EngraveBoxWrapper: React.FC<EngraveBoxWrapperProps> = ({ product }) => {

  // Get images to display - for now, just use product images
  // In a future implementation, you would need to extend the Medusa backend
  // to support variant-specific images and modify this logic accordingly
  const imagesToDisplay = useMemo(() => {
    // For now, always use product images
    // TODO: Implement variant-specific image logic when backend supports it
    return product.images || [];
  }, [product.images]);

  // Get the main image URL for the image generation
  const mainImageUrl = useMemo(() => {
    return imagesToDisplay.length > 0 ? imagesToDisplay[0].url : undefined;
  }, [imagesToDisplay]);

  // Listen for variant selection changes from ProductActions component
  // This is prepared for future implementation when variant images are supported
  useEffect(() => {
    const handleVariantChange = (event: CustomEvent) => {
      const { options } = event.detail;
      // TODO: Update image display based on selected variant when backend supports variant images
      console.log('Variant changed:', options);
    };

    window.addEventListener('variantChanged', handleVariantChange as EventListener);
    
    return () => {
      window.removeEventListener('variantChanged', handleVariantChange as EventListener);
    };
  }, []);

  return (
    <EngraveBox 
      images={imagesToDisplay} 
      imageUrl={mainImageUrl} 
      product={product} 
    />
  );
};

export default EngraveBoxWrapper;