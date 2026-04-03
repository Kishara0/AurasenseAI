import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Directory, Paths } from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { fontSizes } from "@/themes/app.constant";
import BackButton from "@/components/common/BackButton";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/common/CustomButton";
import { router } from "expo-router";


const instructions = [
  "Keep the engine running while you record.",
  "Hold your phone near the source of the noise.",
  "Record for at least 10 seconds for best results.",
];

const AudioRecordingScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [savedUri, setSavedUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<any>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      scaleAnim.setValue(1);
      rippleAnim.setValue(0);

      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),

          Animated.timing(rippleAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(1);
      rippleAnim.setValue(0);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (isPlaying) {
        Alert.alert("Stop playback first");
        return;
      }

      if (savedUri) {
        Alert.alert("Please reset", "Please reset before recording again");
        return;
      }

      if (recording) return;

      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(newRecording);
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } catch (e) {
      console.log("Start error", e);
    }
  };

  const saveRecording = async (uri: string) => {
    try {
      const audioDir = new Directory(Paths.document, "audio");

      try {
        await audioDir.create({ intermediates: true });
      } catch {}

      const fileName = `recording-${Date.now()}.m4a`;
      const newPath = audioDir.uri + fileName;

      await FileSystemLegacy.copyAsync({
        from: uri,
        to: newPath,
      });

      setSavedUri(newPath);
    } catch (e) {
      console.log("Save error:", e);
    }
  };

  const stopRecording = async () => {
    try {
      clearInterval(intervalRef.current);
      setIsRecording(false);

      if (!recording || savedUri) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri) {
        await saveRecording(uri);
      }

      setRecording(null);
    } catch (e) {
      console.log("Stop error", e);
    }
  };

  const playSound = async () => {
    try {
      if (isRecording) {
        Alert.alert("Stop recording first");
        return;
      }

      if (!savedUri) return;

      if (sound) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            await sound.stopAsync();
            await sound.unloadAsync();
          }
        } catch {}
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: savedUri,
      });

      setSound(newSound);
      setIsPlaying(true);

      await newSound.playFromPositionAsync(0);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (e) {
      console.log("Play error", e);
    }
  };

  const pauseSound = async () => {
    try {
      if (!sound) return;
      const status = await sound.getStatusAsync();

      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch {}
  };

  const resetRecording = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      }
    } catch {}

    setSavedUri(null);
    setSeconds(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

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
          <Text style={{ color: COLORS.textSecondary, textAlign: "right" }}>
            STEP 2 OF 4
          </Text>
          <Text style={styles.header}>Record unusual sounds</Text>

          <View style={styles.micWrapper}>
            {isRecording && (
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    transform: [
                      {
                        scale: rippleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 2],
                        }),
                      },
                    ],
                    opacity: rippleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 0],
                    }),
                  },
                ]}
              />
            )}

            <Pressable
              disabled={isPlaying}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Animated.View
                style={[
                  styles.micCircle,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Ionicons
                  name={isRecording ? "stop" : "mic"}
                  size={34}
                  color="#fff"
                />
              </Animated.View>
            </Pressable>
          </View>

          <View style={styles.timerContainer}>
            <TimeBox value={hours} label="HRS" />
            <Text style={styles.colon}>:</Text>
            <TimeBox value={minutes} label="MIN" />
            <Text style={styles.colon}>:</Text>
            <TimeBox value={secs} label="SEC" />
          </View>

          {savedUri && (
            <View style={styles.controls}>
              <Pressable
                onPress={isPlaying ? pauseSound : playSound}
                style={styles.controlBtn}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                  color="#fff"
                />
              </Pressable>

              <Pressable onPress={resetRecording} style={styles.controlBtn}>
                <Ionicons name="refresh" size={20} color="#fff" />
              </Pressable>
            </View>
          )}

          <View>
            <Text
              style={{
                fontSize: fontSizes.FONT26,
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Recording Tips
            </Text>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderRadius: moderateScale(20),
                padding: moderateScale(16),
                gap: moderateScale(14),
                marginTop: moderateScale(10),
              }}
            >
              {instructions.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: moderateScale(10),
                  }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={moderateScale(20)}
                    color="#2563EB"
                    style={{ marginTop: 2 }}
                  />

                  <Text
                    style={{
                      flex: 1,
                      color: "#4B5563",
                      fontSize: moderateScale(14),
                      lineHeight: moderateScale(20),
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Pressable onPress={()=>router.push("/(routes)/diagnosticQuestion")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: fontSizes.FONT20,
              fontWeight: "700",
              color: "#68728b",
            }}
          >
            Skip this step
          </Text>
          </Pressable>
          <CustomButton title="Continue" onPress={()=>router.push("/(routes)/diagnosticQuestion")}/>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const TimeBox = ({ value, label }: any) => (
  <View style={styles.timeBox}>
    <Text style={styles.timeText}>{value.toString().padStart(2, "0")}</Text>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

export default AudioRecordingScreen;

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

  micWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  ripple: {
    position: "absolute",
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: "#EF4444",
  },

  micCircle: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: scale(5) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(10),
    elevation: 5,
  },

  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(30),
  },

  timeBox: {
    alignItems: "center",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.white,
    minWidth: verticalScale(60),
  },

  timeText: {
    fontSize: fontSizes.FONT20,
    fontWeight: "700",
  },

  timeLabel: {
    fontSize: fontSizes.FONT15,
    color: "#6B7280",
  },

  colon: {
    fontSize: fontSizes.FONT20,
    marginHorizontal: moderateScale(10),
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(20),
    marginTop: moderateScale(10),
  },

  controlBtn: {
    backgroundColor: "#1D4ED8",
    padding: moderateScale(14),
    borderRadius: moderateScale(50),
  },
});
