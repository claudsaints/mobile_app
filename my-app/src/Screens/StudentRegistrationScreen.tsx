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
      Alert.alert('Authentication Error', 'You are not authenticated. Please log in.');
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
      Alert.alert('Success', 'Student registered successfully!');
      navigation.navigate('Students'); // Navigate back to student list
    } catch (error: any) {
      console.error('Student registration failed:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New Student</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Matricula"
          value={matricula}
          onChangeText={setMatricula}
          editable={!loading}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegisterStudent} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register Student'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Students')}>
          <Text style={styles.linkButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentRegistrationScreen;
