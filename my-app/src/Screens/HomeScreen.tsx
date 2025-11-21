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
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Você está logado como {userType}.</Text>

        {userType === 'PROFESSOR' && (
          <View style={styles.innerContainer}>
            <Text style={styles.subtitle}>Opções de Gerenciamento:</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Students')}>
              <Text style={styles.buttonText}>Gerenciar Alunos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Disciplines')}>
              <Text style={styles.buttonText}>Gerenciar Disciplinas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Professors')}>
              <Text style={styles.buttonText}>Gerenciar Professores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterStudent')}>
              <Text style={styles.buttonText}>Cadastrar Aluno</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterDiscipline')}>
              <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterProfessor')}>
              <Text style={styles.buttonText}>Cadastrar Professor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MatriculaManagement')}>
              <Text style={styles.buttonText}>Gerenciar Notas</Text>
            </TouchableOpacity>
          </View>
        )}

        {userType === 'ALUNO' && (
          <View style={styles.innerContainer}>
            <Text style={styles.subtitle}>Opções do Aluno:</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bulletin')}>
              <Text style={styles.buttonText}>Ver Boletim Acadêmico</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000', marginTop: 30 }]} onPress={signOut}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
