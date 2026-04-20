import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export const setAuthorizationHeader = async () => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const api_url = process.env.EXPO_PUBLIC_SERVER_URL;

  const fetchUserData = useCallback(async () => {
    try {
      await setAuthorizationHeader();
      const response = await axios.get(`${api_url}/auth/me`);

      const userData = response.data.user;

      await SecureStore.setItemAsync("userName", userData.userName);
      await SecureStore.setItemAsync("email", userData.email);
      await SecureStore.setItemAsync("avatar", userData.avatar);

      setUser(userData); 
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, refetchUser: fetchUserData };
};