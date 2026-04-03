import { View, Image, Text, useWindowDimensions } from "react-native";
import React from "react";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Slider = ({ title, subtitle, image }: SlideProps) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: moderateScale(5),
        width,
      }}
    >
      <View
        style={{
          borderRadius: scale(20),
          overflow: "hidden",
          marginBottom:moderateScale(40)
        }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{
            width: scale(300),
            height: verticalScale(300),
          }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: fontSizes.FONT32,
            fontWeight: "800",
            color: COLORS.text,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: fontSizes.FONT20,
            color: COLORS.textSecondary,
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Slider;
