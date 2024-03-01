


import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/Chat';
import globalstyle from '../theme/style';
import { Text } from 'react-native';
import { colors, fonts } from '../theme';
import SoundWaveSlider from '../screens/SoundWaveSlider';
import ParallaxScroll from '../screens/ParallaxScroll';
const Stack = createStackNavigator();

const StackNavigator = () => {
    return <Stack.Navigator initialRouteName="SoundWaveSlider">
        <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
                headerTitle: () => <><Text style={{ fontSize: 16, fontFamily: fonts.primarySemiBold, color: colors.black, marginBottom: -6 }}>Hi Joseph</Text>
                    <Text style={{ fontSize: 12, fontFamily: fonts.primary, color: colors.grey }}>Today is good day for you</Text></>,
                headerStyle: { backgroundColor: '#f7f7f7' },
                // headerTitleAlign: 'center',
                // headerTitleStyle: globalstyle.headerTitleStyle,
                // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                // headerLeft: () => <DrawerIcon navigation={navigation} />,
                // headerRight: () => <NotificationIcon navigation={navigation} />
                // headerTransparent: true,
                // headerStyle: {height: 120 },
                // headerTitle: () => <SearchHeader />,
                // headerLeft: () => <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10 }} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} activeOpacity={0.8}>
                //     <Icon name={'align-right'} size={22} color={colors.black} />
                // </TouchableOpacity>,
                // headerRight: () => (<TouchableOpacity>
                //     <Icon name={'bell'} size={18} color={colors.black} />
                // </TouchableOpacity>)
            }}
        />
        <Stack.Screen
            name="SoundWaveSlider"
            component={SoundWaveSlider}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="ParallaxScroll"
            component={ParallaxScroll}
            options={{
                // title: '',
                // headerTransparent: true
                headerShown: false
            }}
        />
    </Stack.Navigator>
}

export default StackNavigator;