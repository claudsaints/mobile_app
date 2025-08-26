// src/screens/CepHistoryScreen.tsx
import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet,View } from 'react-native';
import { useCepHistory } from '../Contexts/CepHistoryContext';

export default function CepHistory() {
  const { history } = useCepHistory();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Histórico de Consultas de CEPs</Text>
      {history.length === 0 ? (
        <Text style={styles.message}>Nenhum histórico disponível.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>CEP: {item.cep}</Text>
              <Text>Logradouro: {item.logradouro}</Text>
              <Text>Localidade: {item.localidade}</Text>
              <Text>UF: {item.uf}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: 'gray',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
