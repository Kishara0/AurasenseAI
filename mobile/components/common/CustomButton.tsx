import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";

const CustomButton = ({ title, onPress, isLoading }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5A7DFF",
        paddingVertical: moderateScale(16),
        borderRadius: scale(30),
        width:"100%"
      }}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text
          style={{
            color: COLORS.white,
            fontSize: fontSizes.FONT21,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
