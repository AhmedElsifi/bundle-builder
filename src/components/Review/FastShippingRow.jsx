import shipping from "../../assets/icons/fast shipping.png";

export default function FastShippingRow() {
  return (
    <div className="flex items-center justify-between ">
      {/* Left Side: Icon & Label */}
      <div className="flex items-center gap-3">
        {/* Teal/Green Delivery Truck SVG Icon */}
        <img src={shipping} alt="truck" />
        <span className="flex-1 text-sm text-obsidian font-normal leading-tight">
          Fast Shipping
        </span>
      </div>

      {/* Right Side: Price Block */}
      <div className="flex flex-col items-end leading-none">
        <span className="text-gray-600 line-through text-sm font-medium block">
          $5.99
        </span>
        <span className="text-wyze-purple font-medium text-sm">FREE</span>
      </div>
    </div>
  );
}
