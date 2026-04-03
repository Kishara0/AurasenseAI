import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import { SHADOWS } from "@/constants/Shadows";
import DiagnosisCard from "@/components/common/DiagnosisCard";
import { diagnosisData } from "@/configs/data";
import { router } from "expo-router";
import DiagnosisScreenSkelton from "@/components/common/DiagnosisScreenSkelton";

const DiagnosisScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diagnosis Vehicles</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addVehicleCard}>
          <View style={styles.iconContainer}>
            <Text style={{ fontSize: 50 }}>🚗</Text>
          </View>
          <Text style={styles.cardTitle}>Add Your First Vehicle</Text>
          <Text style={styles.cardSubtitle}>
            Register your car to start monitoring its health and running
            diagnostics instantly.
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/(routes)/addVehicles")}
          >
            <Text style={styles.addButtonText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: fontSizes.FONT28,
              fontWeight: "700",
              paddingBottom: moderateScale(10),
            }}
          >
            Select your vehicles to diagnosis
          </Text>
          <DiagnosisScreenSkelton />
          <DiagnosisScreenSkelton />
          {diagnosisData.map((item) => (
            <DiagnosisCard key={item.id} item={item} onPress={()=>router.push("/(routes)/problemDescription")}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiagnosisScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  headerTitle: {
    fontSize: fontSizes.FONT35,
    fontWeight: "bold",
    color: COLORS.black,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    gap: moderateScale(10),
  },
  addButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    justifyContent: "center",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: fontSizes.FONT20,
    fontWeight: "600",
  },
  addVehicleCard: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: "center",
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#E3F2FD",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: fontSizes.FONT25,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: moderateScale(8),
  },
  cardSubtitle: {
    fontSize: fontSizes.FONT20,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: moderateScale(24),
    lineHeight: moderateScale(22),
  },
});
