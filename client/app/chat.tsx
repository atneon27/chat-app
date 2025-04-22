import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { ArrowLeft, UserSearch } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Send } from "lucide-react-native";
import { ChatMessage, MessageType } from "@/components/ChatMessage";
import Animated, { Layout, FadeIn, FadeInRight } from "react-native-reanimated";    
import { TextInput } from "react-native-gesture-handler";

const ChatPage = () => {
    const messages: MessageType[] = [
    {
        id: 1,
        text: 'Hi there! 👋',
        sender: 'other',
        time: '10:00 AM',
        read: true,
    },
    {
        id: 2,
        text: 'Hey! How are you doing?',
        sender: 'user',
        time: '10:02 AM',
        read: true,
    },
    {
        id: 3,
        text: 'I\'m doing great, thanks for asking! How about you?',
        sender: 'other',
        time: '10:03 AM',
        read: true,
    },
    {
        id: 4,
        text: 'Pretty good! Just working on this new app design.',
        sender: 'user',
        time: '10:05 AM',
        read: true,
    },
    {
        id: 5,
        text: 'That sounds exciting! What kind of app is it?',
        sender: 'other',
        time: '10:06 AM',
        read: true,
    },
    ];

    const router = useRouter();

    const [showActiveUsers, setShowActiveUsers] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("")

    const flatListRef = useRef<FlatList>(null);


    const onBackButtonPress = () => {
        router.replace("/auth")
    };

    const onUserSearchPress = () => {
        setShowActiveUsers(!showActiveUsers)
    };

    const handleSend = () => {
        if (message.trim()) {
        // sendMessage(message);
        setMessage('');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar backgroundColor={styles.header.backgroundColor} style="auto" />
            <View style={styles.header}>
                <TouchableOpacity onPress={onBackButtonPress}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Open Chat</Text>
                <TouchableOpacity onPress={onUserSearchPress}>
                    <UserSearch color="#fff" size={24} />
                </TouchableOpacity>
            </View> 

            {showActiveUsers && <Text>Active Users</Text>}
            
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <Animated.FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <Animated.View
                        entering={FadeInRight.delay(index * 100).duration(300)}
                        layout={Layout.springify()}
                        >
                        <ChatMessage message={item} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        padding: 16,
        fontSize: 24,
        backgroundColor: '#6C63FF',
    },
    backButton: {
        padding: 8,
        color: 'white',
    },
    headerText: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: 'white',
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