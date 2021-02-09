import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const TodoView = (props) => {
  return (
    <View style={styles.title}>
      <Text adjustsFontSizeToFit={true} style={styles.titleText}>
        {props.item.title}
      </Text>
      {/* <View style={styles.title}>
        {props.item.title}
        */}
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
  },
  title: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    textAlign: "center", // <-- the magic
    flex: 1,
    backgroundColor: "green",
    borderBottomColor: "black",
    flexDirection: "row",
  },
});
