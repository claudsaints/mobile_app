import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Matricula {
  id: number;
  aluno: {
    usuario: {
      nome: string;
    }
  };
  disciplina: {
    descricao: string;
  };
  nota: number | null;
}

type MatriculaManagementScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'MatriculaManagement'>;

interface MatriculaManagementScreenProps {
  navigation: MatriculaManagementScreenNavigationProp;
}

const MatriculaManagementScreen: React.FC<MatriculaManagementScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatricula, setSelectedMatricula] = useState<Matricula | null>(null);
  const [nota, setNota] = useState<string>('');
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
      const response: any = await api.get('/matricula/list', {
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
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchMatriculas();
    }, [fetchMatriculas])
  );

  const handleUpdateNota = async () => {
    if (!selectedMatricula) return;

    setLoading(true);
    try {
      await api.put('/matricula', {
        id: selectedMatricula.id,
        alunoId: selectedMatricula.aluno.usuarioId,
        disciplinaId: selectedMatricula.disciplina.id,
        nota: parseFloat(nota),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Nota atualizada com sucesso!');
      setModalVisible(false);
      fetchMatriculas();
    } catch (error: any) {
      console.error('Falha ao atualizar a nota:', error.response?.data || error.message);
      Alert.alert('Falha na Atualização', error.response?.data?.message || 'Algo deu errado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (matricula: Matricula) => {
    setSelectedMatricula(matricula);
    setNota(matricula.nota?.toString() || '');
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Matricula }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>Aluno: {item.aluno.usuario.nome}</Text>
        <Text style={styles.listItemText}>Disciplina: {item.disciplina.descricao}</Text>
        <Text style={styles.listItemText}>Nota: {item.nota !== null ? item.nota : 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !modalVisible) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Carregando matrículas...</Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Notas</Text>
      <FlatList
        data={matriculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Atualizar Nota</Text>
            <TextInput
              style={styles.input}
              placeholder="Nota"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateNota} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Atualizando...' : 'Atualizar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MatriculaManagementScreen;
