import VariantSelector from "./VariantSelector";
import QuantityStepper from "../UI/QuantityStepper";
import Price from "../UI/Price";
import useProductSelection from "../../hooks/useProductSelection";

export default function ProductCard({ product }) {
  const {
    hasVariants,
    activeVariant,
    setActiveVariant,
    inBundle,
    qty,
    currentImage,
    toggleBundle,
    handleAdd,
    handleRemove,
  } = useProductSelection(product);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`bg-white rounded-[10px] shadow-sm border-2 cursor-pointer w-[361.5px] h-[173px] flex p-2.5 gap-[19px] ${
        inBundle ? "border-secondary-purple" : "border-transparent"
      }`}
      onClick={toggleBundle}
      onKeyDown={(e) => e.key === "Enter" && toggleBundle()}
    >
      <div className="relative w-25.25 shrink-0 self-stretch">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
        />
        {product.badge && (
          <span className="flex justify-center items-center absolute top-1 left-1 bg-secondary-purple text-white text-[12px] font-medium px-1.5 py-0.5 rounded-[10px]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col self-stretch">
        <h3 className="text-base font-medium text-obsidian leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[12px] font-medium text-light-gray mt-2 leading-snug line-clamp-2">
          {product.description}
        </p>
        <a
          href={product.learn_more_url}
          className="text-[11px] text-secondary-purple font-medium underline"
        >
          Learn more
        </a>
        <div className="mt-auto">
          {hasVariants && (
            <VariantSelector
              variants={product.variants}
              selected={activeVariant}
              onChange={setActiveVariant}
            />
          )}
          <div className="flex items-end justify-between">
            <QuantityStepper
              value={qty}
              onIncrement={handleAdd}
              onDecrement={handleRemove}
            />
            <Price price={product.price} compareAt={product.compare_at} />
          </div>
        </div>
      </div>
    </div>
  );
}
