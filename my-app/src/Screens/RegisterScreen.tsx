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
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post('/auth', { nome, email, senha, tipo }); 
      Alert.alert('Registration Successful', 'Your account has been created. Please log in.');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Registration failed:', error );
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
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
          placeholder="Password"
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
            <Picker.Item label="Student" value="ALUNO" />
            <Picker.Item label="Professor" value="PROFESSOR" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
