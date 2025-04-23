import useChatSocket from '@/hooks/useChatSocket';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type MessageType = {
  id: string;
  text: string;
  name?: string;
  time: string;
};

export function ChatMessage({id, text, name, time}: MessageType) {
  const { id:socketId } = useChatSocket();
  const isUser = id === socketId;
  
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.otherBubble,
        ]}
        >
        {!isUser && <Text style={styles.readTextSender}>{name}</Text>}
        <Text style={[styles.messageText, isUser ? styles.userText : styles.otherText]}>
          {text}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        {/* {isUser && <Text style={styles.readTextSender}>You</Text>} */}
        <Text style={styles.timeText}>{time}</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  otherContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#6C63FF',
  },
  otherBubble: {
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  userText: {
    color: '#fff',
  },
  otherText: {
    color: '#1f2937',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  readTextSender: {
    fontSize: 12,
    color: '#6C63FF',
    fontFamily: 'Inter-Regular',
  },
});