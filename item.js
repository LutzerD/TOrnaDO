import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const Todo = (props) => {
  return (
    <View class="container">
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.item.title}</Text>
      </View>
      <View style={styles.body}>
        <Text class={styles.bodyText}>{props.item.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "left",
  },
  titleText: {
    fontSize: 20,
  },
  title: {
    backgroundColor: "purple",
  },
  bodyText: {
    fontSize: 20,
  },
  body: {
    backgroundColor: "blue",
  },
});
