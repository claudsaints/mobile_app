import { useState } from "react";
import { View, Image, StyleSheet, StatusBar, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Six = () => {
  const [image, setImage] = useState<string | null>(null);

  // Função para escolher uma imagem da galeria
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Função para tirar uma foto usando a câmera
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permissão de câmera é necessária!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
     
      <View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight || 20,
          right: 10,
          flexDirection: "row",
          gap: 10,
          zIndex: 1,
        }}
      >
        <MaterialIcons
          name="photo"
          size={30}
          color="deepskyblue"
          onPress={pickImage}
        />
        <MaterialIcons
          name="photo-camera"
          size={30}
          color="deepskyblue"
          onPress={takePhoto}
        />
      </View>
      <View style={styles.button}>
        <Button title="Escolha uma imagem" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, marginTop: 20 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 50,
  },
});

export default Six;
