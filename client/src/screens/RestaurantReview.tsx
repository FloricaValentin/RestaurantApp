import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from '../components/StarRating';

const RestaurantReview = ({ route, navigation }: any) => {
  const { restaurant } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = async () => {
    if (rating === 0 || !review) {
      Alert.alert('Error', 'Please provide both rating and review.');
      return;
    }
    try {
      const key = `${restaurant}-${Date.now()}`;
      const reviewData = { rating, review };
      await AsyncStorage.setItem(key, JSON.stringify(reviewData));
      setRating(0);
      setReview('');
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      console.error('Error saving review:', error);
      Alert.alert('Error', 'There was an error saving your review.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>{restaurant}</Text>
        <StarRating rating={rating} setRating={setRating} />
        <TextInput
          style={styles.input}
          placeholder="Write your review"
          value={review}
          onChangeText={setReview}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit Review" onPress={handleSubmit} color="#007BFF" />
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            title="View Reviews"
            onPress={() => navigation.navigate('ReviewList', { restaurant })}
            color="#6c757d"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 30,  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    textAlignVertical: 'top',
    marginTop: 15
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bottomButtonContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 20, 
  },
});

export default RestaurantReview;
