import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import HistoryScreenSkelton from "@/components/common/HistoryScreenSkelton";
import HistoryCard from "@/components/common/HistoryCard";
import { historyData } from "@/configs/data";
import { router } from "expo-router";


const filters: { label: string; key: FilterType }[] = [
  { label: "All", key: "all" },
  { label: "Moderate", key: "moderate" },
  { label: "Critical", key: "critical" },
  { label: "Resolved", key: "resolved" },
];

const HistoryScreen = () => {
  const [active, setActive] = useState<FilterType>("all");
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diagnosis History</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={moderateScale(20)}
            color="#9CA3AF"
            style={styles.icon}
          />

          <TextInput
            placeholder="Search by vehicle or issue"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>

        <View style={styles.filterContainer}>
          {filters.map((item) => {
            const isActive = active === item.key;

            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => setActive(item.key)}
                style={[
                  {
                    paddingHorizontal: moderateScale(10),
                    paddingVertical: moderateScale(5),
                    backgroundColor: COLORS.white,
                    borderRadius: moderateScale(20),
                  },

                  isActive &&
                    item.key === "all" && {
                      backgroundColor: COLORS.black,
                    },
                  isActive &&
                    item.key === "moderate" && {
                      backgroundColor: "#F59E0B",
                    },
                  isActive &&
                    item.key === "critical" && {
                      backgroundColor: "#EF4444",
                    },
                  isActive &&
                    item.key === "resolved" && {
                      backgroundColor: "#10B981",
                    },
                ]}
              >
                <Text
                  style={[
                    { fontWeight: "600", color: "#3a3939" },
                    isActive && { color: COLORS.white },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <HistoryScreenSkelton />
          <HistoryScreenSkelton />
          {historyData.map(item => <HistoryCard key={item.id} item={item} onPress={()=>router.push("/(routes)/diagnosticReport")}/>)}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    height: moderateScale(44),
  },
  icon: {
    marginRight: moderateScale(8),
  },
  input: {
    flex: 1,
    fontSize: fontSizes.FONT24,
  },
  filterContainer: {
    marginTop: moderateScale(10),
    flexDirection: "row",
    gap: moderateScale(8),
  },
});
