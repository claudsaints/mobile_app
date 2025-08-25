//import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/Drawer';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';

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
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Um" component={One} />
            <Drawer.Screen name="Dois" component={Two} />
            <Drawer.Screen name="Tres" component={Three} />
            <Drawer.Screen name="Quatro" component={Four} />
            <Drawer.Screen name="Cinco" component={Five} />
            <Drawer.Screen name="Seis" component={Six} />
            <Drawer.Screen name="Sete" component={Seven} />
            <Drawer.Screen name="Oito" component={Eight} />
            <Drawer.Screen name="Nove" component={Nine} />
            <Drawer.Screen name="Dez" component={Ten} />
        </Drawer.Navigator>
    );
}

