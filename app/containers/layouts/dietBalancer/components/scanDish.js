import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { initiateFood, getScannedFood } from "@app/actions/food";
import { getCalories } from "@app/helpers/helpers/objects";

import Alert from "@app/components/Alert";
import ImageUpload from "@app/components/common/ImageUpload";

class ScanFoodDishScreen extends Component {
  componentDidMount() {
    this.props.initiateFood();
  }

  onTakePhoto = (baseImage) => {
    const { getDetectedFood } = this.props;

    this.props.getScannedFood({ base_string: baseImage });
  };

  render() {
    const { themedStyle, status, notification, predictedResult } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.photoContainer}>
          <ImageUpload
            onFinishUploading={(baseImage) => this.onTakePhoto(baseImage)}
          />
        </View>
        {predictedResult && (
          <View style={themedStyle.predictionContainer}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: "bold",
                }}
              >
                Scanned food item
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#a15513",
                  fontSize: 30,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: "900",
                }}
              >
                {predictedResult}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 14,
                  marginTop: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: "bold",
                }}
              >
                Calorie intake amount
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#a15513",
                  fontSize: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: "900",
                }}
              >
                {getCalories(predictedResult)}
              </Text>
            </View>
          </View>
        )}
        {notification !== null && (
          <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
        )}
      </View>
    );
  }
}

const Actions = {
  initiateFood,
  getScannedFood,
};

function mapStateToProps(state) {
  return {
    status: state.food.status,
    notification: state.food.notification,
    predictedResult: state.food.predictedResult,
  };
}

const ScanFoodDishScreenContainer = connect(
  mapStateToProps,
  Actions
)(ScanFoodDishScreen);

export default withStyles(ScanFoodDishScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 50,
    flexDirection: "column",
  },
  photoContainer: {
    marginTop: 30,
    marginLeft: "25%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 40,
    marginTop: 20,
  },
  listItem: {
    textAlign: "center",
    color: "#66b2ff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
  remainHeader: {
    textAlign: "center",
    color: "#66b2ff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  remain: {
    textAlign: "center",
    color: "#009900",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },
  predictionContainer: {
    marginTop: 40,
    backgroundColor: "#57cf57",
    borderRadius: 10,
    padding: 10,
  },
}));
