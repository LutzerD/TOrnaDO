import React, { useState } from "react";
import { Text, View, CheckBox, TextInput } from "react-native";

/*
Handles:
  props.item.type = "list" || "note"
*/

let maxNoteLength = 20;
export const ListItem = (props) => {
  if (!props.item) {
    return null;
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
      return (
        <Note
          edit={props.edit}
          callback={props.callback}
          item={props.item}
          text={text}
        ></Note>
      );
    case "checkbox":
    default:
      return (
        <Checkbox
          edit={props.edit}
          callback={props.callback}
          item={props.item}
          text={text}
        ></Checkbox>
      );
      break;
  }
};

export const Checkbox = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [text, setText] = useState(
    props.item ? props.item.text : props.text || ""
  );

  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
          if (props.callback) props.callback();
        }}
      />
      {props.edit ? (
        <TextInput value={text} onChangeText={(text) => setText(text)} />
      ) : (
        <Text> {props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};

export const Note = (props) => {
  const [text, setText] = useState(
    props.item ? props.item.text : props.text || ""
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>Text: {props.item.text}</Text>
      {props.edit ? (
        <TextInput
          defaultValue={props.item.text}
          onChangeText={(text) => {
            props.item.text = text;
            props.item.createChild({ text: text });
            if (props.callback) props.callback();
          }}
        />
      ) : (
        <Text> {props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};
