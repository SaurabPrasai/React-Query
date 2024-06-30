// https://jsonplaceholder.typicode.com/posts

import { useQuery, useMutation } from "@tanstack/react-query";
import * as apiClient from "./api-client";

// for get request useQuery

const App = () => {
  const { data, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: apiClient.fetchData,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: apiClient.postData,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: Error) => {
        console.log(err.message)
    },
  });

  console.log(mutation.isPending, mutation.isError, mutation.isSuccess,mutation.error?.message);

  return (
    <div>
      <button
        onClick={() =>
          mutation.mutate({
            userId: 1,
            id: 0,
            title: "Foo",
            body: "Bar",
          })
        }
       disabled={mutation.isPending}>
        {mutation.isPending?"Loading...":"Add Data"}
      </button>

      {mutation.isError && mutation.error.message}
      {mutation.isSuccess && <div>Data is added Successfully </div>}

      {data?.map((todo) => (
        <div className="hero" key={todo.id}>
          <div>
            <p>{todo.id}</p>
            <p>{todo.title}</p>
          </div>
          <div>
            <button>Complete</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
