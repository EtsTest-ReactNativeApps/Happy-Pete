import React, { Component } from "react";

import { StyleSheet, View, Text, Image } from "react-native";

export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../images/HappyStPeteLogolng-768x116.png")}
          style={{
            width: 330,
            height: 80,
            marginLeft: "30%"//,
            //backgroundColor:"White"
          }}
        />
      </View>
    );
  }
}
