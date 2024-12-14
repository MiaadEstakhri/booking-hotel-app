import { useEffect } from "react";

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  exceptionId: string | null,
  cb: () => void
) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLElement) &&
        (event.target as HTMLElement)?.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb]);
}
