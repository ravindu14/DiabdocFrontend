import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button, Card } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";

import Alert from "@app/components/Alert";

class ActivityDisplayScreen extends Component {
  state = {
    plans: [
      {
        plan: 0,
        content: [
          "Make time for hobbies, interests, and relaxation.",
          "Seek out social support. Spend enough time with those you enjoy.",
          "Exercise regularly. Your body can fight stress better when it is fit.",
          "Eat healthy, well-balanced meals.",
          "Don't rely on alcohol, drugs, or compulsive behaviors to reduce stress.",
          "Learn to manage your time more effectively.",
          "Set limits appropriately and learn to say no to requests that would create excessive stress in your life.",
        ],
      },
      {
        plan: 1,
        content: [
          "Keep a positive attitude.",
          "Accept that there are events that you cannot control.",
          "Be assertive instead of aggressive. Assert your feelings, opinions, or beliefs instead of becoming angry, defensive, or passive.",
          "Learn and practice relaxation techniques; try meditation, yoga, or tai-chi for stress management.",
          "Get enough rest and sleep. Your body needs time to recover from stressful events.",
        ],
      },
      {
        plan: 2,
        content: [
          "Seek treatment with a psychologist or other mental health professional trained in stress management or biofeedback techniques to learn healthy ways of dealing with the stress in your life.",
        ],
      },
    ],
  };

  render() {
    const { plans } = this.state;
    const { themedStyle, status, notification, activityPlan } = this.props;

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
          <View>
            <View style={themedStyle.predictionContainer}>
              {plans.map(({ plan, content }) => {
                if (plan === activityPlan) {
                  return content.map((item, index) => {
                    return (
                      <Card key={index} style={themedStyle.card}>
                        <Text
                          style={{
                            color: "#ffffff",
                            fontSize: 14,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                        >
                          {item}
                        </Text>
                      </Card>
                    );
                  });
                }
                return null;
              })}
            </View>
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => this.props.navigateAndReset("Dashboard")}
              >
                GOT IT
              </Button>
            </View>
          </View>
          {notification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
};

function mapStateToProps(state) {
  return {
    status: state.stress.status,
    notification: state.stress.notification,
    activityPlan: state.stress.activityPlan,
  };
}

const ActivityDisplayScreenContainer = connect(
  mapStateToProps,
  Actions
)(ActivityDisplayScreen);

export default withStyles(ActivityDisplayScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
    flexDirection: "column",
  },
  predictionContainer: {
    marginTop: 10,
    backgroundColor: "#57cf57",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  ActionButton: {
    marginTop: 16,
  },
  card: {
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: "#003b18",
  },
}));
