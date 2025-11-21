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
      Alert.alert('Authentication Error', 'You are not authenticated. Please log in.');
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
      Alert.alert('Success', 'Professor registered successfully!');
      navigation.navigate('Professors'); // Navigate back to professor list
    } catch (error: any) {
      console.error('Professor registration failed:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New Professor</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleRegisterProfessor} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register Professor'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Professors')}>
          <Text style={styles.linkButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfessorRegistrationScreen;
