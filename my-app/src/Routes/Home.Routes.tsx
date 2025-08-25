//import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/Drawer';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../Screens/Home';
import One from '../Screens/One';
import Two from '../Screens/Two';
import Three from '../Screens/Three';
import Four from '../Screens/Four';
import Five from '../Screens/Five';
import Six from '../Screens/Six';
import Seven from '../Screens/Seven';
import Eight from '../Screens/Eight';
import Nine from '../Screens/Nine';
import Ten from '../Screens/Ten';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import CepView from '../Screens/CepView';

export interface RootDrawerParamList extends ParamListBase {
    Um: undefined;
    Dois: undefined;
    Tres: undefined;
    Quatro: undefined;
    Cinco: undefined;
    Seis: undefined;
    Sete: undefined;
    Oito: undefined;
    Nove: undefined;
    Dez: undefined;
    Onze: undefined;
}

export type HomeNavigationProps = DrawerNavigationProp<RootDrawerParamList>;

const Drawer = createDrawerNavigator();

export function HomeDrawerNavigation() {
    return (
        <Drawer.Navigator >
            <Drawer.Screen
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
                name="Home" component={Home}
            />
    
            <Drawer.Screen
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="content-paste-search" size={size} color={color} />
                    ),
                }}
                name="Cep" component={CepView}
            />
            <Drawer.Screen
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="local-activity" size={size} color={color} />
                    ),
                }}
                name="Um" component={One}
            />
            <Drawer.Screen
                name="Dois" component={Two}
                 options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="menu-book" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
            name="Tres" component={Three}
             options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="hive" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Quatro" component={Four}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="invert-colors-on" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Cinco" component={Five}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="domain" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Seis" component={Six}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="inventory" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Sete" component={Seven}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="calculate" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Oito" component={Eight}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="fingerprint" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Nove" component={Nine}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="key" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen name="Dez" component={Ten}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Icon name="mail-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

