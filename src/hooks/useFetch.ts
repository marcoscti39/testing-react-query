import { useQuery } from "@tanstack/react-query";
import React from "react";
import { User } from "../@types";

const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: User[] = await response.json();
  return data;
};

export const useFetch = () => {
  return useQuery(["fetchUsers"], getData);
};

// const data: User[] = await axios.get(
//   "https://jsonplaceholder.tyicode.com/users"
// );
// return data;
