import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';
import { styles } from '../styles';
import api from '../Services/api';
import { useAuth } from '../Contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the type for a discipline
interface Discipline {
  id: number;
  descricao: string;
}

type DisciplineListScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Disciplines'>;

interface DisciplineListScreenProps {
  navigation: DisciplineListScreenNavigationProp;
}

const DisciplineListScreen: React.FC<DisciplineListScreenProps> = ({ navigation }) => {
  const { token } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplines = useCallback(async () => {
    if (!token) {
      setError('Authentication token not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response: any = await api.get('/disciplina', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDisciplines(response.data);
    } catch (err: any) {
      console.error('Failed to fetch disciplines:', err.response?.data || err.message);
      setError('Failed to load disciplines. Please try again later.');
      Alert.alert('Error', 'Failed to load disciplines.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchDisciplines();
    }, [fetchDisciplines])
  );

  const renderItem = ({ item }: { item: Discipline }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>Description: {item.descricao}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.text}>Loading disciplines...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.flexContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={fetchDisciplines}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disciplines</Text>
      <FlatList
        data={disciplines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ width: '100%' }}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('RegisterDiscipline')}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default DisciplineListScreen;
