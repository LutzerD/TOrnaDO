import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "./list-items.js";
import { Stopwatch } from "./stopwatch.js";

const SummaryHeaderView = (props) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "orange" }}>
      <Text style={{ flex: 5 }} adjustsFontSizeToFit={true}>
        {props.todo.text}
      </Text>
      <Text style={{ flex: 2 }} adjustsFontSizeToFit={true}>
        🕒
        <Stopwatch />
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
        <ExpandedTodoView root={props.root} />
      </View>
    </View>
  );
};

const ExpandedTodoView = (props) => {
  let root = props.root;

  let content = root.children.map((todo) => {
    let isCheckbox = todo.type == "checkbox";
    let containsCheckboxes = todo.containsCheckboxes(true);
    console.log("mapping: ", todo.text);

    if (isCheckbox && !containsCheckboxes) {
      return (
        <ListItem key={todo.id} truncate={props.truncate || true} item={todo} />
      );
    } else if (containsCheckboxes) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          key={todo.id}
        >
          <ListItem
            truncate={props.truncate || true}
            item={todo}
            style={{ borderWidth: 5 }}
          />
          <Text>...CB eventually</Text>
        </View>
      );
    } else {
      console.log("not including: ", todo.text);

      return null;
    }
  });

  return <View style={{ flex: 1, flexDirection: "column" }}>{content}</View>;
};

/*
Params
  root={root}
  checkboxesOnly={true}
  maxDepth={2}
  truncate={}
  skipRoot={true}
  depth={1}
*/
const eeeeeTodoView = (props) => {
  let root = props.root;

  let currentDepth = props.depth || 1;
  let lastTreeNode = props.maxDepth && currentDepth >= props.maxDepth;

  let content = root.children.map((todo) => {
    if (lastTreeNode) {
      return (
        <ListItem
          key={todo.id}
          truncate={props.truncate || true}
          item={todo}
          filter={props.filter}
        />
      );
    } else {
      console.log("Sending root? ", todo.text);
      return (
        <View style={{ flex: 1, flexDirection: "column" }} key={todo.id}>
          <View style={{ flex: 1 }}>
            <ListItem
              truncate={props.truncate || true}
              item={todo}
              filter={props.filter}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 9 }}>
              <Text>Child:</Text>
              <TodoListView
                adjustParent={(childId, value) =>
                  adjustFamilySize(childId, value)
                }
                root={todo}
                maxDepth={props.maxDepth}
                depth={currentDepth + 1}
                filter={props.filter}
              />
            </View>
          </View>
        </View>
      );
    }
  });

  return (
    <View style={{ flex: familySize, flexDirection: "column" }}>{content}</View>
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
