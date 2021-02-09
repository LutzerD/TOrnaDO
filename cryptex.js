import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TodoView } from "./todo-view";

export const Cryptex = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "powderblue" }}>
      {props.items.map((todo) => (
        <TodoView key={todo.id} item={todo}></TodoView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  crpytex: { backgroundColor: "black", flex: 1, flexDirection: "column" },
});
