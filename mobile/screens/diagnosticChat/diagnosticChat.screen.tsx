import { initialMessages } from "@/configs/data";
import { COLORS } from "@/constants/Colors";
import { fontSizes } from "@/themes/app.constant";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDiagnosisStore } from "@/store/diagnosisStore";
import { router } from "expo-router";

const ChatScreen = () => {
  const { history, isAnalyzing, submitDiagnosis } = useDiagnosisStore();
  const [input, setInput] = useState<string>("");
  const flatListRef = useRef<FlatList<Message>>(null);

  const sendMessage = async () => {
    if (!input.trim() || isAnalyzing) return;

    // We can just set the history manually temporarily before submitting
    const userMessage = { role: 'user', content: input };
    useDiagnosisStore.setState(state => ({ history: [...state.history, userMessage] }));
    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    const data = await submitDiagnosis();
    if (data?.status === 'complete') {
        router.push("/(routes)/diagnosticReport");
    } else {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }
  };

  // Convert history array to local format
  const mappedMessages: Message[] = history.map((msg: any, i: number) => ({
      id: i.toString(),
      type: (msg.role === 'mechanic' ? 'ai' : 'user') as "ai" | "user",
      text: msg.content
  }));

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "time") {
      return <Text style={styles.time}>{item.text}</Text>;
    }

    const isUser = item.type === "user";

    if (isUser) {
      return (
        <View style={styles.userWrapper}>
          <View style={[styles.bubble, styles.userBubble]}>
            <Text style={styles.userText}>{item.text}</Text>
          </View>

          {"read" in item && item.read && (
            <Text style={styles.read}>{item.read}</Text>
          )}
        </View>
      );
    }

    return (
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100?img=12",
            }}
            style={{
              width: moderateScale(32),
              height: moderateScale(32),
              borderRadius: moderateScale(40),
            }}
          />
        </View>

        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.aiText}>{item.text}</Text>

          {"extra" in item && item.extra && (
            <>
              <Text style={[styles.aiText, styles.marginTop]}>
                {item.extra}
              </Text>

              <View style={styles.actions}>
                <View style={styles.actionBtn}>
                  <Text style={styles.actionText}>Find a mechanic</Text>
                </View>

                <View style={styles.actionBtn}>
                  <Text style={styles.actionText}>Estimated cost</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={mappedMessages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputBar}>
            {isAnalyzing && <ActivityIndicator size="small" color={COLORS.primary} style={{marginRight: 10}} />}
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />

            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  listContent: {
    padding: moderateScale(16),
    paddingBottom: moderateScale(10),
  },

  messageRow: {
    marginBottom: moderateScale(10),
    flexDirection: "row",
  },

  aiRow: {
    justifyContent: "flex-start",
  },

  userRow: {
    justifyContent: "flex-end",
  },

  bubble: {
    maxWidth: "75%",
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
  },

  aiBubble: {
    backgroundColor: "#F3F4F6",
  },

  userBubble: {
    backgroundColor:COLORS.primary,
    borderRadius: moderateScale(16),
  },

  aiText: {
    color: "#111827",
  },

  userText: {
    color: COLORS.white,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    backgroundColor: COLORS.white,
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },

  sendBtn: {
    marginLeft: moderateScale(8),
    backgroundColor: COLORS.primary,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: COLORS.white,
    fontSize: fontSizes.FONT20,
  },

  time: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: fontSizes.FONT15,
    marginBottom: moderateScale(10),
  },

  row: {
    flexDirection: "row",
    gap: moderateScale(8),
    marginBottom: moderateScale(10),
  },

  avatar: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: verticalScale(16),
    backgroundColor: "#111827",
  },

  userWrapper: {
    alignItems: "flex-end",
    marginBottom: moderateScale(10),
  },

  read: {
    fontSize: fontSizes.FONT14,
    color: "#9CA3AF",
    marginTop: moderateScale(4),
  },

  marginTop: {
    marginTop: moderateScale(6),
  },

  actions: {
    flexDirection: "row",
    gap: moderateScale(8),
    marginTop: moderateScale(10),
  },

  actionBtn: {
    backgroundColor: "#E5E7EB",
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
  },

  actionText: {
    fontSize: fontSizes.FONT15,
    color: COLORS.primary,
  },
});
