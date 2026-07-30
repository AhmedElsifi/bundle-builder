import { useState } from "react";
import Section from "../UI/Section";
import ReviewCategories from "./ReviewCategories";
import ReviewSummary from "./ReviewSummary";
import { useBundle } from "../../hooks/useBundle";
import { SAVE_VERSION } from "../../utils/constants";
import data from "../../../products.json";
import satisfactionBadge from "../../assets/icons/Satisfaction Badge.svg";
import FastShippingRow from "./FastShippingRow";

const productMap = {};
data.products.forEach((p) => {
  productMap[p.id] = p;
});

const CATEGORY_ORDER = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

function getPlanItems(plan, data) {
  if (!plan) return null;
  const planData = data.plans.find((p) => p.id === plan);
  if (!planData) return null;
  return [
    {
      key: plan,
      name: planData.name,
      level: planData.level,
      image: "/assets/icons/plan-review.svg",
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

function buildCategoryGroups(items, plan, data, productMap) {
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

  const planItems = getPlanItems(plan, data);
  if (planItems) {
    categoryGroups["PLAN"] = planItems;
  }

  return categoryGroups;
}

function sortCategories(categoryGroups) {
  return Object.entries(categoryGroups).sort(([a], [b]) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

function calculateTotals(categoryGroups) {
  let totalOriginal = 0;
  let totalCurrent = 0;
  Object.values(categoryGroups).forEach((group) => {
    group.forEach((item) => {
      totalOriginal += item.originalPrice ?? item.price;
      totalCurrent += item.price;
    });
  });
  const savings = totalOriginal - totalCurrent;
  return { totalOriginal, totalCurrent, savings };
}

export default function ReviewPanel() {
  const { items, plan, add, remove } = useBundle();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem(
      "bundle",
      JSON.stringify({ _v: SAVE_VERSION, items, plan }),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const categoryGroups = buildCategoryGroups(items, plan, data, productMap);
  const sortedCategories = sortCategories(categoryGroups);
  const { totalOriginal, totalCurrent, savings } =
    calculateTotals(categoryGroups);
  const hasSelection = sortedCategories.length > 0;

  return (
    <Section
      title="REVIEW"
      isExpanded={true}
      className="w-99.75 h-fit max-md:w-full max-xl:w-full"
    >
      <div className="px-5 sm:max-xl:flex max-xl:gap-13">
        <div className="sm:max-xl:w-1/2">
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

          <ReviewCategories
            categories={sortedCategories}
            add={add}
            remove={remove}
          />
          {Object.keys(items).length > 0 && <FastShippingRow />}
        </div>

        <div className="sm:max-xl:w-1/2">
          {hasSelection && (
            <ReviewSummary
              totalOriginal={totalOriginal}
              totalCurrent={totalCurrent}
              savings={savings}
              satisfactionBadge={satisfactionBadge}
            />
          )}

          <p
            className="text-charcoal-gray text-sm italic font-normal underline text-center mt-2 cursor-pointer"
            onClick={handleSave}
          >
            {saved ? "Saved!" : "Save my system for later"}
          </p>
        </div>
      </div>
    </Section>
  );
}
