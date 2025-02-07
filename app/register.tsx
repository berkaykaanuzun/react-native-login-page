import CONSTANTS from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { CustomTextInput } from "@/components/CustomTextInput";
import { router } from "expo-router";
import { useState } from "react";
import SelectPhoto from "@/components/SelectPhoto";
import CustomBottomSheet from "@/components/CustomBottomSheet";

export default function Register() {
    const [image, setImage] = useState<string | null>(null);
  const handleBackPress = () => {
    router.back();
  };

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
            <View className=" rounded-full overflow-hidden self-center">
             <SelectPhoto image={image} setImage={setImage} />
            </View>
            <Text className="text-white text-center font-latoBold text-title mt-[40px]">
              Welcome Berkay Kaan Uzun
            </Text>
            <Text className="text-white text-center font-lato text-input text-sm  mt-[15px] mb-10">
              Please Log into your existing account
            </Text>
            <View className="mt-10 gap-3">
              <CustomTextInput placeholder="Name Surname" />
              <CustomTextInput placeholder="phone" />
              <CustomTextInput placeholder="Email" />
              <CustomTextInput placeholder="Password" />
            </View>
            <View className="mt-10 gap-5">
              <TouchableOpacity className="rounded-full bg-white py-4">
                <Text className="text-black text-center font-latoBold text-label">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CustomBottomSheet />
      </SafeAreaView>
     
    </View>
  );
}
