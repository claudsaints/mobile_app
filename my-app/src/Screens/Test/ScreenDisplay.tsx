import React, { useState, useEffect } from "react"; 
import { Text, SafeAreaView } from "react-native"; 
import * as ScreenOrientation from "expo-screen-orientation"; 
import { styles } from "../../styles";


export default function ScreenDisplay(){
    const [mode, setMode] = useState('unknown');

    useEffect(() => {
      const readOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        if (
          orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setMode('portrait');
        } else if (
          orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setMode('landscape');
        }
      };
  
      readOrientation();
  
      const subscription = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
        if (
          orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setMode('portrait');
        } else if (
          orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setMode('landscape');
        }
      });
  
      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <Text>Tela em modo {mode}</Text>
      </SafeAreaView>
    );
  };