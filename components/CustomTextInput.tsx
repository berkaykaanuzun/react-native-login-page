import { View, TextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerClassName?: string;
  inputClassName?: string;
}

export const CustomTextInput = ({ 
  containerClassName = "bg-white/20 rounded-full px-6 py-4 border border-white",
  inputClassName = "text-white font-lato",
  placeholderTextColor = "rgba(255, 255, 255, 0.5)",
  ...props 
}: CustomTextInputProps) => {
  return (
    <View className={containerClassName}>
      <TextInput 
        className={inputClassName}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
}; 