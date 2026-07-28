import { useState } from "react";
import Section from "../UI/Section";
import ReviewCategoryHeader from "./ReviewCategoryHeader";
import ReviewItemRow from "./ReviewItemRow";
import { useBundle } from "../../context/BundleContext";
import data from "../../../products.json";
import satisfactionBadge from "../../assets/icons/Satisfaction Badge.svg";
import FastShippingRow from "./FastShippingRow";

const productMap = {};
data.products.forEach((p) => {
  productMap[p.id] = p;
});

const CATEGORY_ORDER = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

export default function ReviewPanel() {
  const { items, plan, add, remove } = useBundle();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("bundle", JSON.stringify({ items, plan }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const categoryGroups = {};
  Object.values(items).forEach((entry) => {
    const product = productMap[entry.pid];
    if (!product) return;

    const cat = product.category.toUpperCase();
    if (!categoryGroups[cat]) categoryGroups[cat] = [];

    const variant = entry.vid
      ? product.variants?.find((v) => v.id === entry.vid)
      : null;

    categoryGroups[cat].push({
      key: entry.vid != null ? `${entry.pid}|${entry.vid}` : entry.pid,
      name: variant ? `${product.name} - ${variant.name}` : product.name,
      image: variant?.image || product.image,
      qty: entry.qty,
      originalPrice:
        product.compare_at != null ? product.compare_at * entry.qty : null,
      price: product.price * entry.qty,
      pid: entry.pid,
      vid: entry.vid,
    });
  });

  if (plan) {
    const planData = data.plans.find((p) => p.id === plan);
    if (planData) {
      categoryGroups["PLAN"] = [
        {
          key: plan,
          name: planData.name,
          image: planData.image,
          qty: 1,
          originalPrice: planData.compare_at ?? null,
          price: planData.price,
          interval: "/mo",
          pid: plan,
          vid: null,
          disableStepper: true,
        },
      ];
    }
  }

  const sortedCategories = Object.entries(categoryGroups).sort(([a], [b]) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  let totalOriginal = 0;
  let totalCurrent = 0;
  Object.values(categoryGroups).forEach((group) => {
    group.forEach((item) => {
      totalOriginal += item.originalPrice ?? item.price;
      totalCurrent += item.price;
    });
  });
  const savings = totalOriginal - totalCurrent;

  const hasSelection = sortedCategories.length > 0;

  return (
    <Section
      title="REVIEW"
      isExpanded={true}
      className="w-99.75 h-fit max-sm:w-full"
    >
      <div className="px-5">
        <h1 className="text-[22px] font-semibold text-obsidian">
          Your security system
        </h1>
        <p className="text-sm font-normal text-charcoal-gray mt-1 leading-snug max-sm:text-xs">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <hr className="border-t border-light-full-gray my-3" />

        {!hasSelection && (
          <p className="text-xs text-charcoal-gray text-center py-6">
            No items selected yet.
          </p>
        )}

        {sortedCategories.map(([catTitle, catItems]) => (
          <div key={catTitle}>
            <ReviewCategoryHeader title={catTitle} />
            {catItems.map((item) => (
              <ReviewItemRow
                key={item.key}
                item={item}
                qty={item.qty}
                disableStepper={item.disableStepper}
                onIncrement={() => add(item.pid, item.vid)}
                onDecrement={() => remove(item.pid, item.vid)}
              />
            ))}
            <hr className="border-t border-light-full-gray my-3.75" />
          </div>
        ))}
        {Object.keys(items).length > 0 && <FastShippingRow />}

        {hasSelection && (
          <>
            <div className="flex items-start justify-between mt-4">
              <div className="flex items-center gap-1.5">
                <img
                  src={satisfactionBadge}
                  alt="Satisfaction Badge"
                  className="w-19.5 h-19.5"
                />
              </div>
              <div className="flex flex-col items-end">
                <span className="flex justify-center items-center bg-wyze-purple text-white text-xs font-normal w-28.25 h-4.5 rounded-sm mb-1">
                  as low as $19/mo
                </span>

                <div className="flex flex-row gap-2 items-end h-8">
                  <p className="text-gray-600 text-lg font-normal self-end line-through">
                    ${totalOriginal.toFixed(2)}
                  </p>

                  <p className="text-wyze-purple font-bold text-2xl">
                    ${totalCurrent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              {savings > 0 && (
                <p className="text-active-border text-xs font-semibold mb-1">
                  Congrats! You're saving ${savings.toFixed(2)} on your security
                  bundle!
                </p>
              )}
              <button className="w-87.5 h-12 bg-wyze-purple text-white text-[17px] font-semibold py-3 rounded-sm cursor-pointer hover:bg-wyze-purple/90 transition-colors duration-500 max-[390px]:w-full">
                Checkout
              </button>
            </div>
          </>
        )}

        <p
          className="text-charcoal-gray text-sm italic font-normal underline text-center mt-2 cursor-pointer"
          onClick={handleSave}
        >
          {saved ? "Saved!" : "Save my system for later"}
        </p>
      </div>
    </Section>
  );
}
