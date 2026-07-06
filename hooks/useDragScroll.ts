import { useRef } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handlers = {
    onMouseDown(e: React.MouseEvent<T>) {
      isDragging.current = true;
      startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
      scrollLeft.current = ref.current?.scrollLeft ?? 0;
      if (ref.current) ref.current.style.cursor = "grabbing";
    },
    onMouseLeave() {
      isDragging.current = false;
      if (ref.current) ref.current.style.cursor = "grab";
    },
    onMouseUp() {
      isDragging.current = false;
      if (ref.current) ref.current.style.cursor = "grab";
    },
    onMouseMove(e: React.MouseEvent<T>) {
      if (!isDragging.current || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      ref.current.scrollLeft = scrollLeft.current - walk;
    },
    onPointerEnter() {
      if (ref.current) ref.current.style.cursor = "grab";
    },
  };

  return { ref, handlers } as const;
}
