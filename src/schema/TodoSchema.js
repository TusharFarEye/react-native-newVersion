const TodoSchema = {
    name: "todo",
    properties: {
      _id: "int",
      title: "string",
      date:"string",
      todoStatus: "string",
      todoType : "bool",
    },
    primaryKey: "_id",
  };

export default TodoSchema; 