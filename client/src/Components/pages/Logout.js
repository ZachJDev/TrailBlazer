import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../API/API";

function Logout({ history }) {
  const { clearUser, userExists } = useContext(UserContext);
  const queryClient = useQueryClient();
  const submit = useMutation("logout", () => logout()(), {
    onSuccess: (res) => {
      if (res.success) {
        clearUser(null);
        history.replace("/");
      }
    },
  });

  if (queryClient.isMutating() === 0 && userExists) {
    submit.mutate(null, {});
  }
  if (!userExists) history.goBack();

  return (
    <div>
      <h2>Logging you out...</h2>
    </div>
  );
}

export default withHelmet({ title: "Logout" })(Logout);
