import { useCallback, useState } from "react";

const DOUBLE_TOUCH_DELAY = 300;

export const useDoubleClick = () => {
  const [lastTouchTime, setLastTouchTime] = useState(0);

  const isDoubleClick = useCallback(() => {
    const currentTime = new Date().getTime();
    return currentTime - lastTouchTime < DOUBLE_TOUCH_DELAY;
  }, [lastTouchTime]);

  const updateTouchTime = useCallback(() => {
    setLastTouchTime(new Date().getTime());
  }, []);

  return [isDoubleClick, updateTouchTime];
};
