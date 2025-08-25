import { Pressable, TextInput, Text, View, SafeAreaView, Switch } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Ten = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("manager");

    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.title}>Cadastrar</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
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
          <Pressable>
            <Text style={styles.button}>Cadastrar</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.button}>Logar</Text>
          </Pressable>
        </View>

        <Picker
          style={{ backgroundColor: "#fff", width: "90%", margin: 10 }}
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="Gestor" value="manager" />
          <Picker.Item label="Usuário" value="user" />
          <Picker.Item label="Administrador" value="admin" />
        </Picker>


        <View style={{width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
         <Text>Manter-se conectado</Text>
         <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
          />
          </View>

        <Text style={styles.result}>
          {" "}
          {`${email} - ${password} - ${confirmPassword} - ${role} - ${isEnabled ? "Sim":"Não"}`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Ten;
