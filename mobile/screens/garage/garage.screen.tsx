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
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { SHADOWS } from "@/constants/Shadows";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const GarageScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Garage</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/(tab)/profile")}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="account-circle"
            size={moderateScale(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>
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
            onPress={()=>router.push("/(routes)/addVehicles")}
          >
            <Text style={styles.addButtonText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIcon}>
            <MaterialCommunityIcons
              name="tools"
              size={40}
              color={COLORS.textSecondary}
            />
          </View>
          <Text style={styles.emptyStateTitle}>No diagnostics run yet</Text>
          <Text style={styles.emptyStateText}>
            Once you add a vehicle, your diagnostic history and health reports
            will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GarageScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  headerTitle: {
    fontSize: fontSizes.FONT35,
    fontWeight: "bold",
    color: COLORS.black,
  },
  profileButton: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    ...SHADOWS.light,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    gap: moderateScale(5),
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

  sectionTitle: {
    fontSize: fontSizes.FONT30,
    fontWeight: "bold",
    color: COLORS.black,
  },
  emptyStateContainer: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(30),
    alignItems: "center",
    marginTop: moderateScale(10),
    ...SHADOWS.light,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
