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

export const todo = (config) => {
  console.log("Creating Todo");
  const [completed, toggleCompleted] = useState(false);

  let item = {
    ...config,
    id: getNextTodoId(),
    children: [],
    type: config.type || "checkbox",
    completed: false,
  };

  item.toggle = function (newValue) {
    toggleCompleted(newValue);
    console.log("toggled?");
    this.completed = completed;
  };

  //returns false if parent is cb and no children cbs
  item.containsCheckboxes = function (root) {
    console.log("Checking cbs");
    if (!root && this.type == "checkbox") {
      console.log("Has cbs", this.text);
      return true;
    } else {
      for (const childIndex in this.children) {
        if (this.children[childIndex].containsCheckboxes()) return true;
      }
    }
    console.log("Doesn't have cbs", this.text);
    return false;
  };

  item.createChild = function (config) {
    console.log("Fathering:", config);
    let nextIndex = this.children.push(todo({ ...config })) - 1;
    return [nextIndex, this.children[nextIndex]];
  };

  return item;
};
