import React from "react";
import { View, StyleSheet } from "react-native";
import { Todo } from "./item";

export const Cryptex = (props) => {
  return (
    <View style={styles.cryptex}>
      <Text>Hi</Text>
      {props.items.map((todo) => (
        <Todo item={todo}></Todo>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  crpytex: { backgroundColor: "black" },
});
