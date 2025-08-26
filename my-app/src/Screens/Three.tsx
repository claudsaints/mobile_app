import { Linking, Pressable, View, Text} from "react-native"
import Container from "../Components/Container"
import React from "react";
import { styles } from "../styles";




const Three = () => {
  
    
        const goToInstagram = () => {
            const url = `instagram://user?username=fatec_jacarei`;
            Linking.canOpenURL(url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(url);
                    } else {
                        alert('Não foi possível abrir ao instagram');
                    }
                })
                .catch((err) => console.error('Erro ao abrir a interface de discagem', err));
        };
    
        return (
            <View style={styles.container}>
    
                <Pressable style={[styles.button, { alignItems: "center" }]} onPress={goToInstagram}>
                    <Text>Ir para o Intagram</Text>
                </Pressable>
            </View>
        );
    }

export default Three;