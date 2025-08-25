import { Pressable, TextInput, Text, View, SafeAreaView } from "react-native";
import { styles } from "../styles";
import { useState } from "react";

const Six = () => {
  const [nome, setNome] = useState("");

  const [idade, setIdade] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => setNome(value)}
        style={styles.input}
        placeholder="Insira seu e-mail"
      />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(value) => setIdade(value)}
        style={styles.input}
        placeholder="Insira sua Idade"
      />

      <View style={{ flexDirection: "row", gap: 20 }}>
        <Pressable>
          <Text style={styles.button}>Cadastrar</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>Logar</Text>
        </Pressable>
      </View>

      <Text style={styles.result}> {`${nome} , ${idade} `}</Text>
    </SafeAreaView>
  );
};

export default Six;
