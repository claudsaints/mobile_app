import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal, Button } from 'react-native';
import { useFocusEffect, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Student {
  usuarioId: number;
  usuario: {
    nome: string;
  };
}

interface Matricula {
  id: number;
  aluno: Student;
}

type DisciplineDetailsScreenRouteProp = RouteProp<RootDrawerParamList, 'DisciplineDetails'>;
type DisciplineDetailsScreenNavigationProp = StackNavigationProp<RootDrawerParamList, 'DisciplineDetails'>;

interface DisciplineDetailsScreenProps {
  route: DisciplineDetailsScreenRouteProp;
  navigation: DisciplineDetailsScreenNavigationProp;
}

const DisciplineDetailsScreen: React.FC<DisciplineDetailsScreenProps> = ({ route, navigation }) => {
  const { disciplineId } = route.params;
  const { token } = useAuth();
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchMatriculas = useCallback(async () => {
    if (!token) {
      setError('Token de autenticação não encontrado.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response: any = await api.get(`/matricula/disciplina/${disciplineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatriculas(response.data);
    } catch (err: any) {
      console.error('Falha ao buscar matrículas:', err.response?.data || err.message);
      setError('Falha ao carregar matrículas. Por favor, tente novamente mais tarde.');
      Alert.alert('Erro', 'Falha ao carregar matrículas.');
    } finally {
      setLoading(false);
    }
  }, [token, disciplineId]);

  const fetchAllStudents = useCallback(async () => {
    if (!token) return;
    try {
      const response: any = await api.get('/aluno', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllStudents(response.data);
    } catch (err: any) {
      console.error('Falha ao buscar todos os alunos:', err.response?.data || err.message);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchMatriculas();
      fetchAllStudents();
    }, [fetchMatriculas, fetchAllStudents])
  );

  const handleAddStudent = async (alunoId: number, disciplineId: number) => {
    if (!token) return;
    try {
      await api.post('/matricula', {
        alunoId,
        disciplinaId: disciplineId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Aluno matriculado na disciplina com sucesso!');
      fetchMatriculas();
      setModalVisible(false);
    } catch (error: any) {
      console.error('Falha ao matricular aluno:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao matricular aluno.');
    }
  };

  const handleRemoveStudent = async (matriculaId: number) => {
    Alert.alert(
      'Confirmar Remoção',
      'Você tem certeza que deseja remover este aluno da disciplina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            if (!token) return;
            try {
              await api.delete('/matricula', {
                data: { id: matriculaId },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert('Sucesso', 'Aluno removido da disciplina com sucesso!');
              fetchMatriculas();
            } catch (error: any) {
              console.error('Falha ao remover aluno:', error.response?.data || error.message);
              Alert.alert('Erro', 'Falha ao remover aluno.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Matricula }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.aluno.usuario.nome}</Text>
      <TouchableOpacity onPress={() => handleRemoveStudent(item.id)}>
        <Icon name="delete" size={24} color="#D32F2F" />
      </TouchableOpacity>
    </View>
  );

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity onPress={() => handleAddStudent(item.usuarioId, disciplineId)}>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{item.usuario.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.container]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchMatriculas}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      <Text style={styles.title}>Alunos na Disciplina</Text>
      <FlatList
        data={matriculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddStudentToDiscipline', { disciplineId })}>
        <Text style={styles.buttonText}>Adicionar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DisciplineDetailsScreen;
