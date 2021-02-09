import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { makeTodo } from "./todo";
import { CurrentTodoView } from "./current-todo-view";
import { NoteView } from "./noteView";

const loadTestData = (root) => {
  const [childIndex] = root.createChild({
    text: "To do that, do this.",
  });

  const [blue, blueTodo] = root.createChild({
    text: "And then I was thinking, why are birds sometimes blue?",
    type: "note",
  });

  const [seeIndex, seeTodo] = root.createChild({
    text: "See a bird",
    // type:"checkbox",//default
  });

  blueTodo.createChild({
    text: "Google why birds are blue?",
  });

  seeTodo.createChild({
    text: "Get binoculars",
  });

  seeTodo.createChild({
    text: "Go to the park",
  });

  seeTodo.createChild({
    text: "There's a lot of great birds at central park.",
    type: "note",
  });

  return childIndex;
};

export default function App() {
  let root = makeTodo({ text: "This is a task" });
  let childIndex = loadTestData(root);

  const [screen, setScreen] = useState("notes");
  const [taskIndex, setTaskIndex] = useState(childIndex);

  switch (screen) {
    case "notes":
      return (
        <View style={{ flex: 1 }}>
          <NoteView root={root} />
        </View>
      );
    default:
      return (
        <View style={{ flex: 1 }}>
          <CurrentTodoView
            root={rootTodo}
            taskIndex={taskIndex}
          ></CurrentTodoView>
        </View>
      );
  }
}
