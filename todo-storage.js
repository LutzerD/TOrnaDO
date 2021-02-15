import { Storage as api } from "./lib/storage";

/*
    This file middlewares the business logic and storage method
*/

//hoisted
export const Storage = {
  load: load,
  save: save,
  update: update,
  remove: remove,
};

async function load(key) {
  return await api.get(key);
}

async function remove(key, todo) {
  return await api.delete();
}

async function save(key, todo) {
  console.log(`Saving ${key}:`, todo);
  todo.unlink();
  const result = await api.post(key, todo);
  console.log("got result", result);
  todo.relink();
  return result;
}

async function update(key, todo) {
  todo.unlink();
  const result = await api.put(key, todo);
  todo.relink();
  return result;
}
