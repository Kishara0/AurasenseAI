import { useState } from "react";
import { Redirect } from "expo-router";

export default function Index() {
  // eslint-disable-next-line 
  const [loggedInUser, setLoggedInUser] = useState<boolean | null>(null);
  // eslint-disable-next-line 
  const [loading, setLoading] = useState<boolean>(false);
  return (
     <>
      {loading ? (
        <></>
      ) : (
        <Redirect href={!loggedInUser ? "/(routes)/onboarding" : "/(tab)/garage"} />
      )}
    </>
  );
}
