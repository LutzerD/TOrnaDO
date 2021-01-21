import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Cryptex } from "./cryptex";

export default function App() {
  let items = [
    { title: "hi", body: "bye" },
    { title: "hi", body: "bye" },
  ];

  return (
    <View style={styles.container}>
      <Cryptex items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
