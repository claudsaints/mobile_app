import { Pressable, TextInput, Text, View, SafeAreaView } from "react-native";
import { styles } from "../styles";
import { useState } from "react";


const Six = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formField}>
                <Text style={styles.title}>Cadastrar</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={(value) => setEmail(value)} style={styles.input}
                    placeholder="Insira seu e-mail"
                />


                <Text style={styles.label}>Senha</Text>
                <TextInput 
                    secureTextEntry={true} 
                    onChangeText={(value) => setPassword(value)} 
                    style={styles.input} 
                    placeholder="Insira sua senha" 
                />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput 
                    secureTextEntry={true} 
                    onChangeText={(value) => setConfirmPassword(value)} 
                    style={styles.input} 
                    placeholder="Insira sua senha" 
                />

                <View style={{ flexDirection: "row", gap: 20 }}>
                    <Pressable >
                        <Text style={styles.button}>Cadastrar</Text>
                    </Pressable>
                    <Pressable >
                        <Text style={styles.button}>Logar</Text>
                    </Pressable>
                </View>

                <Text style={styles.result}> {`${email} , ${password} , ${confirmPassword}`}</Text>
            </View>
        </SafeAreaView>
    )
}

export default Six;