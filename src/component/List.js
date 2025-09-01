import { View, Text, FlatList, StyleSheet } from "react-native";

function List () {
  const data = [
    { id: "1", name: "Kishan" },
    { id: "2", name: "Rahul" },
    { id: "3", name: "Aman" },
    { id: "4", name: "Sita" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  item: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
export default List;
