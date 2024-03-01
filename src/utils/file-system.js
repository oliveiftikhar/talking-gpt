
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from "react-native-blob-util";

export const downloadFileFromURL = async (url) => {
    const filename = Math.round(Math.random() * 10000000)
    const path = `${RNFS.DocumentDirectoryPath}/${filename}.mp3`;
    console.log('downloadFileFromURL url => ', url)
    try {
        const response = await ReactNativeBlobUtil.config({
            fileCache: true,
            path: path,
        }).fetch('GET', url, {});

        console.log('Download successful. Path:', path);
        return path;
    } catch (error) {
        console.error('Download failed. Error:', error);
        return null;
    }
}

