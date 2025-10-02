import {View, Text} from "react-native";
import {Link} from "expo-router";

export default function NotFoundScreen () {
    return (
        <View className="bg-black justify-center items-center flex-1 w-full">
            <Text className="text-white self-center text-2xl">Oops! Screen does&apos;t exist</Text>
            <Link className="text-gray-50 text-xl" href="/" >Go Back to Home Screen</Link>
        </View>
    );
}
