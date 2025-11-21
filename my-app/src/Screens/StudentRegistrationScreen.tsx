import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';

type StudentRegistrationScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'RegisterStudent'>;

interface StudentRegistrationScreenProps {
  navigation: StudentRegistrationScreenNavigationProp;
}

const StudentRegistrationScreen: React.FC<StudentRegistrationScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterStudent = async () => {
    if (!token) {
      Alert.alert('Erro de Autenticação', 'Você não está autenticado. Por favor, faça o login.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/aluno', {
        nome,
        email,
        senha,
        tipo: 'ALUNO',
        matricula,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      navigation.navigate('Students'); // Navigate back to student list
    } catch (error: any) {
      console.error('Falha no cadastro do aluno:', error.response?.data || error.message);
      Alert.alert('Falha no Cadastro', error.response?.data?.message || 'Algo deu errado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Aluno</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          editable={!loading}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegisterStudent} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar Aluno'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Students')}>
          <Text style={styles.linkButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentRegistrationScreen;
