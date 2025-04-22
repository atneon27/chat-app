import { useRouter } from "expo-router";
import { Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const AuthPage = () => {
    const router = useRouter();

    const onPress = () => {
        router.push("/chat")
    }
    return (
        <SafeAreaView>
            <Text>Auth Page</Text>
            <Button title="Chat" onPress={onPress} />
        </SafeAreaView>
    )
}

export default AuthPage;