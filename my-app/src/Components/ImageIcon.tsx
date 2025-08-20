import { Alert, Image, Pressable } from "react-native"
import logo from "../../assets/adaptive-icon.png";


const ImageIcon = () => {
    const SIZE = "100%";

    const handleClick = () => {
        Alert.alert("Boa Noite!!!")
    }

    return (
        <Pressable onPress={handleClick} style={{ flex: 1}}>

            <Image style={{ resizeMode: "contain", flex: 1, width: `${SIZE}`, height: `${SIZE}` }} source={logo} />

        </Pressable>
    )
}

export default ImageIcon;