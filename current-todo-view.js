import React from "react";
import { View, Text } from "react-native";
import { TodoListView } from "./list-items.js";

const SummaryHeaderView = (props) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "orange" }}>
      <Text style={{ flex: 5 }} adjustsFontSizeToFit={true}>
        {props.todo.text}
      </Text>
      <Text style={{ flex: 2 }} adjustsFontSizeToFit={true}>
        🕒 1:7:00
      </Text>
    </View>
  );
};

const SummaryView = (props) => {
  console.log("Creating summary view");
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 2 }}>
        <SummaryHeaderView todo={props.root} />
      </View>
      <View style={{ flex: 3, flexDirection: "column" }}>
        <TodoListView
          root={props.root}
          filter={{ type: "checkbox" }}
          maxDepth={2}
        />
      </View>
    </View>
  );
};

export const CurrentTodoView = (props) => {
  // let task = props.root.children[props.taskIndex] || null; //What was this for?

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#fffdd0",
        padding: 20,
      }}
    >
      <View style={{ flex: 10, margin: 10, backgroundColor: "white" }}>
        {/* <SummaryView todo={props.root} task={task} /> */}
        <SummaryView root={props.root} />
      </View>
      <View style={{ flex: 3, margin: 10, backgroundColor: "royalblue" }} />
      {/* Above is the placeholder for button for "next up" items */}

      <View style={{ flex: 1, margin: 10, backgroundColor: "skyblue" }} />
      {/* Above is the placeholder for button for "go to notes" */}
    </View>
  );
};
