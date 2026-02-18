import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ImageProps = {
  imageSource?: string;
  onImageSelected: (uri: string) => void;
  label?: string;
  containerStyle?: object;
};

const ImagePickerField = ({
  imageSource,
  onImageSelected,
  label = "Upload photo",
  containerStyle,
}: ImageProps) => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    try {
      // check permissions
      // if (Platform.OS !== "web") {
      //   console.log(status);
      //   if (status?.status !== "granted") {
      //     const permissionResponse = await requestPermission();
      //     if (permissionResponse.status !== "granted") {
      //       Alert.alert(
      //         "Permission required",
      //         "Permission to access media library is required to upload images.",
      //         [
      //           {
      //             text: "Cancel",
      //           },
      //           {
      //             text: "Open Settings",
      //             onPress: () => {
      //               Platform.OS === "ios"
      //                 ? Linking.openURL("app-settings:")
      //                 : Linking.openSettings();
      //             },
      //           },
      //         ],
      //       );
      //       return;
      //     }
      //   }
      // }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={pickImage}
    >
      {imageSource ? (
        <ExpoImage source={{ uri: imageSource }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image" size={50} color={"#b1b1b1"}></Ionicons>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ImagePickerField;

const styles = StyleSheet.create({
  container: {
    height: "40%",
    backgroundColor: "#dadada",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },

  placeholder: {
    alignItems: "center",
  },

  label: {
    marginTop: 8,
    color: "#8f8f8f",
    fontSize: 18,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
