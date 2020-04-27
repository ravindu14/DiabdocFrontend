import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { ChartIcon, FoodIntakeIcon } from "@app/assets/icons";
import { initiateStress, getScannedMood } from "@app/actions/stress";
import { navigate, navigateAndReset } from "@app/actions/routes";

import ImageUpload from "@app/components/common/ImageUpload";
import Alert from "@app/components/Alert";

class MoodFixerScreen extends Component {
  componentDidMount() {
    this.props.initiateStress();
  }

  onTakePhoto = (baseImage) => {
    const { getDetectedFood } = this.props;

    this.props.getScannedMood({ base_string: baseImage });
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
      <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={themedStyle.photoContainer}>
            <ImageUpload
              onFinishUploading={(baseImage) => this.onTakePhoto(baseImage)}
            />
          </View>
          {predictedResult && (
            <View>
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
                    You are currently in a
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
                      lineHeight: 35,
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
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    mood
                  </Text>
                </View>
              </View>
              <View style={themedStyle.buttonContainer}>
                <Button
                  style={themedStyle.ActionButton}
                  size="giant"
                  disabled={predictedResult === null}
                  onPress={() => this.props.navigate("Activity Question")}
                >
                  GET ACTIVITIES
                </Button>
              </View>
            </View>
          )}
          {notification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  initiateStress,
  getScannedMood,
  navigate,
  navigateAndReset,
};

function mapStateToProps(state) {
  return {
    status: state.stress.status,
    notification: state.stress.notification,
    predictedResult: state.stress.predictedResult,
  };
}

const MoodFixerScreenContainer = connect(
  mapStateToProps,
  Actions
)(MoodFixerScreen);

export default withStyles(MoodFixerScreenContainer, (theme) => ({
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
    marginTop: 100,
    backgroundColor: "#57cf57",
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  ActionButton: {
    marginTop: 16,
  },
}));
