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
      setError('Token de autenticação não encontrado.');
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
      console.error('Falha ao buscar professores:', err.response?.data || err.message);
      setError('Falha ao carregar professores. Por favor, tente novamente mais tarde.');
      Alert.alert('Erro', 'Falha ao carregar professores.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchProfessors();
    }, [fetchProfessors])
  );

  const handleDelete = async (usuarioId: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este professor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete('/professor', {
                data: { usuarioId },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert('Sucesso', 'Professor excluído com sucesso!');
              fetchProfessors();
            } catch (err: any) {
              console.error('Falha ao excluir professor:', err.response?.data || err.message);
              Alert.alert('Erro', 'Falha ao excluir professor.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Professor }) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listItemText}>Nome: {item.usuario.nome}</Text>
        <Text style={styles.listItemText}>Email: {item.usuario.email}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.usuarioId)}>
        <Icon name="delete" size={24} color="#D32F2F" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Carregando professores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchProfessors}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professores</Text>
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
