/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated, Text} from 'react-native';
import {useDetectClickOutside} from 'react-detect-click-outside';

const Modal = ({position, visible, children, hide}) => {
  const ref = useDetectClickOutside({onTriggered: hide});
  const fadeAnimation = React.useRef(new Animated.Value(0)).current;
  const [mountedModal, setMountedModal] = React.useState(visible);

  const fadeIn = React.useCallback(() => {
    setMountedModal(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnimation]);

  const fadeOut = React.useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => setMountedModal(false));
  }, [fadeAnimation]);

  React.useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [fadeIn, fadeOut, visible]);

  return (
    <React.Fragment>
      {mountedModal && (
        <Animated.View
          ref={ref}
          style={{
            width: 335,
            borderRadius: 20,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: 114,
            position: 'absolute',
            bottom: position,
            left: 14,
            right: 14,
            zIndex: 10,
            backgroundColor: 'red',
            opacity: fadeAnimation,
          }}>
          {children}
        </Animated.View>
      )}
    </React.Fragment>
  );
};

export default Modal;
