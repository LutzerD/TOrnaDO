import React, { useState } from "react";
import { View } from "react-native";
import { todo } from "./todo";

import { CurrentTodoView } from "./current-todo-view";

export default function App() {
  let root = todo({ text: "This is a task" });
  let childIndex = root.createChild({ text: "To do that, do this." });

  root.createChild({
    text: "And then I was thinking, why are birds sometimes blue?",
    type: "note",
  });

  root.createChild({
    text: "See a bird",
    type: "checkbox",
  });

  const [screen, setScreen] = useState(0);
  const [rootTodo, setRootTodo] = useState(root);
  const [taskIndex, setTaskIndex] = useState(childIndex);

  switch (screen) {
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
