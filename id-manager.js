import { Storage } from "./todo-storage";
const baseKey = "firstId";

export const idManager = async function (key, config) {
  const idManager = {
    id: 0,
    ...config,
    key: baseKey + "." + key,
  };

  idManager.loadFirstId = async function () {
    console.log("about to load ", this.key);
    let storedId = await Storage.load(this.key);
    console.log("Loaded storedId:", storedId);
    if (storedId) this.id = storedId;
  };

  idManager.saveId = async function () {
    await Storage.save(this.key, this.id);
    console.log("Saved storedId?", this.id);
  };

  idManager.nextId = function () {
    this.id += 1;
    this.saveId();
    return this.id;
  };

  idManager.currentId = function () {
    return this.id;
  };

  await idManager.loadFirstId();
  return idManager;
};
