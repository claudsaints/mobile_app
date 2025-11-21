import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the type for a discipline
interface Discipline {
  id: number;
  descricao: string;
}

type DisciplineListScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Disciplines'>;

interface DisciplineListScreenProps {
  navigation: DisciplineListScreenNavigationProp;
}

const DisciplineListScreen: React.FC<DisciplineListScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      const response: any = await api.get('/disciplina', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDisciplines(response.data);
    } catch (err: any) {
      console.error('Falha ao buscar disciplinas:', err.response?.data || err.message);
      setError('Falha ao carregar disciplinas. Por favor, tente novamente mais tarde.');
      Alert.alert('Erro', 'Falha ao carregar disciplinas.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchDisciplines();
    }, [fetchDisciplines])
  );

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta disciplina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete('/disciplina', {
                data: { id },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert('Sucesso', 'Disciplina excluída com sucesso!');
              fetchDisciplines();
            } catch (err: any) {
              console.error('Falha ao excluir disciplina:', err.response?.data || err.message);
              Alert.alert('Erro', 'Falha ao excluir disciplina.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Discipline }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => navigation.navigate('DisciplineDetails', { disciplineId: item.id })} style={{ flex: 1 }}>
        <Text style={styles.listItemText}>Descrição: {item.descricao}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Icon name="delete" size={24} color="#D32F2F" />
      </TouchableOpacity>
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
      <Text style={styles.title}>Disciplinas</Text>
      <FlatList
        data={disciplines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('RegisterDiscipline')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default DisciplineListScreen;
