import { useCallback, useEffect, useState } from 'react';

export const useWarmedIndexes = (activeIndex: number, count: number) => {
  const [warmed, setWarmed] = useState(() => {
    const initial = new Set<number>([activeIndex]);
    if (count > 1) initial.add((activeIndex + 1) % count);
    return initial;
  });

  useEffect(() => {
    setWarmed((current) => {
      const next = new Set(current);
      next.add(activeIndex);
      if (count > 1) next.add((activeIndex + 1) % count);
      return next;
    });
  }, [activeIndex, count]);

  const warm = useCallback((index: number) => {
    setWarmed((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  const warmAll = useCallback(() => {
    setWarmed((current) => {
      if (current.size >= count) return current;
      return new Set(Array.from({ length: count }, (_, index) => index));
    });
  }, [count]);

  return { warmed, warm, warmAll };
};
