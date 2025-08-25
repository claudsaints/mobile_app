import { Pressable, Text } from "react-native"
import { styles } from "../styles";

interface LinkButtonProps{
    label: string;
}

const LinkButton = ({label}: LinkButtonProps) => {
    return (
        <Pressable style={styles.linkbutton}>
            <Text style={styles.linkButtonLabel}>{label}</Text>            
        </Pressable>
    )
}

export default LinkButton;