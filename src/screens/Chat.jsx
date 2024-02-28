/**
 * Sample React Native ChatScreen
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Pressable, Platform, Image, } from 'react-native';
import { Home, Microphone, MicrophoneSlash, PlayCircle, StopCircle } from 'iconsax-react-native';
import { colors, fonts, height, width } from './../theme';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

function ChatScreen() {


    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }, [])

    const [isRecording, setIsRecording] = useState(false);
    const [uri, setURI] = useState(null);

    checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    'granted' &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    'granted' &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    'granted'
                ) {
                    console.log('Permissions granted');
                    return true;
                } else {
                    console.log('All required permissions not granted');
                    return true;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    }

    _onStartStopRecording = async () => {
        const permi = await checkPermission();
        console.log('permi => ', permi)
        if (permi) {
            if (!isRecording) {
                console.log('!isRecording => ', isRecording)
                setIsRecording(true)
                const uri = await audioRecorderPlayer.startRecorder();
                audioRecorderPlayer.addRecordBackListener((e) => {
                    // setState({
                    //   recordSecs: e.currentPosition,
                    //   recordTime: audioRecorderPlayer.mmssss(
                    //     Math.floor(e.currentPosition),
                    //   ),
                    // });
                    return;
                });
                setURI(uri);
                console.log('_onStartRecording => ', uri);
            } else {
                console.log('isRecording => ', isRecording)
                setIsRecording(false);
                const result = await audioRecorderPlayer.stopRecorder();
                audioRecorderPlayer.removeRecordBackListener();
                // setState({
                //   recordSecs: 0,
                // });
                console.log('_onStopRecording => ', result);
            }
        }
    }

    // _onStartRecording = async () => {
    //     if (checkPermission() && !isRecording) {
    //         setIsRecording(true)
    //         const uri = await audioRecorderPlayer.startRecorder();
    //         audioRecorderPlayer.addRecordBackListener((e) => {
    //             // setState({
    //             //   recordSecs: e.currentPosition,
    //             //   recordTime: audioRecorderPlayer.mmssss(
    //             //     Math.floor(e.currentPosition),
    //             //   ),
    //             // });
    //             return;
    //         });
    //         setURI(uri);
    //         console.log('_onStartRecording => ', uri);
    //     }
    // }
    // _onStopRecording = async () => {
    //     if (isRecording) {
    //         const result = await audioRecorderPlayer.stopRecorder();
    //         audioRecorderPlayer.removeRecordBackListener();
    //         setIsRecording(false);
    //         // setState({
    //         //   recordSecs: 0,
    //         // });
    //         console.log('_onStopRecording => ', result);
    //     }
    // }

    const data = [
        { role: 'user', content: 'Hi there! I need some advice on choosing a new laptop. Can you help me out?' },
        { role: 'assistant', content: 'Of course! I\'d be happy to help you find the right laptop.What are your specific requirements and budget?' },
        { role: 'user', content: 'I\'m a graphic designer, so I need something with a powerful processor and a good graphics card.My budget is around $1500.', },
        { role: 'assistant', content: 'Great! For graphic design, you\'ll want a laptop with a dedicated graphics card and a high- resolution display.Are there any specific brands or preferences you have in mind ?' },
        { role: 'user', content: 'I\'ve heard good things about both Dell and HP, but I\'m open to suggestions.What do you recommend?' },
        { role: 'assistant', content: 'Both Dell and HP offer excellent laptops for graphic design.I recommend checking out the Dell XPS 15 or the HP Spectre x360.They have powerful processors, dedicated graphics, and high- quality displays.Do you have a preference for screen size ?' },
        { role: 'user', content: 'I prefer a larger screen, around 15 inches.', },
        { role: 'assistant', content: 'In that case, the Dell XPS 15 with its 15.6 - inch InfinityEdge display or the HP Spectre x360 with a 15.6 - inch 4K OLED display would be great options.They provide sharp visuals and vibrant colors.Are there any other features or specifications you\'re concerned about?' },
        { role: 'user', content: 'Battery life is important to me since I\'ll be working on the go.What can you tell me about the battery life of these laptops? ' },
        { role: 'assistant', content: 'Both the Dell XPS 15 and HP Spectre x360 offer decent battery life.The XPS 15 typically lasts around 8 - 10 hours, while the Spectre x360 can provide around 7 - 9 hours of usage.Keep in mind that actual battery life may vary based on usage.' },
        { role: 'user', content: 'That sounds good. I\'ll look into these options.Thanks for your help!' },
        { role: 'assistant', content: 'You\'re welcome! If you have any more questions or need further assistance while making your decision, feel free to ask.Happy laptop hunting!' },
    ]


    onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer();
        console.log('msg => ', msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            // this.setState({
            //     currentPositionSec: e.currentPosition,
            //     currentDurationSec: e.duration,
            //     playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            //     duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            // });
            return;
        });
    };

    onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setURI(false);
    };

    return (
        <SafeAreaView style={{
            backgroundColor: colors.white,
            flex: 1
        }}>
            {/* {data.length == 0 && <View style={{
                paddingHorizontal: 15, backgroundColor: '#ffffff', flex: 1
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 1.2, paddingHorizontal: 30 }}>
                    <Text style={{ fontSize: 30, fontFamily: fonts.primarySemiBold, color: colors.black, marginBottom: -6, textAlign: 'center' }}>Talking GPT</Text>
                    <Text style={{ fontSize: 13, fontFamily: fonts.primary, color: colors.grey, textAlign: 'center' }}>Press and hold the mic button to record your voice. Rlease the button to send the recording and you'll hear a response</Text>
                    <View style={{ height: 30 }} />
                    <Text style={{ fontFamily: fonts.primary, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 5, paddingBottom: 3, color: colors.white }}>{isRecording ? 'Recording' : 'Not Recording'}</Text>
                    {uri && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => { onStartPlay(); }}><PlayCircle color='#000' size={35} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { onStopPlay(); }}><StopCircle color='#000' size={35} /></TouchableOpacity>
                    </View>}
                </View>
            </View>} */}

            <View style={{
                flex: 1
            }}>
                <FlatList
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        flexGrow: 1, 
                    }}
                    style={{}}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    data={data}
                    renderItem={({ item, index }) => <View style={[{ width: width - 150, flexDirection: 'row', marginBottom: 15, }, item.role == 'user' && { alignSelf: 'flex-end', flexDirection: 'row-reverse' }]}>
                        <Image style={[{ width: 40, height: 40, borderRadius: 30, }, item.role == 'user' ? { marginLeft: 10 } : { marginRight: 10 }]} source={item.role == 'user' ? require('./../../assets/images/49.png') : require('./../../assets/images/29.png')} />
                        <View style={[{ paddingHorizontal: 15, paddingVertical: 12, backgroundColor: item.role != 'user' ? '#333' : '#eee', borderRadius: 10, }, item.role == 'user' ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 }]}>
                            <Text style={{ fontFamily: fonts.primary, fontSize: 13, color: item.role != 'user' ? colors.white : colors.black }}>{item.content}</Text>
                        </View>
                    </View>}
                />
            </View>
            <View style={{ alignItems: 'center', backgroundColor: colors.white, paddingVertical: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { _onStartStopRecording(); }}
                    // onPressIn={() => {
                    //     if (!isRecording)
                    //         _onStartRecording();
                    // }}
                    // onPressOut={() => {
                    //     if (isRecording)
                    //         _onStopRecording();
                    // }}
                    style={{ backgroundColor: colors.primary, width: 60, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}
                >
                    {isRecording ? <MicrophoneSlash color={colors.white} size={26} /> : <Microphone color={colors.white} size={26} />}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default ChatScreen;
