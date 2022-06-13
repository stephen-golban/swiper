import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import useCard from './useCard';

const Card = React.forwardRef((props, ref) => {
  const {
    children,
    item,
    style,
    movable,
    refs,
    dragHandlers,
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
  } = props;

  const {animatedCardStyle} = useCard({...refs});

  return (
    <Animated.View
      style={[!movable && styles.card, style, movable && animatedCardStyle]}
      {...dragHandlers}>
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    overflow: 'hidden',
    position: 'absolute',
    background: 'white',
  },
});

export default Card;
