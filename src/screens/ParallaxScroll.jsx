import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, fonts, width } from "../theme";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useLayoutEffect, useState } from "react";

const Stack = createStackNavigator();
const IMG_HEIGHT = 300;
const ParallaxScroll = (props) => {

    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    )
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
                }
            ]
        };
    });

    useEffect(() => {
        console.log('scrollOffset.value => ')
    }, [statusbarcolor])

    const [statusbarcolor, setStatusBar] = useState(true)
    function onScroll() {
        // console.log('scrollOffset.value => ', scrollOffset.value)
        if (scrollOffset.value > IMG_HEIGHT) {
            setStatusBar(false)
        } else {
            setStatusBar(true)
        }
    }


    return <>
        <StatusBar barStyle={statusbarcolor ? 'light-content' : 'dark-content'} translucent={true} backgroundColor={'transparent'} />
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef} onScroll={onScroll} scrollEventThrottle={12}>
                <Animated.Image source={require('./../../assets/images/welcome-screen-01.jpg')} style={[styles.image, imageAnimatedStyle]} />
                <View style={{ height: 2000, backgroundColor: '#fff', padding: 20, }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.primary }}>
                        Parallax Scroll
                    </Text>
                </View>
            </Animated.ScrollView>
        </View>
    </>
}

export default ParallaxScroll;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: width,
        height: IMG_HEIGHT
    }
});
