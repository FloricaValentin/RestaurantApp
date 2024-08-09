import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    names: string[];
}

const initialState: RestaurantState = {
    names: [],
};

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, action: PayloadAction<string[]>) => {
            state.names = action.payload;
        },
    },
});

export const { setRestaurants } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
