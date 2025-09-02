import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { styles } from "../styles";
const Three = () => {
  const [mode, setMode] = useState("unknown");

  useEffect(() => {
    const readOrientation = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (
        orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        setMode("portrait");
      } else if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setMode("landscape");
      }
    };

    readOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo }) => {
        if (
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setMode("portrait");
        } else if (
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setMode("landscape");
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { flexDirection: mode == "portrait" ? "column" : "row" },
      ]}
    >
      <View style={mode == "portrait"? styles.top: styles.topSecondary}>
        <Text>Top</Text>
      </View>
      <View style={mode == "portrait"? styles.middle: styles.middleSecondary}>
        <Text>Middle</Text>
      </View>
      <View style={mode == "portrait"? styles.bottom: styles.bottomSecondary}>
        <Text>Botton</Text>
      </View>
    </SafeAreaView>
  );
};
export default Three;
