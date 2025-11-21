import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  tipo: string;
  exp: number;
  iat: number;
}

interface Discipline {
  id: number;
  disciplina: {
    id: number;
    descricao: string;
  };
}

const MyDisciplinesScreen: React.FC = () => {
  const { token } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplines = useCallback(async () => {
    if (!token) {
      setError('Token de autenticação não encontrado.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const usuarioId = decodedToken.id;

      const response: any = await api.get(`/matricula/aluno/${usuarioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDisciplines(response.data);
    } catch (err: any) {
      console.error('Falha ao buscar as disciplinas:', err.response?.data || err.message);
      setError('Falha ao carregar as disciplinas. Por favor, tente novamente mais tarde.');
      Alert.alert('Erro', 'Falha ao carregar as disciplinas.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchDisciplines();
    }, [fetchDisciplines])
  );

  const renderItem = ({ item }: { item: Discipline }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Disciplina: {item.disciplina.descricao}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Carregando disciplinas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchDisciplines}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Disciplinas</Text>
      {disciplines.length === 0 ? (
        <Text style={styles.text}>Você não está matriculado em nenhuma disciplina.</Text>
      ) : (
        <FlatList
          data={disciplines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ width: '100%' }}
        />
      )}
    </View>
  );
};

export default MyDisciplinesScreen;
