import SectionLabel from "./SectionLabel";

export default function Section({
  title,
  isExpanded,
  children,
  className = "",
}) {
  return (
    <div
      className={`${className} ${
        isExpanded
          ? "bg-bg-primary rounded-[10px] py-3.75"
          : "border-b-[0.5px] border-[#1F1F1F]"
      }`}
    >
      <SectionLabel>{title}</SectionLabel>
      {children}
    </div>
  );
}
