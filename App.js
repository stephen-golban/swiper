import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Card from './components/Card/Card';
import CardStack from './components/Stack/CardStack';

const data = ['hello', 'world', 'this', 'is', 'react-native-cards-swipr'];

const App = () => {
  const swipeRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <CardStack
        ref={swipeRef}
        // onSwipeRight={item => {
        //   console.log('swiped right', item);
        // }}
        // onSwipeLeft={item => {
        //   console.log('swiped left', item);
        // }}
        // onDataEnd={() => console.log('data has ended')}
        onSwipe={item => console.log('efectuated a swipe', item)}>
        {data.map((item, i) => (
          <Card
            key={`${item}-${i}`}
            item={item}
            style={{...styles.box, ...styles.shadow}}>
            <Text>{item}</Text>
          </Card>
        ))}
      </CardStack>
      <Button title="prev" onPress={() => swipeRef.current?.swipe(-1)} />
      <Button title="next" onPress={() => swipeRef.current?.swipe(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default App;
