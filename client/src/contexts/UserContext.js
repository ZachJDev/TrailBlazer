import React, { createContext, useState } from "react";
import { getUserDataAuth, login } from "../API/API";
import { useMutation, useQuery } from "react-query";

export const UserContext = createContext(null); // not sure  if I should pass null here, but I don't
// plan on using the default value.

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const submitLogin = useMutation(["login"], (body) => login(body)(), {
    onSuccess: (payload) => {
      if (payload.status === 200) {
        setUser(payload);
        setErrors({});
      } else {
        setErrors(payload);
      }
    },
  });

  const userExists = (() =>
    !(Object.keys(user).length === 0 && user.constructor === Object))();
  const clearUser = () => setUser({});

  useQuery(["getUserData"], getUserDataAuth(), {
    onSuccess: (res) => {
      setUser(res);
    },
  });

  const updateUser = (form) => {
    submitLogin.mutate(form);
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, errors, clearUser, userExists }}
    >
      {children}
    </UserContext.Provider>
  );
}
