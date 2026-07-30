import ReviewCategoryHeader from "./ReviewCategoryHeader";
import ReviewItemRow from "./ReviewItemRow";

export default function ReviewCategories({ categories, add, remove }) {
  return categories.map(([catTitle, catItems]) => (
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
  ));
}
