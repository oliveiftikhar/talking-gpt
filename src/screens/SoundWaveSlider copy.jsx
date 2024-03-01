import { Dimensions, SafeAreaView, View } from "react-native"
import { colors, width } from "../theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useEffect } from "react";

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { downloadFileFromURL } from "../utils/file-system";

const audioRecorderPlayer = new AudioRecorderPlayer();

const SoundWaveSlider = () => {

    const panX = useSharedValue(0);
    const playing = useSharedValue(false);
    const sliding = useSharedValue(false);
    const maxPanX = -width;

    const pan = Gesture.Pan().onStart((e) => {
        console.log('onStart e => ', e)
        // panX.value = e.translationX;
    }).onChange((e) => {
        // console.log('onChange e => ', e)
        console.log('panX.value => ', panX.value)
        
        const nextPan = panX.value + e.changeX;
        if (nextPan > 0) {
            nextPan = 0;
        } else if (nextPan < maxPanX) {
            panX.value = maxPanX;
        } else {
            playing.value = true;
            panX.value = nextPan;
        }

    }).onEnd((e) => {
        console.log('onEnd e => ', e)
        // panX.value = e.translationX;
    });

    const maskedAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: panX.value }],
    }));
    const panAnimatedStyle = useAnimatedStyle(() => ({
        width: -panX.value
    }));

    const tap = Gesture.Tap()
        .onBegin(() => {
            console.log('playing.value => ', playing.value)
            playing.value = !playing.value;
            // if (playing.value) {
            //     startAudio()
            // } else {
            //     stopAudio();
            // }
        })
    // .onFinalize(() => {
    //     playing.value = false;
    // });

    const STICK_WIDTH = 3;
    const STICK_MARGIN = 2;
    const STICK_FULL_WIDTH = STICK_WIDTH + STICK_MARGIN;
    const updateProgress = () => {
        if (playing.value && panX.value > maxPanX) {
            panX.value = withTiming(panX.value - STICK_FULL_WIDTH)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => updateProgress(), 150);

        return () => {
            clearInterval(interval);
            audioRecorderPlayer.removePlayBackListener();
        }
    }, [])


    startAudio = async () => {
        const url = 'https://music-app-nodejs-mongodb.vercel.app/public/uploads/yaarian-1693180878837-389559060.mp3';
        console.log('url => ', url)
        const uri = await downloadFileFromURL(url);
        console.log('uri => ', uri)
        await audioRecorderPlayer.startPlayer(uri);
        audioRecorderPlayer.addPlayBackListener((e) => {
            console.log('currentPositionSec => ', e.currentPosition);
            console.log('currentDurationSec => ', e.duration);
            console.log('playTime => ', audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            console.log('e.duration => ', audioRecorderPlayer.mmssss(Math.floor(e.duration)));
            return;
        });
    }

    stopAudio = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setURI(false);
    };

    return <SafeAreaView style={{
        flex: 1,
        // backgroundColor: colors.black
        // alignItems: 'center',  
    }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[{ flex: 1 },]}>
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[{ flex: 1 }, maskedAnimatedStyle]}>
                            <MaskedView style={{ height: '100%', width: '100%', marginLeft: '50%', }} maskElement={
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    {Object.keys(Array.from({ length: 140 })).map((item, index) =>
                                        <View key={index} style={{ width: STICK_WIDTH, height: Math.round(Math.random() * 40) + 10, backgroundColor: colors.white, marginRight: STICK_MARGIN, borderRadius: 10 }} />
                                    )}
                                </View>
                            }>
                                <Animated.View style={[{
                                    flex: 1, backgroundColor: colors.grey, position: 'absolute', zIndex: 1, left: 0, top: 0, bottom: 0,
                                }, panAnimatedStyle]} />
                                <View style={{ flex: 1, backgroundColor: colors.primary }} />
                            </MaskedView>
                        </Animated.View>
                    </GestureDetector>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    </SafeAreaView>
}

export default SoundWaveSlider;