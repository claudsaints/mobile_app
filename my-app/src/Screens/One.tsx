import { View, Button, Alert, Linking, SafeAreaView, Pressable ,Text} from 'react-native';
import { styles } from '../styles';


const One: React.FC = () => {
    const goToYoutube = () => {
        const url = 'vnd.youtube://rShjZ_op1V8'

        Linking.canOpenURL(url).then((supported) => {
            if (supported) {  
                Linking.openURL(url);
            } else { Alert.alert('Erro', 'Este dispositivo não suporta envio de SMS.'); }
        }).catch((err) => console.error('Erro ao enviar SMS', err));

    }; 
    
    return (
        <SafeAreaView style={styles.container}>
            <View> 
                <Pressable style={[styles.button, {alignItems: "center"}]} onPress={goToYoutube}>
                    <Text>IR PARA O YOUTUBE</Text>    
                </Pressable> 
            </View>
        </SafeAreaView >
    );
};

export default One;