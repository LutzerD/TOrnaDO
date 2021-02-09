import React, { useState } from "react";
import { Text, View, CheckBox, TextInput } from "react-native";

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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <Text> {props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};

const TodoText = (props) => {
  console.log(props.item);
  // return (
  //   <View style={{ flexDirection: "column" }}>
  //     <TextInput
  //       onSelectionChange={(selection) => {
  //         selection.persist();
  //         console.log("selection");
  //       }}
  //       style={{ maxHeight: 40 }}
  //       multiline={true}
  //       numberOfLines={30}
  //       onChange={(event) => {
  //         event.persist();
  //         console.log(event.nativeEvent);
  //       }}
  //     />
  //   </View>
  // );
  return (
    <TextInput
      autoFocus={autoFocusNext(props.item.id)}
      defaultValue={props.item.text}
      multiline={true}
      editable
      onChange={(text) => {
        props.item.text = text;
      }}
      style={{ outline: "none" }}
      onSubmitEditing={(text) => {
        props.item.text = text;
        autoFocus = true;
        const [newTodoIndex, newTodo] = props.item.parent.createChild(
          {
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ width: tabSize }}>-</Text>
      <Text>&nbsp;</Text>
      {props.edit ? (
        <TodoText item={props.item} callback={props.callback} />
      ) : (
        <Text> {props.item ? props.item.text : props.text}</Text>
      )}
    </View>
  );
};
