import { View, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {  IsAndroid, IsIOS, IsIPAD } from "@/themes/app.constant";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "garage/index") {
            return (
              <Feather name="home" size={moderateScale(24)} color={color} />
            );
          }

          if (route.name === "diagnosis/index") {
            return (
              <Ionicons name="pulse" size={moderateScale(24)} color={color} />
            );
          }

          if (route.name === "history/index") {
            return (
              <Ionicons
                name="document-text-outline"
                size={moderateScale(24)}
                color={color}
              />
            );
          }

          if (route.name === "profile/index") {
            return (
              <Octicons name="person" size={moderateScale(24)} color={color} />
            );
          }
        },

        tabBarActiveTintColor: "#4A90E2",
        tabBarInactiveTintColor: "#8e8e93",
        headerShown: false,

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontWeight: "600",
        },

        tabBarStyle: {
          paddingTop: 10,
          borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
          borderTopRightRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
          borderTopWidth: 0,
          height: verticalScale(55) + insets.bottom,
        },

        tabBarBackground: () =>
          IsIOS ? (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: COLORS.white,
                borderTopLeftRadius: IsAndroid
                  ? 0
                  : IsIPAD
                    ? scale(25)
                    : scale(35),
                borderTopRightRadius: IsAndroid
                  ? 0
                  : IsIPAD
                    ? scale(25)
                    : scale(35),
                overflow: "hidden",
              }}
            />
          ) : (
            <BlurView
              intensity={100}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: IsAndroid
                  ? 0
                  : IsIPAD
                    ? scale(25)
                    : scale(35),
                borderTopRightRadius: IsAndroid
                  ? 0
                  : IsIPAD
                    ? scale(25)
                    : scale(35),
                overflow: "hidden",
                backgroundColor: COLORS.white,
              }}
            />
          ),
      })}
    >
      <Tabs.Screen name="garage/index" options={{ title: "Garage" }} />
      <Tabs.Screen name="diagnosis/index" options={{ title: "Diagnosis" }} />
      <Tabs.Screen name="history/index" options={{ title: "History" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabLayout;
