import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, FlatList, TextInput } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { styles } from "../styles";


const Five = () => {
  const [mode, setMode] = useState('unknown');
  const [names, setNames] = useState<string []>([]); 
  const [currentName, setCurrentName] = useState(''); 

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

    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo }) => {
        if (
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setMode('portrait');
        } else if (
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo.orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setMode('landscape');
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  // Função para salvar o nome ao pressionar "OK" no teclado
  const handleSubmitEditing = () => {
    if (currentName.trim() !== '') {
      setNames((prevNames) => [...prevNames, currentName.trim()]);
      setCurrentName(''); // Limpa o input após salvar
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { flexDirection: mode === 'portrait' ? 'column' : 'row' },
      ]}
    >
      <View style={mode === 'portrait' ? styles.middle : styles.middleSecondary}>
  
        <TextInput
          style={styles.input}
          placeholder="Digite um nome"
          value={currentName}
          onChangeText={setCurrentName}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="done"
        />
        
     
      </View>
      <View style={mode === 'portrait' ? styles.bottom : styles.bottomSecondary}>
      <FlatList
          data={names}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.nomeItem}>{item}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}


export default Five;