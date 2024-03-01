import { Dimensions, SafeAreaView, View } from "react-native"
import { colors, width } from "../theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useEffect } from "react";

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const STICK_WIDTH = 3;
const STICK_MARGIN = 2;
const STICK_FULL_WIDTH = STICK_WIDTH + STICK_MARGIN;
const SLIDER_WIDTH = 250
const DURATION = 4450;
let elapsedTime = 0;

const SoundWaveSlider = () => {

    const panX = useSharedValue(0);
    const playing = useSharedValue(false);
    const sliding = useSharedValue(false);
    const maxPanX = SLIDER_WIDTH;

    const pan = Gesture.Pan().onStart((e) => {
        // console.log('onStart e => ', e)
        // panX.value = e.translationX;
    }).onChange((e) => {
        const nextPan = panX.value + e.changeX;
        console.log('nextPan => ', nextPan)
        if (nextPan > 0 && nextPan < maxPanX) {
            panX.value = nextPan;
        } else {
            nextPan = maxPanX;
        }
        console.log('panX.value => ', panX.value)

    }).onEnd((e) => {
        // console.log('onEnd e => ', e)
        // panX.value = e.translationX;
    });

    const maskedAnimatedStyle = useAnimatedStyle(() => ({
        // transform: [{ translateX: panX.value }],

    }));
    const panAnimatedStyle = useAnimatedStyle(() => ({
        width: panX.value
    }));

    const tap = Gesture.Tap()
        .onBegin(() => {
            console.log('playing.value => ', playing.value)
            playing.value = !playing.value;
        })
    // .onFinalize(() => {
    //     playing.value = false;
    // });

    const addmasked = SLIDER_WIDTH / (DURATION / 1000);
    console.log('addmasked => ', addmasked)
    const updateProgress = () => {
        if (playing.value && panX.value != maxPanX && elapsedTime < DURATION) {
            elapsedTime += 50;
            console.log('elapsedTime => ', elapsedTime)
            panX.value = withTiming(panX.value + addmasked)
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            updateProgress()
        }, 50);
        return () => {
            clearInterval(interval);
            // audioRecorderPlayer.removePlayBackListener();
        }
    }, [])


    const composedGestures = Gesture.Simultaneous(
        tap,
        pan,
    );

    return <SafeAreaView style={{
        flex: 1,
        backgroundColor: colors.white
        // alignItems: 'center',  
    }}>
        <GestureHandlerRootView style={{ flex: 1, alignItems: 'center' }}>

            <GestureDetector gesture={composedGestures}>
                <Animated.View style={[{ height: 60, width: SLIDER_WIDTH }, maskedAnimatedStyle]}>
                    <MaskedView style={{ height: '100%', width: '100%', }} maskElement={
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                            {Object.keys(Array.from({ length: 50 })).map((item, index) =>
                                <View key={index} style={{ width: STICK_WIDTH, height: Math.round(Math.random() * 30) + 10, backgroundColor: colors.white, marginRight: STICK_MARGIN, borderRadius: 10 }} />
                            )}
                        </View>
                    }>
                        <Animated.View style={[{
                            flex: 1,
                            backgroundColor: '#e1e1e1',
                            position: 'absolute', zIndex: 1, left: 0, top: 0, bottom: 0,
                        }, panAnimatedStyle]} />
                        <View style={{ flex: 1, backgroundColor: colors.primary }} />
                    </MaskedView>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    </SafeAreaView>
}

export default SoundWaveSlider;