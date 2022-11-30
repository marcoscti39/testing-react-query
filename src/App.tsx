import React from "react";
import { loadConfigFromFile } from "vite";
import { User } from "./@types";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  const { data, isLoading, isError } = useFetch();
  console.log(isError);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <>
          <p>something happen</p>
        </>
      ) : (
        <>
          {data?.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}{" "}
        </>
      )}
    </div>
  );
};

export default App;

// {data && data?.length > 0 ? (
//   data?.map((item, index) => <div key={index}>{item.name}</div>)
// ) : (
//   <p>something happen</p>
// )}
