import CONSTANTS from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { CustomTextInput } from "@/components/CustomTextInput";
import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import SelectPhoto from "@/components/SelectPhoto";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Telefon numarası için maske formatını belirleyelim
const PHONE_MASK = "(999) 999 9999";

// Form validation schema
const schema = yup.object({
  fullName: yup.string().required("Name and surname is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  coordinates: yup.object({
    latitude: yup.number()
      .test('required-location', 'Please select a location', value => value !== 0),
    longitude: yup.number()
      .test('required-location', 'Please select a location', value => value !== 0),
  }).required('Location is required'),
  image: yup.string().required("Profile photo is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function Register() {
  const [image, setImage] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      image: ""
    },
  });

  const handleBackPress = () => {
    router.back();
  };

  const onSubmit = (data: FormData) => {
    console.log('Başarılı Form Data:', data);
    // Handle form submission
  };

  useEffect(() => {
    // Eğer coordinates hatası varsa bottom sheet'i aç
    if (errors.coordinates) {
      bottomSheetRef.current?.expand();
    }
  }, [errors.coordinates]);

  const handleFormSubmit = (data: FormData) => {
    if (!data.coordinates || 
        (data.coordinates.latitude === 0 && data.coordinates.longitude === 0)) {
      bottomSheetRef.current?.expand();
      return;
    }
    onSubmit(data);
  };

  // Form değerlerini kontrol etmek için
  useEffect(() => {
    console.log('Form Errors:', errors);
  }, [errors]);

  // Add this effect to update form value when image changes
  useEffect(() => {
    if (image) {
      setValue('image', image);
    }
  }, [image, setValue]);

  return (
    <View className="flex-1 ">
      <LinearGradient
        colors={[
          CONSTANTS.colors.bgGradientStart,
          CONSTANTS.colors.bgGradientMid,
          CONSTANTS.colors.bgGradientEnd,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, width: "100%", height: "100%", position: "absolute" }}
      ></LinearGradient>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={handleBackPress}>
            <Text className="text-white font-latoBold ps-20 font-bold text-2xl">
              ←
            </Text>
          </TouchableOpacity>
          <View className="pt-20 px-page">
            <View className={`rounded-full overflow-hidden self-center ${
              errors.image ? 'border-2 border-red-500' : ''
            }`}>
              <SelectPhoto image={image} setImage={setImage} />
            </View>
            {errors.image && (
              <Text className="text-red-500 text-center font-lato text-sm mt-2">
                {errors.image.message}
              </Text>
            )}
            <Text className="text-white text-center font-latoBold text-title mt-[40px]">
              Welcome Berkay Kaan Uzun
            </Text>
            <Text className="text-white text-center font-lato text-input text-sm  mt-[15px] mb-10">
              Please Log into your existing account
            </Text>
            <View className="mt-10 gap-3">
              <CustomTextInput<FormData>
                placeholder="Name Surname"
                control={control}
                name="fullName"
                error={errors.fullName?.message}
              />
              <CustomTextInput<FormData>
                placeholder="Phone"
                control={control}
                name="phone"
                error={errors.phone?.message}
                mask={PHONE_MASK}
                keyboardType="numeric"
              />
              <CustomTextInput<FormData>
                placeholder="Email"
                control={control}
                name="email"
                error={errors.email?.message}
              />
              <CustomTextInput<FormData>
                placeholder="Password"
                control={control}
                name="password"
                error={errors.password?.message}
                secureTextEntry
              />
            </View>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
              <Text className="font-latoBold text-white text-center text-lg mt-5">
                Open Map
              </Text>
            </TouchableOpacity>
            <View className="mt-10 gap-5">
              <TouchableOpacity 
                className="rounded-full bg-white py-4"
                onPress={handleSubmit(handleFormSubmit)}
              >
                <Text className="text-black text-center font-latoBold text-label">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Portal>
        <CustomBottomSheet 
          ref={bottomSheetRef}  
          onMapPress={(coordinates) => {
            setValue("coordinates", coordinates);
          }}
        />
      </Portal>
    </View>
  );
}
