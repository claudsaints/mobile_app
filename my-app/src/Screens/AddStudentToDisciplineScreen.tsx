import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';

interface Student {
  usuarioId: number;
  usuario: {
    nome: string;
  };
}

type AddStudentToDisciplineScreenRouteProp = RouteProp<RootDrawerParamList, 'AddStudentToDiscipline'>;
type AddStudentToDisciplineScreenNavigationProp = StackNavigationProp<RootDrawerParamList, 'AddStudentToDiscipline'>;

interface AddStudentToDisciplineScreenProps {
  route: AddStudentToDisciplineScreenRouteProp;
  navigation: AddStudentToDisciplineScreenNavigationProp;
}

const AddStudentToDisciplineScreen: React.FC<AddStudentToDisciplineScreenProps> = ({ route, navigation }) => {
  const { disciplineId } = route.params;
  const { token } = useAuth();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchAllStudents();
    }, [fetchAllStudents])
  );

  const handleAddStudent = async (alunoId: number) => {
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
      navigation.goBack();
    } catch (error: any) {
      console.error('Falha ao matricular aluno:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao matricular aluno.');
    }
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity onPress={() => handleAddStudent(item.usuarioId)}>
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
      <View style={[styles.container, styles.container]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchAllStudents}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Aluno à Disciplina</Text>
      <FlatList
        data={allStudents}
        keyExtractor={(item) => item.usuarioId.toString()}
        renderItem={renderStudentItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddStudentToDisciplineScreen;
