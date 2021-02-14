import React, { useState, useEffect } from "react";
import { Text, View, CheckBox, TextInput } from "react-native";
import { ExpandingTextInput } from "./lib/TextComponents.js";

/*
Handles:
  props.item.type = "list" || "note"
*/
const tabSize = 15;

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
        />
      );
    case "checkbox":
    default:
      return (
        <Checkbox
          edit={props.edit}
          callback={props.callback}
          item={props.item}
          text={text}
        />
      );
      break;
  }
};

var autoFocus;
var autoFocusNext = (id) => {
  if (autoFocus == id) {
    autoFocus = undefined;
    return true;
  } else {
    return false;
  }
};

export const Checkbox = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [text, setText] = useState(
    props.item ? props.item.text : props.text || ""
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <CheckBox
        disabled={false}
        style={{ width: tabSize }}
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
          if (props.callback) props.callback();
        }}
      />
      <Text>&nbsp;</Text>
      {props.edit ? (
        <TodoText item={props.item} callback={props.callback} />
      ) : (
        <Text>{props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};

const TodoText = (props) => {
  return (
    <ExpandingTextInput
      autoFocus={autoFocusNext(props.item.id)}
      text={props.item.text}
      style={{
        outline: "none",
        borderTopColor: "black",
        borderTopWidth: 1,
      }}
      onSubmitEditing={(text) => {
        console.log("submitted?");
        props.item.text = text;
        autoFocus = true;
        const [newTodoIndex, newTodo] = props.item.parent.createChild(
          {
            text: "",
            type: props.item.type,
          },
          false,
          { after: props.item.id }
        );
        autoFocus = newTodo.id;
        if (props.callback) props.callback();
      }}
    />
  );
};

export const Note = (props) => {
  const [text, setText] = useState(
    props.item ? props.item.text : props.text || ""
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <Text style={{ width: tabSize }}>-</Text>
      <Text>&nbsp;</Text>
      {props.edit ? (
        <TodoText item={props.item} callback={props.callback} />
      ) : (
        <Text>{props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};
