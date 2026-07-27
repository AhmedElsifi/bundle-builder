export default function VariantSelector({ variants, selected, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      {variants.map((v) => (
        <button
          key={v.id}
          className={`flex items-center h-6.5 w-16.25 gap-1 px-[3.5px] py-0.5 rounded-xs cursor-pointer ${
            selected === v.id
              ? "border border-active-border bg-active-bg"
              : "border border-transparent"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onChange(v.id);
          }}
        >
          <img src={v.image} alt={v.name} className="w-6 h-6 object-contain" />
          <span className="text-[10px] text-obsidian whitespace-nowrap">
            {v.name}
          </span>
        </button>
      ))}
    </div>
  );
}
