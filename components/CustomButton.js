import { Pressable, Text } from 'react-native';

export default function CustomButton({style, action, title, textStyle}) {
  return (
    <Pressable style={style} onPress={action}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
