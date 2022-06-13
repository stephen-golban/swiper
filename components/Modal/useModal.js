import React from 'react';

const useModal = () => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const getElementPosition = React.useCallback(incomingRef => {
    const round = val => Math.round(val);
    incomingRef?.current?.measure((_a, _b, width, height, x, y) => {
      setPosition(round(y));
    });
  }, []);

  return [
    ref,
    {
      visible,
      position,
      getElementPosition,
      hide: () => setVisible(false),
      show: () => setVisible(true),
    },
  ];
};

export default useModal;
