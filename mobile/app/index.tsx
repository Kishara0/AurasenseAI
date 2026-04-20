import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  // eslint-disable-next-line 
  const [loggedInUser, setLoggedInUser] = useState<boolean | null>(null);
  // eslint-disable-next-line 
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(()=>{
    const initialFetch = async()=>{
      const token = await SecureStore.getItemAsync("accessToken");
      setLoggedInUser(token?true:false);
      setLoading(false);
    }
    initialFetch();
  },[])
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
