import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Send } from "lucide-react-native";
import { ChatMessage } from "@/components/ChatMessage";
import Animated, { Layout, FadeIn, FadeInRight } from "react-native-reanimated";    
import { TextInput } from "react-native-gesture-handler";
import useChatSocket from "@/hooks/useChatSocket";

const ChatPage = () => {
    const router = useRouter();
    const [showActiveUsers, setShowActiveUsers] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("")
    const { messages, sendMessage, id } = useChatSocket();

    const flatListRef = useRef<FlatList>(null);


    const onBackButtonPress = () => {
        router.replace("/auth")
    };
    
    const onUserSearchPress = () => {
        setShowActiveUsers(!showActiveUsers)
    };

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar backgroundColor={styles.header.backgroundColor} style="auto" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBackButtonPress}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>

                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerText}>Open Chat</Text>
                </View>
            </View>
            
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(_, idx) => idx.toString()}
                    contentContainerStyle={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <Animated.View
                        entering={FadeInRight.delay(index * 100).duration(300)}
                        layout={Layout.springify()}
                        >
                        <ChatMessage 
                            id={item.id}
                            text={item.text}
                            time={item.time}
                            name={item.name}
                        />
                        </Animated.View>
                    )}
                />
                
                <Animated.View 
                    entering={FadeIn.delay(300).duration(500)}
                    style={styles.inputContainer}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor="#9ca3af"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity 
                        style={[
                        styles.sendButton,
                        { backgroundColor: message.trim() ? '#6C63FF' : '#e5e7eb' }
                        ]}
                        onPress={handleSend}
                        disabled={!message.trim()}
                    >
                        <Send size={20} color={message.trim() ? "#fff" : "#9ca3af"} />
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    header: {
        height: 56,
        backgroundColor: '#6C63FF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        position: 'relative',
    },
    backButton: {
        zIndex: 1, 
    },
    headerTitleWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: 'white',
    },
    contactsDropdown: {
        position: 'absolute',
        top: 80,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
    },
    contactAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#1f2937',
        marginBottom: 4,
    },
    contactStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    statusText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: '#6b7280',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    messagesContainer: {
        padding: 16,
        paddingBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 8,
        maxHeight: 100,
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: '#1f2937',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ChatPage;