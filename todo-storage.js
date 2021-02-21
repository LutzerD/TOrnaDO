import { Storage as api } from "./lib/storage";
import { makeTodo, decorateTodo } from "./todo";

/*
    This file middlewares the business logic and storage method
*/
//hoisted
export const Storage = {
  loadTodo: loadTodo,
  saveTodo: saveTodo,
  update: update,
  remove: remove,
  load: api.get,
  save: api.post,
  clear: api.clear,
};

async function load(key) {
  const value = await api.get(key);
  if (!value) {
    console.log(`could not load ${key}`);
  }

  return value;
}

async function loadTodo(key, recursive) {
  let todo = await load(key);
  if (todo) {
    decorateTodo(todo);
    console.log(`decorated todo from ${key}:`, todo);
    todo.relink(recursive);
  } else {
    //TODO:
  }

  return todo;
}

async function remove(key, todo) {
  return await api.delete();
}

async function saveTodo(key, todo) {
  console.log(`Saving ${key}:`, todo);
  todo.unlink();

  const result = await api.post(key, todo);
  const trueResult = await api.get(key, todo);

  console.log("got result", result);
  console.log("got trueResult", trueResult);
  todo.relink();
  return result;
}

async function update(key, todo) {
  todo.unlink();
  const result = await api.put(key, todo);
  todo.relink();
  return result;
}
