import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import StudentListScreen from '../Screens/StudentListScreen';
import DisciplineListScreen from '../Screens/DisciplineListScreen';
import ProfessorListScreen from '../Screens/ProfessorListScreen';
import StudentRegistrationScreen from '../Screens/StudentRegistrationScreen';
import DisciplineRegistrationScreen from '../Screens/DisciplineRegistrationScreen';
import ProfessorRegistrationScreen from '../Screens/ProfessorRegistrationScreen';
import BulletinScreen from '../Screens/BulletinScreen';
import MatriculaManagementScreen from '../Screens/MatriculaManagementScreen';
import MyDisciplinesScreen from '../Screens/MyDisciplinesScreen';
import DisciplineDetailsScreen from '../Screens/DisciplineDetailsScreen';
import AddStudentToDisciplineScreen from '../Screens/AddStudentToDisciplineScreen';
import { useAuth } from '../Contexts/AuthContext';

export interface RootDrawerParamList extends ParamListBase {
    Home: undefined;
    Students: undefined;
    Disciplines: undefined;
    Professors: undefined;
    RegisterStudent: undefined;
    RegisterDiscipline: undefined;
    RegisterProfessor: undefined;
    Bulletin: undefined;
    MatriculaManagement: undefined;
    MyDisciplines: undefined;
    DisciplineDetails: { disciplineId: number };
    AddStudentToDiscipline: { disciplineId: number };
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawerNavigator() {
    const { userType } = useAuth();

    return (
        <Drawer.Navigator screenOptions={{ drawerActiveTintColor: '#e22828ff', drawerInactiveTintColor: '#333' }}>
            {userType === 'ALUNO' ? (
                <>
                    <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
                    <Drawer.Screen name="Bulletin" component={BulletinScreen} options={{ title: 'Boletim' }} />
                    <Drawer.Screen name="MyDisciplines" component={MyDisciplinesScreen} options={{ title: 'Minhas Disciplinas' }} />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
                    <Drawer.Screen name="Students" component={StudentListScreen} options={{ title: 'Alunos' }} />
                    <Drawer.Screen name="Disciplines" component={DisciplineListScreen} options={{ title: 'Disciplinas' }} />
                    <Drawer.Screen name="Professors" component={ProfessorListScreen} options={{ title: 'Professores' }} />
                    <Drawer.Screen name="RegisterStudent" component={StudentRegistrationScreen} options={{ title: 'Cadastrar Aluno' }} />
                    <Drawer.Screen name="RegisterDiscipline" component={DisciplineRegistrationScreen} options={{ title: 'Cadastrar Disciplina' }} />
                    <Drawer.Screen name="RegisterProfessor" component={ProfessorRegistrationScreen} options={{ title: 'Cadastrar Professor' }} />
                    <Drawer.Screen name="MatriculaManagement" component={MatriculaManagementScreen} options={{ title: 'Gerenciar Notas' }} />
                    <Drawer.Screen name="DisciplineDetails" component={DisciplineDetailsScreen} options={{ drawerItemStyle: { height: 0 } }} />
                    <Drawer.Screen name="AddStudentToDiscipline" component={AddStudentToDisciplineScreen} options={{ drawerItemStyle: { height: 0 } }} />
                </>
            )}
        </Drawer.Navigator>
    );
}
