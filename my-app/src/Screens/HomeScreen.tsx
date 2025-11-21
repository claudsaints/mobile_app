import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../Contexts/AuthContext';
import { styles } from '../styles';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Routes/AppDrawer.Routes';

type HomeScreenNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}


const MenuButton = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity style={[styles.button, { flexDirection: 'row', gap: 10, width: "80%", alignContent: "center", justifyContent: "center" }]} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#FFF" />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { signOut, userType } = useAuth();

  return (

      <ScrollView contentContainerStyle={ { paddingTop: 40 }}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={[styles.subtitle, {fontSize: 20, textAlign: "center"}]}>Você está logado como {userType}.</Text>
        <Text style={[styles.subtitle, {fontSize: 20, textAlign: "center", color: "red"}]} onPress={signOut} >Sair</Text>

        {/* SEÇÃO PROFESSOR */}
        {userType === 'PROFESSOR' && (
          <View style={{alignItems: "center"}}>
            <MenuButton
              title="Gerenciar Alunos"
              icon="people-circle"
              onPress={() => navigation.navigate('Students')}
            />

            <MenuButton
              title="Gerenciar Disciplinas"
              icon="book"
              onPress={() => navigation.navigate('Disciplines')}
            />

            <MenuButton
              title="Gerenciar Professores"
              icon="school"
              onPress={() => navigation.navigate('Professors')}
            />

            <MenuButton
              title="Cadastrar Aluno"
              icon="person-add"
              onPress={() => navigation.navigate('RegisterStudent')}
            />

            <MenuButton
              title="Cadastrar Disciplina"
              icon="add-circle"
              onPress={() => navigation.navigate('RegisterDiscipline')}
            />

            <MenuButton
              title="Cadastrar Professor"
              icon="person-add-outline"
              onPress={() => navigation.navigate('RegisterProfessor')}
            />

            <MenuButton
              title="Gerenciar Notas"
              icon="create"
              onPress={() => navigation.navigate('MatriculaManagement')}
            />
           </View>
        )}

        {/* SEÇÃO ALUNO */}
        {userType === 'ALUNO' && (
          <View>
            <MenuButton
              title="Ver Boletim Acadêmico"
              icon="document-text"
              onPress={() => navigation.navigate('Bulletin')}
            />
          </View>
        )}
      </ScrollView>

  );
};

export default HomeScreen;
