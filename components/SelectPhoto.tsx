import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

interface SelectPhotoProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

export default function SelectPhoto( {image, setImage} : SelectPhotoProps) {
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={image ? { uri: image } : require("../assets/images/placeholder-user.jpg")} style={{ width: 95, height: 95 }} />
    </TouchableOpacity>
  );
}
