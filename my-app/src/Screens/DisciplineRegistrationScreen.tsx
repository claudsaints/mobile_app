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
      Alert.alert('Authentication Error', 'You are not authenticated. Please log in.');
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
      Alert.alert('Success', 'Discipline registered successfully!');
      navigation.navigate('Disciplines'); // Navigate back to discipline list
    } catch (error: any) {
      console.error('Discipline registration failed:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New Discipline</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={descricao}
          onChangeText={setDescricao}
          editable={!loading}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegisterDiscipline} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register Discipline'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Disciplines')}>
          <Text style={styles.linkButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DisciplineRegistrationScreen;
