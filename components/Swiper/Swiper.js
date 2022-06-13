/* eslint-disable react-native/no-inline-styles */
import {View, Button, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
// import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

const Swiper = () => {
  const myRef = React.useRef(null);
  const [ref, {hide, show, visible, position, getElementPosition}] = useModal();

  console.log(position);

  return (
    <View style={{width: 360, height: 450, backgroundColor: 'yellow'}}>
      <Modal
        isVisible={visible}
        coverScreen={false}
        animationIn="fadeIn"
        hasBackdrop={false}
        animationOut="fadeOut"
        hideModalContentWhileAnimating>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 114,
          }}>
          <Text>Hello!</Text>
          <Text>Hello!</Text>
          <Text>Hello!</Text>
          <Text>Hello!</Text>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 14,
          zIndex: 9999,
          bottom: 20,
          backgroundColor: 'red',
        }}
        onPress={hide}
        ref={myRef}>
        <Text>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        ref={myRef}
        onPress={show}
        style={{
          width: 60,
          height: 60,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 14,
          zIndex: 9999,
          bottom: 20,
          backgroundColor: 'green',
        }}
        onLayout={() => getElementPosition(myRef)}>
        <Text>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Swiper;
