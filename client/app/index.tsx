import { Redirect } from "expo-router";

const App = () => {
    // on load directly redirect to auth page
    return <Redirect href={"/auth"} />
}

export default App;