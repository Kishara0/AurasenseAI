import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/common/CustomButton";
import { router } from "expo-router";

const DATA = [
  {
    title: "Dashboard",
    subtitle: "Warning lights",
    icon: "warning",
  },
  {
    title: "Engine Bay",
    subtitle: "Engine photo",
    icon: "build",
  },
  {
    title: "Problem Area",
    subtitle: "Specific issue",
    icon: "search",
  },
];

const VisualEvidenceScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: moderateScale(20),
          gap: moderateScale(20),
          paddingBottom: moderateScale(20),
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: COLORS.textSecondary, textAlign: "right" }}>
          STEP 4 OF 4
        </Text>

        <Text style={styles.header}>Visual Evidence</Text>

        <View style={styles.visualContainer}>
          {DATA.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={item.icon as any}
                  size={moderateScale(23)}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>

              <TouchableOpacity style={styles.button}>
                <Ionicons
                  name="camera"
                  size={moderateScale(19)}
                  color={COLORS.primary}
                />
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={[styles.card, styles.tipCard]}>
            <View style={styles.tipHeader}>
              <Ionicons
                name="bulb"
                size={moderateScale(23)}
                color={COLORS.primary}
              />
              <Text style={styles.tipTitle}>Photo Tips</Text>
            </View>

            <Text style={styles.tipText}>
              Good lighting, steady camera, and avoid glares for best AI
              results.
            </Text>

            <Pressable>
              <Text style={styles.readMore}>Read more →</Text>
            </Pressable>
          </View>
        </View>
         <CustomButton
              title="Generate Report"
              onPress={() => router.push("/(routes)/diagnosticReport")}
            />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VisualEvidenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: moderateScale(20),
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: fontSizes.FONT26,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  visualContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: moderateScale(12),
  },

  card: {
    width: "48%",
    borderWidth: moderateScale(1),
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },

  iconWrapper: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },

  title: {
    fontWeight: "600",
    fontSize: fontSizes.FONT20,
    color: "#111827",
  },

  subtitle: {
    fontSize: fontSizes.FONT18,
    color: "#6B7280",
    marginBottom: moderateScale(10),
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    backgroundColor: "#E5E7EB",
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(20),
  },

  buttonText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  tipCard: {
    alignItems: "flex-start",
    borderStyle: "solid",
  },

  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    marginBottom: moderateScale(8),
  },

  tipTitle: {
    fontWeight: "600",
    color: "#111827",
    fontSize: fontSizes.FONT20,
  },

  tipText: {
    fontSize: fontSizes.FONT18,
    color: "#6B7280",
    marginBottom: moderateScale(10),
  },

  readMore: {
    color: COLORS.primary,
    fontWeight: "500",
  },
});
