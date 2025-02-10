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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleRegisterPress = () => {
    router.push("/register");
  };

  const onSubmit = (data: LoginFormData) => {
    console.log('Login Form Data:', data);
    // Handle login submission
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
            <CustomTextInput<LoginFormData>
              control={control}
              name="email"
              placeholder="Your Email"
              error={errors.email?.message}
            />
            <CustomTextInput<LoginFormData>
              control={control}
              name="password"
              placeholder="Your Password"
              secureTextEntry
              error={errors.password?.message}
            />
          </View>
          <View className="mt-10 gap-5">
            <TouchableOpacity 
              className="rounded-full bg-white py-4"
              onPress={handleSubmit(onSubmit)}
            >
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
            className="rounded-full bg-black py-4 mt-5"
            onPress={handleRegisterPress}
          >
            <Text className="text-white text-center font-latoBold text-label " >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
} 