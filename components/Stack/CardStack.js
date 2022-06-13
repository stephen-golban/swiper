import React from 'react';
import {Text, View} from 'react-native';

import usePaginator from './usePaginator';
import useSwiper from './useSwiper';

const CardStack = React.forwardRef(
  (
    {
      children,
      onSwipe = () => {},
      onDataEnd = () => {},
      onSwipeLeft = () => {},
      onSwipeRight = () => {},
      showableCards = 2,
      renderNoMoreCards = () => <Text>No more cards</Text>,
    },
    ref,
  ) => {
    const handleOnSwipe = item => {
      if (onSwipe) {
        onSwipe(item);
      }
      if (onDataEnd && ended) {
        onDataEnd();
      }
    };
    const [items, {swipe, ended, refs, dragHandlers}] = useSwiper({
      data: React.Children.toArray(children),
      limit: showableCards,
      onSwipe: handleOnSwipe,
      onSwipeLeft,
      onSwipeRight,
    });

    React.useImperativeHandle(
      ref,
      () => ({
        swipe,
      }),
      [swipe],
    );

    return (
      <View>
        {renderNoMoreCards && ended ? (
          <View>{renderNoMoreCards()}</View>
        ) : (
          React.Children.map(items.reverse(), (child, index) => {
            // initializing the index according to the showing cards number
            index =
              items.length >= showableCards
                ? showableCards - index - 1
                : items.length - index - 1;
            const movable = index === 0;

            return React.cloneElement(child, {
              refs,
              movable,
              dragHandlers,
              index,
              onSwipeLeft,
              onSwipeRight,
            });
          })
        )}
      </View>
    );
  },
);

export default CardStack;
