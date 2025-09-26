import { View, Text } from "react-native-web";
function WellcomePage() {
  return (
    <View style={{ padding: 20 }}><center>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "green" }}>
         Signup Successful
      </Text>
      <Text style={{ marginTop: 10, fontSize: 18 }}><br/><br/>
             Welcome to the next page
      </Text>
   </center> </View>
  );
}
export default WellcomePage;
