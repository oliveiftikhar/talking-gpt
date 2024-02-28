import { useRef, useState } from "react";
import StackNavigator from "./StackNavigator";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer } from '@react-navigation/native';

const Navigation = (props) => {

    const [isLogin, setLogin] = useState(true);
    const routeNameRef = useRef();
    const navigationRef = useRef();

    return <NavigationContainer ref={navigationRef}
        onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
                console.log("currenRoute", currentRouteName);
                console.log("previousRouteName", previousRouteName);
                // props.UpdateCurrentScreen(currentRouteName);
                // await analytics().logScreenView({
                //     screen_name: currentRouteName,
                //     screen_class: currentRouteName,
                // });
            }
            routeNameRef.current = currentRouteName;
        }}
    >
        {isLogin ? <StackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
}

export default Navigation;