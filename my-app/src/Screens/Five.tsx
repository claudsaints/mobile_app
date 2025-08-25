import { View } from "react-native"
import Container from "../Components/Container"
import React from "react";
import ImageIcon from "../Components/ImageIcon";



const Five = () => {
    return (
        <Container >
            <View style={{ backgroundColor: "crimson", flex: 0.5, flexDirection: "row" }}>
                <View style={{ backgroundColor: "lime", flex: 0.5 }}>

                    <ImageIcon />
                </View>
                <View style={{ backgroundColor: "aquamarine", flex: 0.5, flexDirection: "column" }}>
                    <View style={{ backgroundColor: "teal", flex: 0.5 }}>

                        <ImageIcon />
                    </View>
                    <View style={{ backgroundColor: "skyblue", flex: 0.5 }}>

                        <ImageIcon />
                    </View>

                </View>
            </View>
            <View style={{ backgroundColor: "salmon", flex: 0.5 }}>
                <ImageIcon />
            </View>

        </Container>
    )
}


export default Five;