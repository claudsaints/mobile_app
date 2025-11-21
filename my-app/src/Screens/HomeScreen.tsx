import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../Contexts/AuthContext';
import { styles } from '../styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';

type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { signOut, userType } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are logged in as {userType}.</Text>

        {userType === 'PROFESSOR' && (
          <View style={styles.innerContainer}>
            <Text style={styles.subtitle}>Management Options:</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Students')}>
              <Text style={styles.buttonText}>Manage Students</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Disciplines')}>
              <Text style={styles.buttonText}>Manage Disciplines</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Professors')}>
              <Text style={styles.buttonText}>Manage Professors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStudent')}>
              <Text style={styles.buttonText}>Register Student</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterDiscipline')}>
              <Text style={styles.buttonText}>Register Discipline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterProfessor')}>
              <Text style={styles.buttonText}>Register Professor</Text>
            </TouchableOpacity>
          </View>
        )}

        {userType === 'ALUNO' && (
          <View style={styles.innerContainer}>
            <Text style={styles.subtitle}>Student Options:</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bulletin')}>
              <Text style={styles.buttonText}>View Academic Bulletin</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000', marginTop: 30 }]} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
