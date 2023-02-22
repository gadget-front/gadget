import { combineReducers, configureStore } from '@reduxjs/toolkit';
import spaceSlice from '../slice/slice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const reducers = combineReducers({
  space : spaceSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage ,
  whitelist: ['space']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer : persistedReducer,
})

export default store;