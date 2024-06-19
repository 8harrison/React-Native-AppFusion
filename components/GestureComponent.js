import { Animated, PanResponder, Pressable, Vibration } from 'react-native';
import { useRef, useState } from 'react';

export default function GestureCompnent({
  children,
  rightFunction,
  leftFunction,
  longPress,
  style,
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isTerminated, setTerminated] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => isTerminated,

    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 200) {
        rightFunction();
      } else if (gestureState.dx < -200) {
        leftFunction();
      }
      Animated.spring(pan, {
        toValue: { x: 0 },
        useNativeDriver: false,
      }).start();
    },
    
    onPanResponderEnd: () => {
      setTerminated(!isTerminated);
    }, 
  });

  const selecionar = () => {
   setTerminated(!isTerminated)
   Vibration.vibrate()
  }

  return (
    <Animated.View
      style={[pan.getLayout(), style,isTerminated && {borderWidth: 0, elevation: 9, shadowColor: '#ff0000'}]} 
      {...panResponder.panHandlers}>
      <Pressable
        onLongPress={longPress}
        onPress={() => selecionar() }>
        {children}
      </Pressable>
    </Animated.View>
  );
}
