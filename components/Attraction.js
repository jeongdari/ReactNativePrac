import { Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export const formatAttractionURL = (attraction) =>
  `https://en.wikipedia.org/wiki/${attraction.replace(/\s/g, "_")}`;

export function Attraction({ name }) {
  return (
    <TouchableOpacity
      style={styles.attractionContainer}
      onPress={() => Linking.openURL(formatAttractionURL(name))}
      key={name}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.url}>{formatAttractionURL(name)}</Text>
    </TouchableOpacity>
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