import io from "socket.io-client";
import { useEffect, useState, useCallback } from "react";
import { MessageType } from "@/components/ChatMessage";

const socket = io("http://192.168.70.165:3000");

type MessageRequest = Pick<MessageType, 'id' | 'text' | 'time'>;

const useChatSocket = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const id = socket.id;

    // hadle sending of messages
    const sendMessage = useCallback((text: string) => {
        const message: MessageType = {
            id: socket.id ?? '',
            text: text,
            time: new Date().toLocaleTimeString('en-Us', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
        }
        socket.emit('chat-message', message);
        setMessages((prev) => [...prev, message]);
    }, []);

    useEffect(() => {
        const handleNewMessage = (message: MessageType) => {
            setMessages((prev) => [...prev, message]);
        }

        socket.on('chat-message', handleNewMessage);
    }, []);

    return {
        messages,
        sendMessage,
        id
    }
};

export default useChatSocket;