import React, { useState } from "react";

let firstId = 0; //todo: Later this should be in a db / dynamically generated, when I store the todo's

const getNextTodoId = () => {
  return (firstId += 1);
};

/*
Config will be like - 
{
  text, //i.e. text 
  content-type, //i.e. checkbox or notes, default checkbox - if over x letters, turn to note?
}

so in document view, hitting enter == creating a new todo.
*/

export const makeTodo = (config) => {
  console.log("Config:", config);
  let item = {
    ...config,
    id: getNextTodoId(),
    children: [],
    type: config.type || "checkbox",
    completed: false,
    text: config.text || "",
  };

  //returns false if parent is cb and no children cbs
  item.containsCheckboxes = function (root) {
    if (!root && this.type == "checkbox") {
      return true;
    } else {
      for (const childIndex in this.children) {
        if (this.children[childIndex].containsCheckboxes()) return true;
      }
    }
    return false;
  };

  item.createChild = function (config, callback) {
    let nextIndex =
      this.children.push(makeTodo({ ...config, parent: this })) - 1;

    if (callback) callback();
    return [nextIndex, this.children[nextIndex]];
  };

  console.log("new text", item.text);

  return item;
};
