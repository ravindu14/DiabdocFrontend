import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert, Dimensions } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getAnalytics } from "@app/actions/analytics";
import { BarChart } from "react-native-chart-kit";

const dimensions = Dimensions.get("window").width;

class AnalyticScreen extends Component {
  componentDidMount() {
    this.props.getAnalytics();
  }

  render() {
    const { themedStyle, status, notification, analytics } = this.props;

    const dataSet =
      analytics.length > 0
        ? [
            ...analytics.map(({ calories }) => {
              return parseFloat(calories);
            }),
          ]
        : [0, 0, 0, 0, 0, 0, 0];

    const data = {
      labels: [
        `Mon-${dataSet[0]}cal`,
        `Tue-${dataSet[1]}cal`,
        `Wed-${dataSet[2]}cal`,
        `Thu-${dataSet[3]}cal`,
        `Fri-${dataSet[4]}cal`,
        `Sat-${dataSet[5]}cal`,
        `Sun-${dataSet[6]}cal`,
      ],
      datasets: [
        {
          data: dataSet,
        },
      ],
    };

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
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                color: "#7be39b",
                fontSize: 18,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Weekly Burnt Calorie Analysis
            </Text>
          </View>
          <View style={{ overflow: "scroll" }}>
            <BarChart
              style={themedStyle.graphStyle}
              data={data}
              width={dimensions}
              height={500}
              showBarTops
              fromZero
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                backgroundGradientToOpacity: 0.1,
                barPercentage: 0.7,
              }}
              verticalLabelRotation={80}
            />
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
  getAnalytics,
};

function mapStateToProps(state) {
  return {
    status: state.analytics.status,
    notification: state.analytics.notification,
    analytics: state.analytics.analytics,
  };
}

const AnalyticScreenContainer = connect(
  mapStateToProps,
  Actions
)(AnalyticScreen);

export default withStyles(AnalyticScreenContainer, (theme) => ({
  container: {
    marginVertical: 10,
    flexDirection: "column",
  },
  graphStyle: {
    marginVertical: 100,
    borderRadius: 10,
  },
}));
