import {Animated} from 'react-native';

const useCard = ({swipeRef, tiltSignRef}) => {
  const rotate = Animated.multiply(swipeRef.x, tiltSignRef).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipeRef.getTranslateTransform(), {rotate}],
  };

  return {animatedCardStyle};
};

export default useCard;
