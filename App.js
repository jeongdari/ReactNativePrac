import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, FlatList } from 'react-native';
import { useState } from 'react';
import data from "./data/attractions.json";
import { Attraction } from "./components/Attraction";
import { SafeAreaView } from "react-native-safe-area-context";




export default function App() {
  const [input, setInput] = useState("");
  const [attractions, setAttractions] = useState([]);
  const handleSubmit = (event) => {
    const text = event.nativeEvent.text; // nativeEvent.text is the value of the input field

    // If the input is empty, clear the list of attractions
    if (text === "") {
      setAttractions([]);
      return;
    }

    // Otherwise, filter the list of attractions based on the input
    let results = data.filter(({ city }) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    results = results.map((item) => item.attractions).flat();

    console.log(results)

    setAttractions(results);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter a city name..."
          returnKeyType="search"
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={(event) => handleSubmit(event)}
        />
        <StatusBar style="auto" />
        <FlatList
          style={styles.list}
          data={attractions}
          renderItem={({ item }) => <Attraction name={item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "90%",
  },
  searchBar: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  list: {
    marginTop: 10,
    flexGrow: 0,
    width: "100%",
  },
});
