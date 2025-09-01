
import { FlatList, Text, View } from "react-native";
function Flastist() {
  const fruits = ["Apple", "Banana", "Mango"];
  return (
    <View>
      <FlatList
        data={fruits}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
      />
    </View>
  );
}
export default Flastist;
