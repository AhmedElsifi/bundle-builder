import { useBundle } from "./useBundle";
import { getBundleKey } from "../utils/helpers";

export default function useSelectedCount(items) {
  const { items: bundleItems, plan } = useBundle();

  return items?.reduce((sum, item) => {
    if (item.billing_period) return sum + (plan === item.id ? 1 : 0);
    if (item.variants?.length > 0) {
      return sum + item.variants.reduce((s, v) => s + (bundleItems[getBundleKey(item.id, v.id)] ? 1 : 0), 0);
    }
    return sum + (bundleItems[item.id] ? 1 : 0);
  }, 0) ?? 0;
}
