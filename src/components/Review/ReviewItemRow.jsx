export default function ReviewItemRow({
  item,
  qty,
  onIncrement,
  onDecrement,
  disableStepper,
}) {
  const showOriginal = item.originalPrice != null;
  const isFree = item.price === 0;

  const renderPrice = () => {
    if (isFree) {
      return (
        <div className="text-right">
          {showOriginal && (
            <span className="text-charcoal-gray line-through text-[10px] block">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-wyze-purple font-bold text-xs">FREE</span>
        </div>
      );
    }
    if (showOriginal) {
      return (
        <div className="text-right w-fit">
          <span className="text-gray-600 line-through text-sm font-medium block  max-sm:text-xs">
            ${item.originalPrice.toFixed(2)}
          </span>
          <span className="text-wyze-purple font-medium text-sm  max-sm:text-xs">
            ${item.price.toFixed(2)}
            {item.interval || ""}
          </span>
        </div>
      );
    }
    return (
      <span className="text-wyze-purple font-medium text-sm  max-sm:text-xs">
        ${item.price.toFixed(2)}
        {item.interval || ""}
      </span>
    );
  };

  return (
    <div className="flex justify-between items-center gap-3 mb-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-10.25 h-10.25 rounded object-cover shrink-0"
      />
      <span className="flex-1 text-sm text-obsidian font-normal leading-tight max-sm:text-xs">
        {item.name}
      </span>
      {!disableStepper && (
        <div className="flex items-center gap-1">
          <button
            className="w-5 h-5 rounded-sm border border-white bg-white hover:border-light-full-gray hover:bg-[#F1F1F2] duration-500 flex items-center justify-center text-[14px] text-charcoal-light-gray cursor-pointer hover:bg-gray-100 font-medium"
            onClick={onDecrement}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-3.5 text-center text-xs text-obsidian">{qty}</span>
          <button
            className="w-5 h-5 rounded-sm border border-white bg-white hover:border-light-full-gray hover:bg-[#F1F1F2] duration-500 flex items-center justify-center text-[14px] text-charcoal-light-gray cursor-pointer hover:bg-gray-100 font-medium"
            onClick={onIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}
      <div className="w-fit">{renderPrice()}</div>
    </div>
  );
}
