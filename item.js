import React from "react";
import { View, StyleSheet, Text } from "react-native";

class task {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  get content() {
    return (
      <View class="container">
        <View>
          <Text class="titleText">{props.item.title}</Text>
        </View>
        <View>
          <Text class="bodyText">{props.item.body}</Text>
        </View>
      </View>
    );
  }
}

export const Todo = (props) => {
  return (
    <View class="container">
      <View>
        <Text style={styles.titleText}>{props.item.title}</Text>
      </View>
      <View>
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
  bodyText: {
    fontSize: 10,
  },
});
