import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "./list-items.js";

const SummaryView = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text adjustsFontSizeToFit={true} style={{}}>
        {props.todo.text}
      </Text>
      {/* <ListItem item={task}></ListItem> */
      /* Commenting so I can test the list viewer / todo structure */}
      {props.todo.children.map((todo) => {
        return <ListItem truncate={true} key={todo.id} item={todo} />;
      })}
    </View>
  );
};

export const CurrentTodoView = (props) => {
  let task = props.root.children[props.taskIndex];

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
      <View style={{ flex: 4, margin: 10 }}>
        <SummaryView todo={props.root} task={task} />
      </View>
      <View style={{ flex: 1, margin: 10, backgroundColor: "skyblue" }} />
      {/* Above is the placeholder for button for "go to notes" */}
    </View>
  );
};
