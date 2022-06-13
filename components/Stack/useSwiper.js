/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {PanResponder, Animated, Dimensions} from 'react-native';

import useList from 'react-use/lib/useList';
import useToggle from 'react-use/lib/useToggle';
import useSetState from 'react-use/lib/useSetState';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

const {width, height} = Dimensions.get('screen');

const UTILS = {
  DURATION: 400,
  WIDTH: width * 0.6,
  HEIGHT: height / 1.75,
  OUT_OF_SCREEN: width + 0.5 * width,
};

const ACTION_OFFSET = 100;

const useSwiper = ({data, limit = 2, onSwipe, onSwipeRight, onSwipeLeft}) => {
  const tiltSignRef = React.useRef(new Animated.Value(1)).current;
  const swipeRef = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const [cards, {removeAt}] = useList(data);
  const [on, toggle] = useToggle(false);
  const [item, setItem] = React.useState(cards[0].props.item);
  console.log(
    'cards',
    cards.map(items => items.props.item),
  );

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy, y0}) => {
        swipeRef.setValue({x: dx, y: dy});
        tiltSignRef.setValue(y0 > UTILS.HEIGHT / 2 ? 1 : -1);
      },
      onPanResponderRelease: (_, {dx, dy}) => {
        const direction = Math.sign(dx);
        const isActionActive = Math.abs(dx) > ACTION_OFFSET;

        if (isActionActive) {
          swipe(direction);
        } else {
          Animated.spring(swipeRef, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    }),
  ).current;

  const removeTopCard = dir => {
    toggle();
    swipeRef.setValue({x: 0, y: 0});
    onSwipe(item);

    if (dir === 1) {
      onSwipeRight(item);
    } else if (dir === -1) {
      onSwipeLeft(item);
    }
    return removeAt(0);
  };

  React.useEffect(() => {
    if (cards.length > 0) {
      setItem(cards[0].props.item);
    }
  }, [on]);

  const swipe = direction => {
    Animated.timing(swipeRef.x, {
      useNativeDriver: true,
      duration: UTILS.DURATION,
      toValue: direction * UTILS.OUT_OF_SCREEN,
    }).start(() => removeTopCard(direction));
  };

  const ended = cards.length === 0;

  return [
    cards.slice(0, limit),
    {
      ended,
      swipe,
      refs: {
        swipeRef,
        tiltSignRef,
      },
      dragHandlers: panResponder.panHandlers,
    },
  ];
};

export default useSwiper;
