import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from '../components/StarRating'; 
import { ScrollView } from 'react-native-gesture-handler';

const ReviewList = ({ route }: any) => {
  const { restaurant } = route.params; 
  const [reviews, setReviews] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(`Fetching reviews for: ${restaurant}`);
        
        const keys = await AsyncStorage.getAllKeys();
        
        const reviewsForRestaurant = keys.filter(key => key.startsWith(restaurant));
        
        const reviewPromises = reviewsForRestaurant.map(key => AsyncStorage.getItem(key));
        const reviewData = await Promise.all(reviewPromises);
        console.log('Review data:', reviewData); 
        
        const parsedReviews = reviewData.map(data => data ? JSON.parse(data) : null).filter(review => review !== null);
        setReviews(parsedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [restaurant]);

  return (
    <ScrollView style={styles.container}>
      {reviews.length === 0 ? (
        <Text>No reviews available</Text>
      ) : (
        reviews.map((review, index) => (
          <View key={index} style={styles.review}>
            <StarRating rating={review.rating} setRating={function (rating: number): void {
                    throw new Error('Function not working.');
                } } />
            <Text>Review: {review.review}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 30,
  },
  review: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ReviewList;
