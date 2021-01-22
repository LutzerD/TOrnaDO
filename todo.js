let firstId = 0; //todo: Later this should be in a db / dynamically generated, when I store the todo's

const getNextTodoId = () => {
  return (firstId += 1);
};

export const todo = (title, body) => {
  let todo = {
    id: getNextTodoId(),
    body: body,
    title: title,
  };
  return todo;
};
