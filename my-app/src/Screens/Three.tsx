import { View } from "react-native"
import Container from "../Components/Container"
import React from "react";




const Three = () => {
    return (
        <Container >
            <View style={{ backgroundColor: "crimson", flex: 0.5, flexDirection: "row" }}>
                <View style={{ backgroundColor: "lime", flex: 0.5 }}>

              
                </View>
                <View style={{ backgroundColor: "aquamarine", flex: 0.5, flexDirection: "column" }}>
                    <View style={{ backgroundColor: "teal", flex: 0.5 }}>

                       
                    </View>
                    <View style={{ backgroundColor: "skyblue", flex: 0.5 }}>

                     
                    </View>

                </View>
            </View>
            <View style={{ backgroundColor: "salmon", flex: 0.5 }}>
            
            </View>

        </Container>
    )
}


export default Three;