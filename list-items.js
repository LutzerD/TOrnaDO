import React, { useState } from "react";
import { Text, View, CheckBox } from "react-native";

/*
Handles:
  props.item.type = "list" || "note"
*/

let maxNoteLength = 20;
export const ListItem = (props) => {
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
