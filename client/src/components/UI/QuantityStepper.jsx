export default function QuantityStepper({ value, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <button
        aria-label="Decrease quantity"
        className="w-5 h-5 rounded-sm border-2 border-[#E6EBF0] flex items-center justify-center text-xs font-semibold text-[#CED6DE] cursor-pointer hover:bg-gray-200 hover:text-gray-700 transition-colors"
        onClick={onDecrement}
      >
        -
      </button>
      <span className="text-xs font-semibold text-obsidian min-w-[14px] text-center">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className="w-5 h-5 rounded-sm border-2 border-[#E6EBF0] flex items-center justify-center text-xs font-semibold text-[#CED6DE] cursor-pointer hover:bg-gray-200 hover:text-gray-700 transition-colors"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}
