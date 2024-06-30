interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type TodoArray = Todo[];

export const fetchData = async (): Promise<TodoArray> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw Error("Data not fetched");
  }
  return res.json();
};

export const postData = async (newpost: Todo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newpost),
  });
  if (!res.ok) {
    throw Error("Data not posted");
  }


  
  return await res.json();
};
