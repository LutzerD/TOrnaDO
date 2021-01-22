import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Cryptex } from "./cryptex";
import { todo } from "./todo";

export default function App() {
  let items = [todo("Head1", "body1"), todo("head2", "body2")];

  return (
    <View style={{ flex: 1 }}>
      <Cryptex items={items} />
      <View style={{ flex: 2, backgroundColor: "skyblue" }} />
      <View style={{ flex: 3, backgroundColor: "steelblue" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff000",
  },
});
