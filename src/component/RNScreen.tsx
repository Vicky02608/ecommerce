import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  StyleSheet,
} from "react-native";

const BASE_URL = "https://api.freeapi.app";

const RenderItem = React.memo(({ item }: { item: any }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.itemPrice}>${item.price}</Text>
  </View>
));

const RNScreen = () => {

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = `${BASE_URL}/api/v1/public/randomproducts`;

  const fetchData = async (pageNumber = 1, isRefreshing = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}?page=${pageNumber}&limit=10`);
      const jsonResponse = await response.json();

      console.log(jsonResponse.data.data)
      // Ensure we correctly extract product list
      const productList = Array.isArray(jsonResponse.data.data)
        ? jsonResponse.data.data
        : [];


      if (!Array.isArray(productList)) {
        console.error("Unexpected response format", jsonResponse);
        setLoading(false);
        return;
      }
      setFilteredData(productList);

      const newData = isRefreshing ? productList : [...data, ...productList];
      setData(newData);
      setFilteredData(newData);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = () => {
    // if (!loading) fetchData(page + 1);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // await fetchData(1, true);
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // const renderItem = useCallback(({ item }: { item: any }) => <RenderItem item={item} />, []);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={() => {
          return (<Text>HI</Text>)
        }}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color="blue" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f9fa",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "gray",
  },
});

export default RNScreen;
