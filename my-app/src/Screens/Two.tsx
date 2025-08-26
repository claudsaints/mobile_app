import { View, Linking, Pressable, Text } from 'react-native';
import { styles } from '../styles';


const Two: React.FC = () => {
    const numeroDeTelefone = '11999999999';

    const fazerLigacao = () => {
        const url = `tel:${numeroDeTelefone}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    alert('Não foi possível abrir a interface de discagem');
                }
            })
            .catch((err) => console.error('Erro ao abrir a interface de discagem', err));
    };

    return (
        <View style={styles.container}>

            <Pressable style={[styles.button, { alignItems: "center" }]} onPress={fazerLigacao}>
                <Text>Ligar para o número</Text>
            </Pressable>
        </View>
    );
};



export default Two;