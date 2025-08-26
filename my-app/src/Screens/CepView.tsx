
import { SafeAreaView, TextInput, Text, Pressable, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import { CepInfo } from "../types";
import api from "../Services";
import { useCepHistory } from "../Contexts/CepHistoryContext";

export default function CepView() {
  const [cep, setCep] = useState("");
  const [resultCep, setResultCep] = useState<CepInfo>({} as CepInfo);
  const [requestError, setRequestError] = useState(false);
  const { addToHistory } = useCepHistory();

  const handleCepRequest = async () => {
    setRequestError(false);
    try {
      const { data } = await api.get<CepInfo>(`${cep}/json`);
      setResultCep(data);
      // Adiciona ao histórico
      addToHistory(data);
    } catch (error) {
      console.log(error);
      setRequestError(true);
    }
  };

  return (
    <SafeAreaView style={[styles.flexContainer, { flex: 1 }]}>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="numeric"
        onChangeText={(value) => setCep(value)}
        style={styles.input}
        placeholder="Insira um CEP"
      />

      <Pressable
        onPress={handleCepRequest}
        style={[styles.button, { width: "90%", alignItems: "center" }]}
      >
        <Text>Obter</Text>
      </Pressable>

      {!requestError && resultCep.logradouro && (
        <View style={{ margin: 40, alignItems: "baseline", width: "100%", padding: 30 }}>
          <Text>Logradouro: {resultCep.logradouro}</Text>
          <Text>Localidade: {resultCep.localidade}</Text>
          <Text>UF: {resultCep.uf}</Text>
        </View>
      )}

      {requestError && (
        <View style={{ margin: 40, alignItems: "baseline", width: "100%", padding: 30 }}>
          <Text>CEP Inválido</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
