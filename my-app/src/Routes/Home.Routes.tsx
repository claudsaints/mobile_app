import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
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

export interface RootStackParamList extends ParamListBase {
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

export type HomeNavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

export function HomeStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Um" component={One} />
            <Stack.Screen name="Dois" component={Two} />
            <Stack.Screen name="Tres" component={Three} />
            <Stack.Screen name="Quatro" component={Four} />
            <Stack.Screen name="Cinco" component={Five} />
            <Stack.Screen name="Seis" component={Six} />
            <Stack.Screen name="Sete" component={Seven} />
            <Stack.Screen name="Oito" component={Eight} />
            <Stack.Screen name="Nove" component={Nine} />
            <Stack.Screen name="Dez" component={Ten} />
        </Stack.Navigator>
    );
}

