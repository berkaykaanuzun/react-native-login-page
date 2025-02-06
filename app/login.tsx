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

export default function Login() {
  const handleRegisterPress = () => {
    router.push("/register");
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
        <View className="pt-20 px-page">
          <View className=" rounded-full overflow-hidden self-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/115" }}
              style={{ width: 95, height: 95 }}
            />
          </View>
          <Text className="text-white text-center font-latoBold text-title mt-[40px]">
            Welcome again, Berkay Kaan Uzun
          </Text>
          <Text className="text-white text-center font-lato text-input text-sm  mt-[15px] mb-10">
            Please Log into your existing account
          </Text>
          <View className="mt-10 gap-3">
            <CustomTextInput placeholder="Your Email" />
            <CustomTextInput placeholder="Your Password" />
          </View>
          <View className="mt-10 gap-5">
            <TouchableOpacity className="rounded-full bg-white py-4">
              <Text className="text-black text-center font-latoBold text-label">
                Login
              </Text>
            </TouchableOpacity>
            <View className=" mt-5">
              <Text className="text-white text-center mt-3">
                Forget your password?
              </Text>
              <Text className="font-latoBold text-white text-center text-lg">
                Click Here
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            className="rounded-full bg-black py-4"
            onPress={handleRegisterPress}
          >
            <Text className="text-white text-center font-latoBold text-label">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
} 