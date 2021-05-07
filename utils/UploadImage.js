import React from 'react';
import FirebaseConfig from "../components/config";

import 'firebase/storage';
import {Alert,} from "react-native";

export const downLoadProfileImage = async (email) => {
    let imageURL = "";
    const ref = FirebaseConfig.storage().ref("blogImage/" + email);
    let image = await ref.getDownloadURL()
    imageURL = image;
    return imageURL;
}

export const uploadImageAsync = async (tableName, email, uri) => {
    let imageURl = downLoadProfileImage(email);
    if(imageURl){
        imageURl=imageURl+1
    }
    let response = await fetch(uri);
    const blob = await response.blob();
    let ref = FirebaseConfig.storage().ref(tableName).child(imageURl);
    return ref.put(blob);
}

export const uploadGalleryImage = async (tableName,path) => {

    let uploadedImagePath = "";
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            skipBackup: true,
            quality: 1,
        });

        if (!result.cancelled) {
            await uploadImageAsync(tableName,path, result.uri);
            uploadedImagePath = await downLoadProfileImage(path);
        }
    }
    catch (error) {
        console.log(error)
    }
    console.log(uploadedImagePath)
    return uploadedImagePath;

}
