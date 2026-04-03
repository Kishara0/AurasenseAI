import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { fontSizes } from "@/themes/app.constant";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/common/CustomButton";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">(
    "annual",
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <BackButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: moderateScale(20),
            gap: moderateScale(20),
            paddingBottom: moderateScale(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "column",
              gap: moderateScale(20),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: scale(60),
                height: scale(60),
                borderRadius: scale(60 / 2),
                backgroundColor: "#E0E7FF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="shield-checkmark"
                size={scale(60 * 0.6)}
                color="#2563EB"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: fontSizes.FONT32,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Unlock Complete Peace of Mind
              </Text>
              <Text
                style={{
                  fontSize: fontSizes.FONT20,
                  textAlign: "center",
                  color: COLORS.textSecondary,
                }}
              >
                Diagnose issues instant and drive with confidence knowing your
                car is in top shape.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                gap: moderateScale(20),
                width: "100%",
              }}
            >
              <View style={styles.item}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="pulse" size={scale(20)} color="#3B82F6" />
                </View>

                <View>
                  <Text style={styles.title}>Unlimited Noise Detection</Text>
                  <Text style={styles.subtitle}>
                    Identify engine sounds instantly
                  </Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="camera" size={scale(20)} color="#3B82F6" />
                </View>

                <View>
                  <Text style={styles.title}>Advanced Photo Diagnostics</Text>
                  <Text style={styles.subtitle}>
                    Visual analysis of car parts
                  </Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={scale(20)}
                    color="#3B82F6"
                  />
                </View>

                <View>
                  <Text style={styles.title}>24/7 AI Mechanic Chat</Text>
                  <Text style={styles.subtitle}>Expert advice anytime</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                gap: moderateScale(10),
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.subscriptionBox,
                  selectedPlan === "annual" && {
                    borderColor: COLORS.primary,
                  },
                ]}
                onPress={() => setSelectedPlan("annual")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: fontSizes.FONT20,
                      }}
                    >
                      Annual Plan
                    </Text>
                    <Text
                      style={{
                        color: COLORS.textSecondary,
                      }}
                    >
                      First 7 days free
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: moderateScale(5),
                      paddingHorizontal: moderateScale(10),
                      backgroundColor: COLORS.primary,
                      alignContent: "center",
                      justifyContent: "center",
                      borderRadius: moderateScale(10),
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: fontSizes.FONT15,
                        fontWeight: "600",
                      }}
                    >
                      BEST VALUE
                    </Text>
                  </View>
                </View>

                <View style={styles.subscriptionBoxValueText}>
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: fontSizes.FONT35 * 1.5,
                    }}
                  >
                    $59.99
                  </Text>
                  <Text style={{ bottom: 10, color: COLORS.textSecondary }}>
                    / year
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>Just $4.99/mo</Text>
                  {selectedPlan === "annual" && (
                    <View style={styles.iconVerify}>
                      <Ionicons
                        name="checkmark"
                        size={scale(14)}
                        color={COLORS.white}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.subscriptionBox,
                  selectedPlan === "monthly" && {
                    borderColor: COLORS.primary,
                  },
                ]}
                onPress={() => setSelectedPlan("monthly")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: fontSizes.FONT20,
                      }}
                    >
                      Monthly Plan
                    </Text>
                    <Text
                      style={{
                        color: COLORS.textSecondary,
                      }}
                    >
                      Cancel anytime
                    </Text>
                  </View>

                  {selectedPlan === "monthly" && (
                    <View style={styles.iconVerify}>
                      <Ionicons
                        name="checkmark"
                        size={scale(14)}
                        color={COLORS.white}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.subscriptionBoxValueText}>
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: fontSizes.FONT35 * 1.5,
                    }}
                  >
                    $9.99
                  </Text>
                  <Text style={{ bottom: 10, color: COLORS.textSecondary }}>
                    / month
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <CustomButton title={"Start Your Subscription"}  onPress={()=>selectedPlan &&router.push("/(tab)/garage")}/>
            <View>
              <Text
                style={{ color: COLORS.textSecondary, textAlign: "center" }}
              >
                Recurring billing. Cancel anytime in settings.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginTop: moderateScale(10),
                }}
              >
                <Pressable
                  onPress={async () =>
                    await WebBrowser.openBrowserAsync("https://www.google.com/")
                  }
                >
                  <Text style={styles.termsText}>Terms of Service</Text>
                </Pressable>
                <Pressable
                  onPress={async () =>
                    await WebBrowser.openBrowserAsync("https://www.google.com/")
                  }
                >
                  <Text style={styles.termsText}>Restore Purchases</Text>
                </Pressable>
                <Pressable
                  onPress={async () =>
                    await WebBrowser.openBrowserAsync("https://www.google.com/")
                  }
                >
                  <Text style={styles.termsText}>Privacy Policy</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(16),
    width: "100%",
  },

  iconWrapper: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: moderateScale(16),
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: moderateScale(14),
    color: "#6B7280",
  },
  iconVerify: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.primary,
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  subscriptionBox: {
    flexDirection: "column",
    gap: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
    borderColor: COLORS.textSecondary,
    borderWidth: moderateScale(2),
    width: "100%",
  },
  subscriptionBoxValueText: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
  },
  termsText: {
    fontSize: fontSizes.FONT15,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
});
