import React from "react";
import { View, Text, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { MaskedTextInput } from "react-native-mask-text";

interface CustomTextInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  mask?: string;
}

export function CustomTextInput<T extends FieldValues>({
  control,
  name,
  error,
  mask,
  ...rest
}: CustomTextInputProps<T>) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          mask ? (
            <MaskedTextInput
              mask={mask}
              onChangeText={(text, rawText) => {
                onChange(rawText); // Form'a maskelenmemiş değeri gönderiyoruz
              }}
              value={value}
              style={{
                height: 50,
                backgroundColor: "rgba(255,255,255,0.07)",
                paddingHorizontal: 20,
                borderRadius: 100,
                color: "white",
                fontFamily: "lato",
                borderWidth: 1,
                borderColor: error ? "red" : "white",
              }}
              placeholderTextColor="rgba(255,255,255,0.5)"
              {...rest}
            />
          ) : (
            <MaskedTextInput
              onChangeText={(text) => onChange(text)}
              value={value}
              style={{
                height: 50,
                backgroundColor: "rgba(255,255,255,0.07)",
                paddingHorizontal: 20,
                borderRadius: 100,
                color: "white",
                fontFamily: "lato",
                borderWidth: 1,
                borderColor: error ? "red" : "white",
              }}
              placeholderTextColor="rgba(255,255,255,0.5)"
              {...rest}
            />
          )
        )}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1 ps-5 font-lato">
          {error}
        </Text>
      )}
    </View>
  );
} 