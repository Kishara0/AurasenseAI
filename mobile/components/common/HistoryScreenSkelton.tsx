import { View } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { moderateScale } from "react-native-size-matters";

const HistoryScreenSkelton = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: moderateScale(12),
        marginBottom: moderateScale(12),
        backgroundColor: "#fff",
        borderRadius: moderateScale(16),
      }}
    >
      <Skeleton
        colorMode="light"
        width={moderateScale(70)}
        height={moderateScale(70)}
        radius={12}
      />

      <View
        style={{
          marginLeft: moderateScale(12),
          flex: 1,
          gap: moderateScale(5),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: moderateScale(6),
          }}
        >
          <Skeleton colorMode="light" width={80} height={12} radius={20} />
          <Skeleton colorMode="light" width={70} height={12} radius={6} />
        </View>
        <View
          style={{
            marginTop: moderateScale(5),
            flexDirection: "column",
            gap: moderateScale(10),
          }}
        >
          <Skeleton colorMode="light" width="100%" height={12} radius={6} />
          <Skeleton colorMode="light" width="100%" height={12} radius={6} />
        </View>
      </View>
    </View>
  );
};

export default HistoryScreenSkelton;
