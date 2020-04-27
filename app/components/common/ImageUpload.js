import React, { Component, Fragment } from "react";
import { ActivityIndicator, TouchableOpacity, View, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { CameraIcon } from "@app/assets/icons";

export default class ImageUpload extends Component {
  state = {
    image: null,
    uploading: false,
    user: "abc-123-1",
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, uploading } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          width: 120,
        }}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ) : uploading ? (
          <ActivityIndicator />
        ) : (
          <Fragment>
            <TouchableOpacity onPress={this._takePhoto} style={{ flex: 1 }}>
              <CameraIcon style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    );
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    this.props.onFinishUploading(pickerResult.base64);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      this.props.onFinishUploading();
      if (!pickerResult.cancelled) {
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    let base64data = reader.result;
  };

  blob.close();

  return base64data;
}
