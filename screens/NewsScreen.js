import { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [headline, setHeadline] = useState("");

  const setRandomHeadline = (articles) => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomArticle = articles[randomIndex];
    setHeadline(randomArticle.title);
  };

  const fetchArticles = async () => {
    const API_KEY = process.env.EXPO_PUBLIC_NEWS_KEY;
    const newsURL = `https://newsapi.org/v2/top-headlines?country=au&apiKey=${API_KEY}`;

    const response = await fetch(newsURL);
    const data = await response.json();
    const articles = data.articles;

    setRandomHeadline(articles);
    setArticles(articles);
  };

  useEffect(() => {
    (async () => await fetchArticles())();
  }, []);

  return (
    <GlobalLayout>
      <TouchableOpacity
        onPress={() => setRandomHeadline(articles)}
        style={styles.touchable}
      >
        <Text>{headline}</Text>
      </TouchableOpacity>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  touchable: {
    height: "100%",
  },
});