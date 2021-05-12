import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import withHelmet from "../../HigherOrderComponents/withHelmet";

function Logout() {
  const [payload, setPayload] = useState({});
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    async function logUserOut() {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const ret = await res.json();
      setPayload({ ...ret });
      if (ret.success) {
        clearUser(null);
      }
    }

    logUserOut().then((r) => {});
  }, []);

  return (
    <div>
      {payload.success ? (
        <h2>Successfully Logged out.</h2>
      ) : (
        <h2>Logging you out...</h2>
      )}
    </div>
  );
}

export default withHelmet({ title: "Logout" })(Logout);
