import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  id: number;
  tipo: string;
  exp: number; // Expiration time
  iat: number; // Issued at time
}

interface DisciplineGrade {
  id: number;
  nota: number | null;
  disciplina: {
    id: number;
    descricao: string;
  };
}

interface BulletinData {
  usuarioId: number;
  matricula: string;
  disciplinas: DisciplineGrade[];
}

const BulletinScreen: React.FC = () => {
  const { token } = useAuth();
  const [bulletin, setBulletin] = useState<BulletinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBulletin = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const usuarioId = decodedToken.id;

      const response = await api.get(`/aluno/${usuarioId}/bulletin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBulletin(response.data);
    } catch (err: any) {
      console.error('Failed to fetch bulletin:', err.response?.data || err.message);
      setError('Failed to load bulletin. Please try again later.');
      Alert.alert('Error', 'Failed to load academic bulletin.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchBulletin();
    }, [fetchBulletin])
  );

  const renderItem = ({ item }: { item: DisciplineGrade }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Discipline: {item.disciplina.descricao}</Text>
      <Text style={styles.listItemText}>Grade: {item.nota !== null ? item.nota : 'N/A'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Loading bulletin...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchBulletin}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Academic Bulletin</Text>
      {bulletin?.disciplinas.length === 0 ? (
        <Text style={styles.text}>No disciplines found in your bulletin.</Text>
      ) : (
        <FlatList
          data={bulletin?.disciplinas}
          keyExtractor={(item) => item.disciplina.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ width: '100%' }}
        />
      )}
    </View>
  );
};

export default BulletinScreen;
