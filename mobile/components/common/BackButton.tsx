import { Text, Pressable, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";

const BackButton = () => {
  return (
    <View
      style={{
        width: "100%",
        padding: moderateScale(10),
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: moderateScale(2),
        }}
        
      >
        <Ionicons name="chevron-back" size={15} color={COLORS.secondary} />

        <Text
          style={{
            fontSize: fontSizes.FONT18,
            fontWeight: "500",
            color: COLORS.secondary,
          }}
        >
          Back
        </Text>
      </Pressable>
    </View>
  );
};

export default BackButton;
