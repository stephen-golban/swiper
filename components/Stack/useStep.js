import React from 'react';

/**
 * It returns an index, that is either incremented or decremented, it goes back to 0 if it reached the
 * maximum given length
 * @param {number} length - The length of the array that you want to iterate over
 * @returns An array with two elements, the first is the activeIndex, the second is the onChange
 * function
 */
const useStep = length => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onChange = React.useCallback(
    /**
     * @param {("increment"|"decrement"|"nullify")} mode - The count modifier
     * @param {boolean} loop - Determines if the counter should go back to zero
     * @param {Function} cb - A callback function to be passed while changing the index
     */
    (mode, loop = false, cb = () => {}) => {
      let newCurrentIndex = activeIndex + 1;

      if (mode === 'decrement') {
        newCurrentIndex = activeIndex - 1;
      }

      if (newCurrentIndex >= length) {
        newCurrentIndex = loop ? 0 : activeIndex;
      }

      if (newCurrentIndex < 1) {
        newCurrentIndex = 0;
      }

      if (mode === 'nullify') {
        newCurrentIndex = 0;
      }
      cb();
      setActiveIndex(newCurrentIndex);
    },
    [activeIndex, length],
  );

  return [activeIndex, onChange];
};

export default useStep;
