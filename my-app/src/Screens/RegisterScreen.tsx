import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../Routes/AuthStack.Routes';
import api from '../Services/api';
import { styles } from '../styles'; // Import shared styles

type RegisterScreenProps = StackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [tipo, setTipo] = React.useState('ALUNO'); // Default to ALUNO
  const [matricula, setMatricula] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post('/auth', { nome, email, senha, tipo, matricula }); 
      Alert.alert('Registro bem-sucedido', 'Sua conta foi criada. Por favor, faça o login.');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Registration failed:', error );
      Alert.alert('Falha no registro', error.response?.data?.message || 'Algo deu errado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
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
        <View style={styles.input}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue: string) => setTipo(itemValue)}
            enabled={!loading}
          >
            <Picker.Item label="Aluno" value="ALUNO" />
            <Picker.Item label="Professor" value="PROFESSOR" />
          </Picker>
        </View>
        {tipo === 'ALUNO' && (
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            value={matricula}
            onChangeText={setMatricula}
            editable={!loading}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Já tem uma conta? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
