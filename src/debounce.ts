
type DebouncedFunction<A extends unknown[]> = ((...args: A) => void) & {
  cancel: () => void;
  flush: () => void;
};

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number
): DebouncedFunction<A> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: A | undefined;

  const debounced = ((...args: A) => {
    lastArgs = args;

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = undefined;

      if (lastArgs !== undefined) {
        fn(...lastArgs);
        lastArgs = undefined;
      }
    }, waitMs);
  }) as DebouncedFunction<A>;

  debounced.cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;

      if (lastArgs !== undefined) {
        fn(...lastArgs);
        lastArgs = undefined;
      }
    }
  };

  return debounced;
}
