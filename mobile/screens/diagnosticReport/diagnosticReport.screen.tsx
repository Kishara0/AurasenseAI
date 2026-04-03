import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { StatusConfig } from "@/configs/data";
import { Ionicons } from "@expo/vector-icons";
import ProgressCircle from "@/components/common/ProgressCircle";
import AnalysisProgress from "@/components/common/AnalysisProgress";
import CustomButton from "@/components/common/CustomButton";
import { router } from "expo-router";

const DiagnosticReportScreen = () => {
  const status = StatusConfig["moderate"];
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: moderateScale(20),
            gap: moderateScale(20),
            paddingBottom: moderateScale(40),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: moderateScale(16),
              padding: moderateScale(16),
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(12),
            }}
          >
            <View
              style={{
                padding: moderateScale(10),
                borderRadius: moderateScale(40),
                backgroundColor: status.bg,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={status.icon as any}
                size={moderateScale(30)}
                color={status.text}
              />
            </View>

            <View>
              <Text
                style={{
                  color: status.text,
                  fontWeight: "700",
                  fontSize: fontSizes.FONT26,
                }}
              >
                Moderate Issue
              </Text>

              <Text
                style={{
                  color: COLORS.textSecondary,
                  fontSize: fontSizes.FONT18,
                }}
              >
                Maintenance recommended soon
              </Text>
            </View>
          </View>

          <View
            style={{
              gap: moderateScale(10),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT35,
                fontWeight: "600",
              }}
            >
              Worn Engine Belt
            </Text>
            <View style={{
              flexDirection:"row",
              gap:moderateScale(5)
            }}>
              <Ionicons
                name="sparkles"
                size={moderateScale(18)}
                color={COLORS.textSecondary}
              />

              <Text
                style={{
                  fontSize: fontSizes.FONT20,
                  fontWeight: "600",
                  color: COLORS.textSecondary,
                }}
              >
                Detected Via multi-modal Al analysis
              </Text>
            </View>
          </View>

          <ProgressCircle percentage={94} />
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: moderateScale(16),
              padding: moderateScale(16),
              shadowColor: COLORS.black,
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: moderateScale(10),
              }}
            >
              <Text
                style={{
                  color: COLORS.textSecondary,
                  fontSize: fontSizes.FONT20,
                }}
              >
                Estimated Repair Cost
              </Text>

              <Ionicons
                name="cash-outline"
                size={moderateScale(25)}
                color={COLORS.textSecondary}
              />
            </View>

            <Text
              style={{
                fontSize: fontSizes.FONT35,
                fontWeight: "700",
                color: COLORS.black,
                marginBottom: moderateScale(10),
              }}
            >
              $75 - $200
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: "#E5E7EB",
                marginBottom: moderateScale(10),
              }}
            />

            <Text
              style={{
                color: COLORS.textSecondary,
                fontSize: fontSizes.FONT20,
              }}
            >
              Local Market Data
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: fontSizes.FONT30,
                fontWeight: "600",
                marginBottom: moderateScale(10),
              }}
            >
              Analysis Details
            </Text>
            <AnalysisProgress
              title="Audio Analysis"
              percentage={88}
              icon="volume-high"
            />

            <AnalysisProgress
              title="Visual Inspection"
              percentage={96}
              icon="eye"
            />
          </View>

          <CustomButton title="Find Nearby Mechanics" />

          <TouchableOpacity onPress={()=>router.push("/(routes)/diagnosticChat")} 
          activeOpacity={0.8}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderWidth: moderateScale(2),
              paddingVertical: moderateScale(14),
              borderColor: "#c4d2ee",
              borderRadius: scale(30),
              width: "100%",
              flexDirection: "row",
              gap: moderateScale(5),
            }}
          >
            <Ionicons
              name="sparkles"
              size={moderateScale(18)}
              color="#2563EB"
            />

            <Text
              style={{
                color: "#2563EB",
                fontWeight: "600",
                fontSize: moderateScale(16),
              }}
            >
              Chat with AI
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DiagnosticReportScreen;

const styles = StyleSheet.create({});
