import { useState } from "react";
import { useBundle } from "../context/BundleContext";

export default function useProductSelection(product) {
  const { items: bundleItems, add, remove } = useBundle();
  const hasVariants = product.variants?.length > 0;
  const [activeVariant, setActiveVariant] = useState(
    hasVariants ? product.variants[0].id : null,
  );

  const activeKey = hasVariants ? `${product.id}|${activeVariant}` : product.id;
  const activeItem = bundleItems[activeKey];
  const inBundle = !!activeItem;
  const qty = activeItem?.qty ?? 0;

  const currentImage = hasVariants
    ? product.variants.find((v) => v.id === activeVariant)?.image || product.image
    : product.image;

  const toggleBundle = () => {
    if (activeItem) remove(product.id, activeVariant);
    else add(product.id, activeVariant);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    add(product.id, activeVariant);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    remove(product.id, activeVariant);
  };

  return {
    hasVariants,
    activeVariant,
    setActiveVariant,
    inBundle,
    qty,
    currentImage,
    toggleBundle,
    handleAdd,
    handleRemove,
  };
}
