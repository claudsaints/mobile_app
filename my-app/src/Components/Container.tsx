import React from "react"
import { View } from "react-native"

interface Props {
    children: React.JSX.Element[];
    bgColor?: string;
}


const Container = ({ children, bgColor }: Props) => {
    return (
        
        <View style={{ flex: 1, paddingTop: 32, backgroundColor: bgColor}}>
            {children}
        </View>
    )
}

export default Container;