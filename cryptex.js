import React from "react";
import { View } from "react-native";
import { Todo } from "./item";

export const Cryptex = (props) => {
  return props.items.map((todo) => <Todo item={todo}></Todo>);
};
