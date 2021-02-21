import React, { useState } from "react";
import { Storage } from "./todo-storage";
import { idManager } from "./id-manager";

var id; //probably the screen...
var lastScreen = "";
export const onScreenChange = async function (screen) {
  if (lastScreen != screen) {
    id = await idManager(screen);
  }
};

export const decorateTodo = (todo) => {
  todo.unlink = function () {
    delete this.parent;
    console.log(`Unlinked ${this.text}`);
    console.log(this.children);
    this.children.forEach((child) => child.unlink());
  };

  //Restore circular references so it may be stringified to save, for example
  todo.relink = function () {
    console.log(`Relinked ${this.text}`);
    this.children.forEach((child) => {
      child.parent = this;
      if (!child.relink) {
        decorateTodo(child);
        console.log("decorated child?", child.relink);
      }
      child.relink();
    });
  };

  //returns false if parent is cb and no children cbs
  todo.containsCheckboxes = function (root) {
    if (!root && this.type == "checkbox") {
      return true;
    } else {
      for (const childIndex in this.children) {
        if (this.children[childIndex].containsCheckboxes()) return true;
      }
    }
    return false;
  };

  todo.save = async function (path) {
    //TODO: On fail trigger reload? Or timeout and try again later? Otherwise it wont save on exit :C
    let root = this;
    for (var i = 0; i < 10; i++) {
      if (!root.parent) {
        break;
      } else {
        root = root.parent;
        console.log(`got a parent at i=${i}!`);
      }
    }
    Storage.saveTodo(path, root);
  };

  todo.createChild = function (config, callback, placement) {
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
};

export const makeTodo = (config) => {
  console.log("Making todo with config:", config);

  let item = {
    text: "",
    completed: false,
    type: "checkbox",
    children: [],
    ...config,
    id: config.id ? config.id : id.nextId(),
  };

  decorateTodo(item);

  console.log("Returning:", item);
  return item;
};
