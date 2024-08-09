import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurants } from '../store/restaurantsSlice';
import { RootState } from '../store/store';

const RestaurantList = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const restaurantNames = useSelector((state: RootState) => state.restaurants.names);

  const { width } = useWindowDimensions();

  useEffect(() => {
    fetch('http://10.0.2.2:3000/restaurants')
      .then(response => response.json())
      .then(data => dispatch(setRestaurants(data)))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={[styles.item, { width: width - 32 }]}>
            <Text style={styles.itemText}>{item}</Text>
            <Button
              title="Review"
              onPress={() => navigation.navigate('Review', { restaurant: item })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', 
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1, 
  },
  itemText: {
    fontSize: 16,
    flex: 1, 
  },
});

export default RestaurantList;
