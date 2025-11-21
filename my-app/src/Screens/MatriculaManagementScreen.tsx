import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../Services/api';
import { MatriculaAluno } from '../types/index';

export default function MatriculasScreen() {
  const [data, setData] = useState<MatriculaAluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<MatriculaAluno | null>(null);
  const [nota, setNota] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await api.get<MatriculaAluno[]>('/matricula/list');
      setData(response.data);
    } catch (error) {
      console.log("ERRO FRONT ===> ", error);
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const openModal = (item: MatriculaAluno) => {
    setSelected(item);
    setNota(item.nota ? item.nota.toString() : '');
    setModalVisible(true);
  };

  const updateNota = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      await api.put(`/matricula/update/${selected.id}`, {
        nota: parseFloat(nota)
      });

      Alert.alert('Sucesso', 'Nota atualizada!');
      setModalVisible(false);

      loadData();
    } catch (err: any) {
      console.log("ERRO AO ATUALIZAR ===> ", err.response?.data || err.message);
      Alert.alert('Erro', 'Não foi possível atualizar a nota');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: MatriculaAluno }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View
        style={{
          backgroundColor: '#FFF',
          marginBottom: 10,
          padding: 15,
          borderRadius: 8,
          elevation: 2
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Aluno: {item.aluno.usuario.nome}
        </Text>

        <Text style={{ fontSize: 14 }}>
          Matrícula: {item.aluno.matricula}
        </Text>

        <Text style={{ fontSize: 14 }}>
          Disciplina: {item.disciplina.descricao}
        </Text>

        <Text style={{ fontSize: 14 }}>
          Nota: {item.nota ?? 'Sem nota'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !modalVisible) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* MODAL */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View
            style={{
              backgroundColor: '#FFF',
              width: '85%',
              padding: 20,
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Atualizar Nota
            </Text>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#CCC',
                padding: 10,
                borderRadius: 8,
                marginBottom: 15
              }}
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
              placeholder="Digite a nota"
            />

            <TouchableOpacity
              onPress={updateNota}
              style={{
                backgroundColor: '#2196F3',
                padding: 12,
                borderRadius: 8,
                marginBottom: 10
              }}
            >
              <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}>
                Atualizar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#E53935',
                padding: 12,
                borderRadius: 8
              }}
            >
              <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}
