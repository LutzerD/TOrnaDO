import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { makeTodo } from "./todo";
import { CurrentTodoView } from "./current-todo-view";
import { NoteView } from "./noteView";
// import { Load, Save } from "./todo-storage";
import { Storage } from "./todo-storage";

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

const pageKeys = {
  //  idk if this is a good idea / how things should be structured.
  root: "root",
};

var root, childIndex;
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [taskIndex, setTaskIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // const [root, setRoot] = useState(null);
  // const [childIndex, setChildIndex] = useState(null);

  async function start() {
    root = await Storage.load(pageKeys.root);
    console.log("loaded:", root);

    if (!root) {
      root = makeTodo({ text: "This is a task" });
      console.log("Got todo:", temp, "Root set to", root);
      Storage.save(pageKeys.root, root);
    }

    childIndex = loadTestData(root);

    setLoaded(true);
    setScreen("notes");
  }
  // useEffect(() => {}, [root]);
  if (!loaded) {
    start();
  }

  switch (screen) {
    case "notes":
      return (
        <View style={{ flex: 1 }}>
          <NoteView root={root} />
        </View>
      );
    case "current":
      return (
        <View style={{ flex: 1 }}>
          <CurrentTodoView
            root={rootTodo}
            taskIndex={taskIndex}
          ></CurrentTodoView>
        </View>
      );
    case "loading":
    default:
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{screen == "Loading" ? "Loading" : "404?"}...</Text>
        </View>
      );
  }
}
