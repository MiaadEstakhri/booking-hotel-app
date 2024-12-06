import { IconType } from "./icon.type";

export function MinusIcon({
  stroke = "currentColor",
  className = "w-6 h-6",
}: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke={stroke}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}
