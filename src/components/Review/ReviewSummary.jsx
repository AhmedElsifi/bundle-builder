export default function ReviewSummary({
  totalOriginal,
  totalCurrent,
  savings,
  satisfactionBadge,
}) {
  return (
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
  );
}
