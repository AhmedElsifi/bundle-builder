import { useBundle } from "../../context/BundleContext";
import ProductCard from "./ProductCard";
import PlanCard from "./PlanCard";

export default function Products({ items }) {
  const { plan, setPlan } = useBundle();

  if (!items || items.length === 0) {
    return <p className="text-sm text-charcoal-gray text-center py-4">No items available.</p>;
  }

  const isPlan = !!items[0]?.billing_period;

  const isOdd = items.length % 2 === 1;

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, i) => {
        const isLastOdd = isOdd && i === items.length - 1;
        return (
          <div key={item.id} className={isLastOdd ? "col-span-2 flex justify-center" : ""}>
            {isPlan ? (
              <PlanCard plan={item} selected={plan === item.id} onSelect={setPlan} />
            ) : (
              <ProductCard product={item} />
            )}
          </div>
        );
      })}
    </div>
  );
}
