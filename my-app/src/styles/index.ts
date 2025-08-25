import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        marginBottom: 20,
        width: "92%",
        borderRadius: 10
    },
    label: {
        textAlign: "left",
        alignSelf: "flex-start",
        paddingLeft: 20,
    },
    button: {
        backgroundColor: "violet",
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        color: "white"
    },
    container: {
        flex: 1, backgroundColor: "gray", justifyContent: "center", alignContent: "center"
    },
    result: { flex: 0.2, alignSelf: "baseline", fontWeight: "bold", paddingLeft: 20, fontSize: 10, color: "white" },
    formField: {
        borderStyle: "solid",
        borderWidth: 4,
        borderCurve: "circular",
        borderColor: "#fff",
        borderRadius: 10,
        flex: 0.8,
        alignItems: "center",
        justifyContent: "center",
        marginInline: 50,
    },
    title: {
        fontSize: 30,
        color: "gold",
        fontWeight: "bold"
    }
})