


import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
const Stack = createStackNavigator();

const AuthNavigator = () => {
    return <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{
                // headerTitle: '',
                // headerTitleAlign: 'center',
                // headerTitleStyle: globalstyle.headerTitleStyle,
                // // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                // // headerLeft: () => <DrawerIcon navigation={navigation} />,
                // // headerRight: () => <NotificationIcon navigation={navigation} />
                // headerTransparent: true,
                // // headerStyle: { height: 120 },
                // // headerTitle: () => <SearchHeader />,
                // // headerLeft: () => <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10 }} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} activeOpacity={0.8}>
                // //     <Icon name={'align-right'} size={22} color={colors.black} />
                // // </TouchableOpacity>,
                // // headerRight: () => (<TouchableOpacity>
                // //     <Icon name={'bell'} size={18} color={colors.black} />
                // // </TouchableOpacity>)
            }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{
            }}
        />
    </Stack.Navigator>
}

export default AuthNavigator;