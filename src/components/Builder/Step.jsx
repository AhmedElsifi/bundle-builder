import up from "../../assets/icons/up.svg";
import down from "../../assets/icons/down.svg";
import Products from "./Products";
import useSelectedCount from "../../hooks/useSelectedCount";

export default function Step({
  icon,
  title,
  stepIndex,
  nextStep,
  isExpanded,
  toggleExpanded,
  onStepChange,
  items,
}) {
  const selectedCount = useSelectedCount(items);

  return (
    <>
      <hr className="border-t-[0.5px] border-[#1F1F1F] my-1.25" />

      <div
        className="flex flex-row justify-between my-3.75 px-3.75 cursor-pointer select-none"
        onClick={() => toggleExpanded(stepIndex)}
      >
        <div className="flex flex-row items-center gap-2">
          <img src={icon} alt={title} className="w-6.5 h-6.5" />
          <h2 className="text-[22px] font-semibold text-obsidian max-sm:text-lg">
            {title}
          </h2>
        </div>
        <div className="flex flex-row items-center gap-1.25 text-wyze-purple text-sm">
          {selectedCount > 0 && `${selectedCount} selected`}
          <img
            src={isExpanded ? up : down}
            alt={isExpanded ? "Collapse" : "Expand"}
            className="w-2.5 h-1.75"
          />
        </div>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="px-3.75">
            <Products items={items} />
          </div>
          {onStepChange && (
            <div className="flex justify-center px-3.75 mt-3.75">
              <button
                className="text-lg font-semibold text-secondary-purple border-secondary-purple border box-border px-6 py-[7.5px] rounded-[7px] cursor-pointer transition-all duration-500 hover:bg-wyze-purple hover:text-white hover:border-wyze-purple"
                onClick={() => onStepChange(stepIndex + 1)}
              >
                Next: {nextStep}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
