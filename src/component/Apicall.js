import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import axios from "axios";

function Apicall() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [storedValues, setStoredValues] = useState([]);

  useEffect(() => {
    const baseurl =
      "https://raw.githubusercontent.com/kishan80090/jsondata9/main/json.json";

    axios.get(baseurl).then((response) => {
        setData(response.data.services);

      })
      .catch((error) => {
        console.log("Fetch Error", error);
      });
  }, []);
  const handleSearch = (text) => {
    setSearch(text);

    if (text.length >= 3) {
      const newData = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelect = (item) => {
    if (!storedValues.includes(item)) {
      setStoredValues([...storedValues, item]);
    }
    setSearch("");
    setFilteredData([]);
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      {/* Row Box */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        {/* Search Box */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5, fontSize: 14, color: "#333" }}>
            Search Services
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 8,
              padding: 10,
            }}
            placeholder="Search here..."
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Stored Box */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5, fontSize: 14, color: "#333" }}>
            Stored Services
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "green",
              borderRadius: 8,
              backgroundColor: "#eaffea",
              
            }}
            value={storedValues.join(", ")}
            editable={false}
            multiline
          />
        </View>
      </View>

      {/* Suggestion List */}
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: "#f1f1f1",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default Apicall;
