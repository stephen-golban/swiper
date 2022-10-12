import React from 'react';

import { useSwiper } from './hooks';

import Card from '../Card/Card';
import _lodash from '@/lib/lodash';
import { Box, Typography } from '@/components/common';

const Swiper = React.forwardRef(({ data, loading, loop, initialIndex, cardHeight, renderNoMoreCards, ...fns }, ref) => {
  const [items, { swipeCard, ended, positionRef, dragHandlers }] = useSwiper({
    data,
    loop,
    initialIndex,
    ...fns,
  });

  React.useImperativeHandle(ref, () => ({ swipeCard }), [swipeCard]);

  return (
    <Box align="center" direction="col">
      {loading ? (
        <Box background="white" align="center" justify="center">
          <Typography weight="bold" size="xxl">
            Loading...
          </Typography>
        </Box>
      ) : renderNoMoreCards && ended ? (
        <Box justify="center" align="center">
          {renderNoMoreCards()}
        </Box>
      ) : (
        items.reverse().map((item, index) => {
          // reversing the index and also setting the index only for the next two cards
          index = items.length - index - 1;
          const movable = index === 0;
          return (
            <Card
              key={`${item?.name}-${index}`}
              data={item}
              movable={movable}
              cardHeight={cardHeight}
              positionRef={positionRef}
              dragHandlers={movable ? dragHandlers : {}}
            />
          );
        })
      )}
    </Box>
  );
});

Swiper.defaultProps = {
  loop: false,
  initialIndex: 0,
  loading: undefined,
  onSwipe: _lodash.noop,
  onSwipedAll: _lodash.noop,
  onSwipeLeft: _lodash.noop,
  onSwipeRight: _lodash.noop,
  renderNoMoreCards: () => (
    <Typography weight="bold" size="xl">
      No more cards!
    </Typography>
  ),
};

export default Swiper;
