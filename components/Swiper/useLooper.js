import _lodash from '@/lib/lodash';
import React from 'react';

import useUpdateEffect from 'react-use/lib/useUpdateEffect';

const useLooper = (arr, infinite = true, initialIndex) => {
  const [data, setData] = React.useState(arr);
  const [ended, setEnded] = React.useState(false);

  // Indexes
  const [index, setIndex] = React.useState(0);
  const [secondIndex, setSecondIndex] = React.useState(index + 1);

  const length = data.length;

  const iterate = React.useCallback(() => {
    if (infinite || index + 2 < length) {
      const incSafe = (i) => (i + 1) % length;

      setIndex(incSafe(index));
      return setSecondIndex(incSafe(secondIndex));
    } else if (index + 1 < length) {
      if (infinite) {
        return setSecondIndex(0);
      }
      return setIndex(index + 1);
    } else {
      setIndex(0);
      return setEnded(true);
    }
  }, [index, infinite, length, secondIndex]);

  useUpdateEffect(() => setData(arr), [arr]);

  const reachedEnd = !infinite && index === secondIndex;
  const itemExists = _lodash.between(initialIndex, 0, data.length - 1);
  const itemsWithIndex = [data[itemExists ? initialIndex : index], data[secondIndex]];
  const items = reachedEnd ? itemsWithIndex.splice(-1) : itemsWithIndex;

  return [items, { iterate, ended, index, secondIndex }];
};

export default useLooper;
