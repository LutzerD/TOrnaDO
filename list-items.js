import React, { useState } from "react";
import { Text, View, CheckBox } from "react-native";

/*
Handles:
  props.item.type = "list" || "note"
*/

let maxNoteLength = 20;
const ListItem = (props) => {
  if (!props.item) {
    return null;
  } else if (props.filter) {
    let item = props.item;
    for (const [key, value] of Object.entries(props.filter)) {
      if (item[key] != value) {
        console.log("filtering ", item.text);
        return null;
      }
    }
  }

  let text = "";
  if (props.truncate) {
    text =
      props.item.text && props.item.text.length > maxNoteLength
        ? props.item.text.substring(0, maxNoteLength) + "..."
        : props.item.text || "";
  } else {
    text = props.item.text || "";
  }

  switch (props.item.type) {
    case "note":
      return <Note text={text}></Note>;
    case "checkbox":
    default:
      return <Checkbox item={props.item} text={text}></Checkbox>;
      break;
  }
};

export const Checkbox = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
      <Text> {props.text}</Text>
    </View>
  );
};

export const Note = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>- {props.text}</Text>
    </View>
  );
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
export const TodoListView = (props) => {
  let root = props.root;

  var family = {};
  const [familySize, setFamilySize] = useState(1 + root.children.length);

  function adjustFamilySize(childId, value) {
    family[childId] = value;

    if (Object.keys(family).length >= root.children.length) {
      let tempFamilySize = 1;
      for (const childId in family) {
        tempFamilySize += family[childId] || 0;
      }

      // setFamilySize(tempFamilySize);

      if (props.adjustParent) {
        props.adjustParent(root.id, familySize);
      }
    }
  }

  if (props.adjustParent) {
    props.adjustParent(root.id, familySize);
  }

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
