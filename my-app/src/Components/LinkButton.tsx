import { Pressable, Text } from "react-native"
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProps } from "../Routes/Home.Routes";
interface LinkButtonProps{
    label: string;
    navigateTo: string;
}

const LinkButton = ({label, navigateTo}: LinkButtonProps) => {

    const navigation = useNavigation<HomeNavigationProps>();

    return (
        <Pressable style={styles.linkbutton} onPress={() => {
            navigation.navigate(navigateTo);
        }}>
            <Text style={styles.linkButtonLabel}>{label}</Text>            
        </Pressable>
    )
}

export default LinkButton;