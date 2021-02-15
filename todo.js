import React, { useState } from "react";
import { Storage } from "./lib/storage";

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
  console.log("Making todo with config:", config);

  let item = {
    ...config,
    id: getNextTodoId(),
    children: [],
    type: config.type || "checkbox",
    completed: false,
    text: config.text || "",
  };

  //Remove circular references so it may be stringified to save, for example
  item.unlink = function () {
    delete this.parent;
    console.log(`Unlinked ${this.text}`);
    console.log(this.children);
    this.children.forEach((child) => child.unlink());
  };

  //Remove circular references so it may be stringified to save, for example
  item.relink = function () {
    console.log(`Relinked ${this.text}`);
    this.children.forEach((child) => {
      child.parent = this;
      child.relink();
    });
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

  item.createChild = function (config, callback, placement) {
    let nextChild = makeTodo({ ...config, parent: this });
    let nextIndex = 0;

    if (placement && (placement.after || placement.before)) {
      const offset = placement.after ? 1 : 0;
      const targetId = placement.after || placement.before;

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i].id == targetId) {
          this.children.splice(i + offset, 0, nextChild);
          nextIndex = i + offset;
          break;
        }
      }
    } else {
      nextIndex = this.children.push(nextChild) - 1;
    }

    if (callback) callback();
    return [nextIndex, this.children[nextIndex]];
  };

  console.log("Returning:", item);
  return item;
};
