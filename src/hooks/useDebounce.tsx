import { useEffect, useState } from 'react';

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 清除
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
