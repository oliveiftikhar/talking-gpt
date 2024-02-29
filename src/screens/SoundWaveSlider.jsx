import { SafeAreaView, View } from "react-native"
import { colors } from "../theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue } from 'react-native-reanimated';

const SoundWaveSlider = () => {

    const paxX = useSharedValue(0);
    const pan = Gesture.Pan().onStart((e) => {
        console.log(e)
        paxX.value = e.translationX;

    }).onChange((e) => {
        console.log(e)
    }).onEnd((e) => {
        console.log(e)
    });

    return <SafeAreaView style={{
        flex: 1,
        // backgroundColor: colors.black
        // alignItems: 'center',  
    }}>
        <GestureDetector gesture={pan}>
            <Animated.View style={{ flex: 1 }}>
                <MaskedView style={{ height: '100%', width: '100%', marginLeft: '50%', }} maskElement={
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        {Object.keys(Array.from({ length: 140 })).map((item, index) =>
                            <View key={index} style={{ width: 3, height: Math.round(Math.random() * 30) + 10, backgroundColor: colors.white, marginHorizontal: 1, borderRadius: 10 }} />
                        )}
                    </View>
                }>
                    <View style={{
                        flex: 1, backgroundColor: colors.grey, position: 'absolute', zIndex: 1, left: 0, top: 0, bottom: 0,
                        // width: '100%' 
                    }} />
                    <View style={{ flex: 1, backgroundColor: colors.primary }} />
                </MaskedView>
            </Animated.View>
        </GestureDetector>
    </SafeAreaView>
}

export default SoundWaveSlider;