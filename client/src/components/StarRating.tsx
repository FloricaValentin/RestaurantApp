import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Icon
            name={star <= rating ? 'star' : 'star-o'}
            size={30}
            color="gold"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
      <Text style={styles.ratingText}>{rating} / 5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
});

export default StarRating;
