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


export interface RootDrawerParamList extends ParamListBase {
    Home: undefined;
    Students: undefined;
    Disciplines: undefined;
    Professors: undefined;
    RegisterStudent: undefined;
    RegisterDiscipline: undefined;
    RegisterProfessor: undefined;
    Bulletin: undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawerNavigator() {
    return (
        <Drawer.Navigator screenOptions={{ drawerActiveTintColor: '#e22828ff', drawerInactiveTintColor: '#333' }}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
              
            />
            <Drawer.Screen
                name="Students"
                component={StudentListScreen}
              
            />
            <Drawer.Screen
                name="RegisterStudent"
                component={StudentRegistrationScreen}
              
            />
            <Drawer.Screen
                name="Disciplines"
                component={DisciplineListScreen}
              
            />
            <Drawer.Screen
                name="RegisterDiscipline"
                component={DisciplineRegistrationScreen}
              
            />
            <Drawer.Screen
                name="Professors"
                component={ProfessorListScreen}
              
            />
            <Drawer.Screen
                name="RegisterProfessor"
                component={ProfessorRegistrationScreen}
              
            />
            <Drawer.Screen
                name="Bulletin"
                component={BulletinScreen}
              
            />
        </Drawer.Navigator>
    );
}
