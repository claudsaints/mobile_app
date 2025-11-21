import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the type for a professor
interface Professor {
  usuarioId: number;
  usuario: {
    nome: string;
    email: string;
  };
}

type ProfessorListScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Professors'>;

interface ProfessorListScreenProps {
  navigation: ProfessorListScreenNavigationProp;
}

const ProfessorListScreen: React.FC<ProfessorListScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfessors = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response: any = await api.get('/professor', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfessors(response.data);
    } catch (err: any) {
      console.error('Failed to fetch professors:', err.response?.data || err.message);
      setError('Failed to load professors. Please try again later.');
      Alert.alert('Error', 'Failed to load professors.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchProfessors();
    }, [fetchProfessors])
  );

  const renderItem = ({ item }: { item: Professor }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Name: {item.usuario.nome}</Text>
      <Text style={styles.listItemText}>Email: {item.usuario.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Loading professors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchProfessors}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professors</Text>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.usuarioId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('RegisterProfessor')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfessorListScreen;
