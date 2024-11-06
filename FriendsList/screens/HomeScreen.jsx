import { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import FriendListItem from "../components/FriendListItem";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api?results=20');
      const json = await response.json();
      setData(json.results);
      setIsLoading(false);
    } catch (error){
      alert('Fehler beim Laden');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="darkorange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <FriendListItem
              friend={item}
              onPress={() => {
                navigation.navigate("Friend", { friend: item });
              }}
            />
          );
        }}
        keyExtractor={(item) => item.email}
        refreshing={isLoading}
        onRefresh={fetchData}
        ItemSeparatorComponent={<View style={styles.listSeparator} />}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>Keine Daten geladen</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 50,
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "lightsalmon",
  },
  listEmpty: {
    fontSize: 32,
    paddingTop: 100,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
