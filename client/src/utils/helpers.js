export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function getBundleKey(productId, variantId) {
  return variantId != null ? `${productId}|${variantId}` : productId;
}
