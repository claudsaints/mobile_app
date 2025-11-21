import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the type for a student, assuming it has id, name, and email
interface Student {
  usuarioId: number;
  matricula: string;
  usuario: {
    nome: string;
    email: string;
  };
}

type StudentListScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Students'>;

interface StudentListScreenProps {
  navigation: StudentListScreenNavigationProp;
}

const StudentListScreen: React.FC<StudentListScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response: any = await api.get('/aluno', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
    } catch (err: any) {
      console.error('Failed to fetch students:', err.response?.data || err.message);
      setError('Failed to load students. Please try again later.');
      Alert.alert('Error', 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [fetchStudents])
  );

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Name: {item.usuario.nome}</Text>
      <Text style={styles.listItemText}>Email: {item.usuario.email}</Text>
      <Text style={styles.listItemText}>Matricula: {item.matricula}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchStudents}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.usuarioId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('RegisterStudent')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default StudentListScreen;
