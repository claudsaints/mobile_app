import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const oito = () => {
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

  const removerImagem = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

      { 
        !(images.length > 0 ) &&
        <View style={styles.button}>
          <Button title="Escolha uma imagem" onPress={pickImage} />
        </View>
      }

      <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => removerImagem(index)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Image source={{ uri }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
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
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    alignSelf: "center",
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 2,
    zIndex: 2,
  },
});

export default oito;
