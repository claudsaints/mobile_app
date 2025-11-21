import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';

type DisciplineRegistrationScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'RegisterDiscipline'>;

interface DisciplineRegistrationScreenProps {
  navigation: DisciplineRegistrationScreenNavigationProp;
}

const DisciplineRegistrationScreen: React.FC<DisciplineRegistrationScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterDiscipline = async () => {
    if (!token) {
      Alert.alert('Erro de Autenticação', 'Você não está autenticado. Por favor, faça o login.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/disciplina', {
        descricao,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Disciplina cadastrada com sucesso!');
      navigation.navigate('Disciplines'); // Navigate back to discipline list
    } catch (error: any) {
      console.error('Falha no cadastro da disciplina:', error.response?.data || error.message);
      Alert.alert('Falha no Cadastro', error.response?.data?.message || 'Algo deu errado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Disciplina</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          editable={!loading}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegisterDiscipline} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar Disciplina'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Disciplines')}>
          <Text style={styles.linkButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisciplineRegistrationScreen;
