import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { makeTodo, onScreenChange as todoOnScreenChange } from "./todo";
import { CurrentTodoView } from "./current-todo-view";
import { NoteView } from "./noteView";
// import { Load, Save } from "./todo-storage";
import { Storage } from "./todo-storage";

const loadTestData = (root) => {
  root.createChild({
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
};

var root,
  defaultScreen = "notes";

// Debug stuff
var resetDB = false;
async function debugStart() {
  if (resetDB) {
    await Storage.clear();
    console.log("cleared?");
    resetDB = false;
  }
}
//end of debug stuff

export default function App() {
  debugStart();
  const [screen, setScreen] = useState("loading");
  const [loadingScreen, setLoadingScreen] = useState(defaultScreen);
  const [taskIndex, setTaskIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  async function start() {
    console.clear();

    root = await Storage.loadTodo("root", true);
    console.log("loaded:", root);

    if (!root) {
      root = makeTodo({ text: "This is a task" });
      loadTestData(root);
      const result = await Storage.saveTodo("root", root);
      if (!result) {
        console.error("Couldn't save :C");
      } else {
        console.log("Created children and saved?.", root);
      }
    }

    setLoaded(true);
    setScreen(defaultScreen);
  }

  useEffect(() => {
    async function initialize() {
      console.log(`switched screens to ${screen}:`);
      await todoOnScreenChange(screen);
      setInitialized(true);
    }
    initialize();
  }, [loadingScreen]);

  useEffect(() => {
    if (initialized) {
      start();
    }
  }, [initialized]);

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
