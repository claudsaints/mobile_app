//import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/Drawer';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Home from '../Screens/Home';
import One from '../Screens/One';
import Two from '../Screens/Two';
import Three from '../Screens/Three';
import Four from '../Screens/Four';
import Five from '../Screens/Five';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { CepHistoryProvider } from '../Contexts/CepHistoryContext';
import ScreenDisplay from '../Screens/Test/ScreenDisplay';

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
        <CepHistoryProvider>
            <Drawer.Navigator >
                <Drawer.Screen
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="home" size={size} color={color} />
                        ),
                    }}
                    name="Home" component={Home}
                />


        
                <Drawer.Screen
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="local-activity" size={size} color={color} />
                        ),
                    }}
                    name="Um" component={One}
                />
                <Drawer.Screen
                    name="Dois" component={Two}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="menu-book" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Tres" component={Three}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="hive" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Quatro" component={Four}
                    
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="invert-colors-on" size={size} color={color} />
                        ),
                        headerTransparent: true,
                    }}
                />
                <Drawer.Screen name="Cinco" component={Five}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="domain" size={size} color={color} />
                        ),
                    }}
                />

            
                
                <Drawer.Screen name="Test" component={ScreenDisplay}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="mail-outline" size={size} color={color} />
                        ),
                    }}
                />

    </Drawer.Navigator>


        </CepHistoryProvider>
    );
}

