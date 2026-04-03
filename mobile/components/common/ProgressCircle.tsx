import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";

const SIZE = 160;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressCircle = ({ percentage }: ProgressCircleProps) => {
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100;

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: SIZE,
          height: SIZE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg width={SIZE} height={SIZE}>
          <Circle
            stroke="#E5E7EB"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />

          <Circle
            stroke="#10B981"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>

        <View
          style={{
            position: "absolute",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: fontSizes.FONT35,
              fontWeight: "700",
            }}
          >
            {percentage}%
          </Text>

          <Text
            style={{
              fontSize: moderateScale(12),
              color: "#6B7280",
              textAlign: "center",
            }}
          >
            DIAGNOSIS
          </Text>

          <Text
            style={{
              fontSize: moderateScale(12),
              color: "#6B7280",
              textAlign: "center",
            }}
          >
            CONFIDENCE
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressCircle;
