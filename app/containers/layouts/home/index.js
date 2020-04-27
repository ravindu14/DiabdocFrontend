import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { List, withStyles, Avatar, Text, Button } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Speedometer from "react-native-speedometer-chart";

import {
  imageStepCountIcon,
  imageTemperatureIcon,
  imageFoodIcon,
  imageSummaryIcon,
  imageHealingStatusIcon,
  imageProfileIcon,
  imageMoodIcon,
  imageCalculateIcon,
  imageFitnessIcon,
} from "@app/assets";
import LayoutsListItem from "@app/components/home/LayoutsListItemComponent";
import { navigate, navigateAndReset } from "@app/actions/routes";
import {
  imageLogoutIcon,
  imageAvatarMale,
  imageAvatarFemale,
} from "@app/assets";
import { LOGOUT_ACTION, GENDER_TYPES } from "@app/constants/auth";
import { userLogout } from "@app/actions/auth";

const { width } = Dimensions.get("window");
const itemWidth: number = width / 2 - 16;

class HomeScreen extends Component {
  renderItem = (info) => {
    const {
      themedStyle: { item: itemStyles },
    } = this.props;
    if (info.item.action) {
      return (
        <LayoutsListItem
          style={itemStyles}
          data={info.item}
          onPress={info.item.action}
        />
      );
    }
    return (
      <LayoutsListItem
        style={itemStyles}
        data={info.item}
        onPress={() => this.props.navigate(info.item.route)}
      />
    );
  };

  render() {
    const { themedStyle, userLogout, gender, profileImage, risk } = this.props;
    const avatarImage = profileImage
      ? { uri: profileImage }
      : gender === GENDER_TYPES.MALE
      ? imageAvatarMale
      : imageAvatarFemale;
    return (
      <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
        <View style={[themedStyle.detailsContainer]}>
          <Button
            appearance="outline"
            size="small"
            style={{
              borderColor: "#ffffff",
              backgroundColor: "transparent",
              marginBottom: 10,
            }}
            textStyle={{ color: "#ffffff" }}
            onPress={userLogout}
          >
            Logout
          </Button>
          <Speedometer
            value={risk}
            totalValue={100}
            size={250}
            outerColor="#d3d3d3"
            internalColor="#ff0000"
            showText
            text="Risk Level"
            showPercent
            percentStyle={{ color: "red" }}
            textStyle={{ color: "red" }}
            showLabels
            labelStyle={{ color: "#00ff00" }}
            labelFormatter={(number) => `${number}%`}
          />
          <Button
            appearance="outline"
            size="small"
            style={{
              borderColor: "#ffffff",
              backgroundColor: "transparent",
              marginBottom: 10,
              marginTop: 10,
            }}
            textStyle={{ color: "#ffffff" }}
            onPress={() => this.props.navigate("Complication Calculate")}
          >
            Calculate Complications
          </Button>
        </View>
        <List
          style={themedStyle.container}
          numColumns={2}
          renderItem={this.renderItem}
          data={[
            {
              title: "Risk Recalculator",
              icon: imageCalculateIcon,
              route: "Risk Calculate",
            },
            {
              title: "Diet Balancer",
              icon: imageFoodIcon,
              route: "Diet Plan",
            },
            {
              title: "Mood Fixer",
              icon: imageMoodIcon,
              route: "Stress Plan",
            },
            {
              title: "Fitness Checker",
              icon: imageFitnessIcon,
              route: "Exercise Warning",
            },
          ]}
        />
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  userLogout,
  navigateAndReset,
};

const HomeScreenContainer = withStyles(HomeScreen, () => ({
  container: {
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  item: {
    flex: 1,
    height: 130,
    maxWidth: itemWidth,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: "transparent",
  },
  detailsContainer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    height: 280,
  },
  nameLabel: {
    marginTop: 16,
    color: "white",
    fontWeight: 700,
  },
  profileAvatar: {
    width: 124,
    height: 124,
  },
}));

function mapStateToProps(state) {
  return {
    gender: state.auth.user.gender,
    profileImage: state.auth.user.image,
    risk: state.auth.user.risk,
  };
}

export default connect(mapStateToProps, Actions)(HomeScreenContainer);
