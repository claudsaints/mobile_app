import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';

type ProfessorRegistrationScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'RegisterProfessor'>;

interface ProfessorRegistrationScreenProps {
  navigation: ProfessorRegistrationScreenNavigationProp;
}

const ProfessorRegistrationScreen: React.FC<ProfessorRegistrationScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterProfessor = async () => {
    if (!token) {
      Alert.alert('Erro de Autenticação', 'Você não está autenticado. Por favor, faça o login.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/professor', {
        nome,
        email,
        senha,
        tipo: 'PROFESSOR',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
      navigation.navigate('Professors'); // Navigate back to professor list
    } catch (error: any) {
      console.error('Falha no cadastro do professor:', error.response?.data || error.message);
      Alert.alert('Falha no Cadastro', error.response?.data?.message || 'Algo deu errado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Professor</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          editable={!loading}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegisterProfessor} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar Professor'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Professors')}>
          <Text style={styles.linkButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfessorRegistrationScreen;
