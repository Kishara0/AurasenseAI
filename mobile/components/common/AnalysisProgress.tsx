import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";



const AnalysisProgress = ({ title, percentage, icon }: AnalysisProgressProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.iconWrapper}>
            <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={18} color="#2563EB" />
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.percent}>{percentage}%</Text>
      </View>

      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` },
          ]}
        />
      </View>
    </View>
  );
};

export default AnalysisProgress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),

  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },

  iconWrapper: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: "#e9effd",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#111827",
  },

  percent: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#111827",
  },

  barBg: {
    height: moderateScale(6),
    backgroundColor: "#E5E7EB",
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: moderateScale(10),
  },
});