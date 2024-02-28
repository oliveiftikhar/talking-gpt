// import getStoredState from 'redux-persist/es/getStoredState';
import { store } from '../redux/store';
import colors from './colors';
import fonts from './fonts';
// import globalstyle from './style';
//import images from './images';
//import styles from './style';

import { Appearance, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const colorScheme = Appearance.getColorScheme();
console.log('colorScheme => ', colorScheme)

const isDarkMode = colorScheme == 'dark';
const fontcolor = isDarkMode ? colors.white : colors.black;
const invertcolor = colorScheme != 'dark' ? colors.white : colors.black;
const isIPad = width > 700 ? true : false;
const IOS = Platform.OS == 'ios' ? true : false;
// const backgroungImage = isDarkMode ? require('./../../assets/images/home-bg.jpg') : require('./../../assets/images/auth-bg.jpg')
// const textAlign = isRTL ? 'right' : 'left';
export const fontSize = 14;
export {
    colors, fonts, width, height, colorScheme, fontcolor, invertcolor, isIPad, IOS, 
    // backgroungImage,
    // urdufont, 
    // textAlign,
    isDarkMode
};