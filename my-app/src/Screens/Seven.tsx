import { useState } from "react";
import { View, Image, StyleSheet, StatusBar, Button, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const sete = () => {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

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
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
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
        { 
        !(images.length > 0 ) &&
            <Button title="Escolha uma imagem" onPress={pickImage} />
        }
        <ScrollView  style={{ marginTop: 20, marginBottom: 20 }}>
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{ width: 200, height: 300, marginRight: 10,marginBottom: 20  }}
            />
          ))}
        </ScrollView>
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
    alignItems: "center",
  },
});

export default sete;
