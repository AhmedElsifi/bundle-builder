import { formatPrice } from "../../utils/helpers";

export default function Price({ price, compareAt, suffix }) {
  return (
    <div className="flex items-baseline gap-1">
      {compareAt != null && (
        <div className="flex flex-col items-start max-xl:flex-row max-xl:gap-0.75">
          <span className="text-base text-primary-red line-through font-normal">
            {formatPrice(compareAt)}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-normal text-charcoal-light-gray">
              {formatPrice(price)}
            </span>
            {suffix && (
              <span className="text-xs text-charcoal-gray">{suffix}</span>
            )}
          </div>
        </div>
      )}
      {compareAt == null && (
        <>
          <span className="text-base font-normal text-charcoal-light-gray">
            {formatPrice(price)}
          </span>
          {suffix && (
            <span className="text-base font-normal text-charcoal-light-gray">
              {suffix}
            </span>
          )}
        </>
      )}
    </div>
  );
}
