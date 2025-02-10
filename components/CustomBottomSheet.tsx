import React, { forwardRef, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { MapPressEvent } from "react-native-maps";

interface CustomBottomSheetProps {
  onMapPress: (coordinates: { longitude: number; latitude: number }) => void;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ onMapPress }, ref) => {
    const { top } = useSafeAreaInsets();
    const [selectedCoords, setSelectedCoords] = React.useState<{
      longitude: number;
      latitude: number;
    } | null>(null);

    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    const handleMapPress = (event: MapPressEvent) => {
      const { coordinate } = event.nativeEvent;
      const coords = {
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
      };
      setSelectedCoords(coords);
      onMapPress(coords);
    };

    return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          snapPoints={[Dimensions.get("screen").height - top]}
          ref={ref}
          onChange={handleSheetChanges}
          index={-1}
          enablePanDownToClose
        >
          <BottomSheetView style={styles.contentContainer}>
            <View className="w-full h-full">
              <MapView style={{ flex: 1 }} onPress={handleMapPress} />

              {selectedCoords ? (
                <View className="absolute top-5 right-5 rounded-full bg-black p-3  justify-between items-center gap-2  w-40 ">
                  <Text className="text-white text-xs">
                    <Text className="font-lato">Latitude:</Text>{" "}
                    <Text className="font-latoBold">
                    {selectedCoords.latitude.toFixed(2)}{" "}</Text>
                  </Text>
                  <Text className="text-white text-xs">
                    <Text className="font-lato">Longitude:</Text>{" "}
                    <Text className="font-latoBold">
                    {selectedCoords.longitude.toFixed(2)}{" "}</Text>
                  </Text>
                </View>
              ) : (
                <View className="absolute top-5 right-5 rounded-full bg-black p-3 justify-center items-center w-40">
                  <Text className="text-white text-xs font-latoBold">
                    Please select location
                  </Text>
                </View>
              )}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default CustomBottomSheet;
