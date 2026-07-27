import CheckIcon from "../UI/CheckIcon";
import Price from "../UI/Price";

export default function PlanCard({ plan, selected, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`bg-white rounded-[10px] p-4 shadow-sm border-2 cursor-pointer transition-all duration-200 h-[300px] flex flex-col ${
        selected ? "border-secondary-purple" : "border-transparent"
      }`}
      onClick={() => onSelect(plan.id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(plan.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-obsidian">{plan.name}</h3>
          <p className="text-[11px] text-charcoal-gray mt-1 leading-snug">{plan.description}</p>
        </div>
        <div
          className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            selected ? "border-secondary-purple bg-secondary-purple" : "border-[#D1D1D6]"
          }`}
        >
          {selected && <CheckIcon />}
        </div>
      </div>
      <div className="mt-3">
        <Price price={plan.price} compareAt={plan.compare_at} suffix={`/${plan.billing_period}`} size="lg" />
      </div>
      <ul className="mt-3 space-y-1 overflow-y-auto flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="text-[11px] text-charcoal-gray flex items-start gap-1.5">
            <CheckIcon size={12} stroke="#502acd" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
