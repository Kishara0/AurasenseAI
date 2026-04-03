import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { fontSizes } from "@/themes/app.constant";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";

const DiagnosticReport = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <View style={[styles.header, { paddingTop: insets.top }]}>
              <Pressable style={styles.left} onPress={() => router.back()}>
                <AntDesign name="left" size={scale(20)} color="#005DE0" />
                <Text style={styles.backText}>Back</Text>
              </Pressable>

              <Text style={styles.title}>Diagnostic Report</Text>

              <View style={{ width: scale(60) }} />
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default DiagnosticReport;

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    height: verticalScale(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(1),
  },

  backText: {
    color: COLORS.primary,
    fontSize: fontSizes.FONT20,
  },

  title: {
    fontSize: fontSizes.FONT25,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
