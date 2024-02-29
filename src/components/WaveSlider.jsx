import { View } from "react-native"



const WaveSlider = () => {
    return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
        {Object.keys(Array.from({ length: 40 })).map((item, index) => <View key={index} style={{ width: 3, height: Math.round(Math.random() * 30) + 10, backgroundColor: colors.primary, marginHorizontal: 1, borderRadius: 10 }} />)}
    </View>
}