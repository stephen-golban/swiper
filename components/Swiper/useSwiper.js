import React from 'react';
import { PanResponder, Animated } from 'react-native';

import useLooper from './useLooper';
import useList from 'react-use/lib/useList';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { SWIPER_UTILS as UTILS } from '../utils';

const useSwiper = ({ data, loop = false, initialIndex, onSwipe, onSwipeRight, onSwipeLeft, onSwipedAll }) => {
  const position = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const [cards, { set }] = useList(data);
  const [looped, { iterate, ended, index }] = useLooper(cards, loop, initialIndex);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      position.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx }) => {
      if (dx > UTILS.SWIPE_TRESHOLD) {
        return swipeCard('right');
      } else if (dx < -UTILS.SWIPE_TRESHOLD) {
        return swipeCard('left');
      } else {
        return resetPosition();
      }
    },
  });

  /**
   * @param {("left" | "right")} direction
   */
  const onSwipeComplete = (direction) => {
    iterate();

    const item = data[index];
    console.log('item', item.name);
    if (onSwipe) {
      onSwipe(item);
    }

    if (direction === UTILS.DIRECTION.RIGHT) {
      onSwipeRight(item);
    } else if (direction === UTILS.DIRECTION.LEFT) {
      onSwipeLeft(item);
    }

    return position.setValue({ x: 0, y: 0 });
  };

  const resetPosition = () => {
    return Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  /**
   * @param {("left" | "right")} direction
   */
  const swipeCard = (direction) => {
    const left = direction === UTILS.DIRECTION.LEFT;
    const right = direction === UTILS.DIRECTION.RIGHT;
    const x = right ? UTILS.SCREEN_WIDTH : left ? -UTILS.SCREEN_WIDTH : 0;

    return Animated.timing(position, {
      toValue: { x: x * 2, y: 0 },
      duration: UTILS.DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  // Trigger a callback function when all the cards were swiped
  useUpdateEffect(() => {
    if (onSwipedAll && ended) {
      return onSwipedAll();
    }
  }, [ended]);

  useUpdateEffect(() => set(data), [data]);

  return [
    looped,
    {
      ended,
      swipeCard,
      positionRef: position,
      dragHandlers: panResponder.panHandlers,
    },
  ];
};

export default useSwiper;
