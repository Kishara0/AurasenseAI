import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/common/CustomButton";
import { router } from "expo-router";

type Question = {
  topic: string;
  question: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    topic: "Engine Temperature",
    question: "Does the noise occur when the engine is cold or warm?",
    options: ["When cold", "When warm", "Both"],
  },
  {
    topic: "Noise Pattern",
    question: "Is the noise continuous or intermittent?",
    options: ["Continuous", "Intermittent", "Not sure"],
  },
  {
    topic: "Noise Location",
    question: "Where is the noise coming from?",
    options: ["Front", "Rear", "Unknown"],
  },
];

const DiagnosticQuestionScreen = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (option: string) => {
    const isSame = answers[currentStep] === option;

    const updated = { ...answers };

    if (isSame) {
      delete updated[currentStep];
    } else {
      updated[currentStep] = option;
    }

    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isCompleted = Object.keys(answers).length === QUESTIONS.length;

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
          STEP 3 OF 4
        </Text>

        <Text style={styles.header}>Diagnostic Check</Text>

        <View>
          <View style={{ marginBottom: moderateScale(10) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.primary, fontWeight: "600" }}>
                QUESTION {currentStep + 1} OF {QUESTIONS.length}
              </Text>

              <Text style={{ color: "#6B7280" }}>
                {QUESTIONS[currentStep].topic}
              </Text>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: "#E5E7EB",
                borderRadius: 10,
                marginTop: 8,
              }}
            >
              <View
                style={{
                  width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                  height: "100%",
                  backgroundColor: COLORS.primary,
                  borderRadius: moderateScale(10),
                }}
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: moderateScale(16),
              marginBottom: moderateScale(15),
            }}
          >
            {QUESTIONS[currentStep].question}
          </Text>

          {QUESTIONS[currentStep].options.map(
            (option: string, index: number) => {
              const selected = answers[currentStep] === option;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(option)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: moderateScale(1),
                    borderColor: selected
                      ? COLORS.primary
                      : COLORS.textSecondary,
                    borderRadius: moderateScale(30),
                    padding: moderateScale(14),
                    marginBottom: moderateScale(12),
                  }}
                >
                  <Text
                    style={{
                      color: selected ? COLORS.primary : COLORS.secondary,
                      fontWeight: "500",
                      fontSize: fontSizes.FONT19,
                    }}
                  >
                    {option}
                  </Text>

                  <View
                    style={{
                      width: scale(20),
                      height: verticalScale(20),
                      borderRadius: moderateScale(10),
                      borderWidth: moderateScale(2),
                      borderColor: selected
                        ? COLORS.primary
                        : COLORS.textSecondary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selected && (
                      <View
                        style={{
                          width: scale(10),
                          height: verticalScale(10),
                          borderRadius: moderateScale(5),
                          backgroundColor: COLORS.primary,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            },
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: moderateScale(20),
            }}
          >
            {currentStep > 0 ? (
              <TouchableOpacity
                onPress={handleBack}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(2),
                }}
              >
                <Ionicons
                  name="arrow-back"
                  size={moderateScale(18)}
                  color={COLORS.black}
                />
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: fontSizes.FONT20,
                    fontWeight: "600",
                  }}
                >
                  Go Back
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {answers[currentStep] && currentStep < QUESTIONS.length - 1 && (
              <TouchableOpacity
                onPress={handleNext}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(2),
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: fontSizes.FONT20,
                    fontWeight: "600",
                  }}
                >
                  Next
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={moderateScale(18)}
                  color={COLORS.black}
                />
              </TouchableOpacity>
            )}
          </View>

          {isCompleted && (
            <CustomButton
              title="Continue"
              onPress={() => router.push("/(routes)/visualEvidence")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiagnosticQuestionScreen;

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
});
