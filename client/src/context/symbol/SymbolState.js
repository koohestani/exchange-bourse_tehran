import React, { useReducer } from 'react';
import axios from 'axios';

import SymbolContext from './SymbolContext';
import SymbolReducer from './SymbolReducer';

import {
    GET_SYMBOLS,
    SYMBOLS_ERROR,
    REMOVE_FILTERS,
    SET_SINGLE_FILTER
} from '../types';


const ContactState = props => {
    const initialState = {
      symbols: null,
      current: null,
      error: null,
      loading: true,
      date: null,
      hasFilter: false,
      filterDate: null,
      filters: {
        upClosePrice: undefined,
        downClosePrice: undefined,
        upFinalPrice: undefined,
        downFinalPrice: undefined,
        finalExpClose: undefined,
        powerPrice: undefined,
        coSellVolume: undefined,
        buyVolumeRatioBasis: undefined,
        sellVolumeRatioBasis: undefined,
        coVolumeRatioBasis: undefined,
        volumeRatioBasis: undefined
      },
    };
  
    const [state, dispatch] = useReducer(SymbolReducer, initialState);
  
    // Get Contacts
    const getSymbols = async () => {
      try {
        const { data } = await axios.get('/api/symbols');
        if (Object.values(data).indexOf("Error") === -1)
          dispatch({
            type: GET_SYMBOLS,
            payload: Object.values(data)
          });
      } catch (err) {
        dispatch({
          type: SYMBOLS_ERROR,
          payload: 'ارتباط با سرور دچار مشکل شده است. دیتاها به روز رسانی نمی شوند.'
        });
      }
    };

    const setSingleFilter = filter => {
      dispatch({
        type: SET_SINGLE_FILTER,
        payload: filter
      });
    };

    const removeFilters = () => {
      dispatch({
        type: REMOVE_FILTERS,
        payload: {
          upClosePrice: undefined,
          downClosePrice: undefined,
          upFinalPrice: undefined,
          downFinalPrice: undefined,
          finalExpClose: undefined,
          powerPrice: undefined,
          coSellVolume: undefined,
          buyVolumeRatioBasis: undefined,
          sellVolumeRatioBasis: undefined,
          coVolumeRatioBasis: undefined,
          volumeRatioBasis: undefined
        }
      });
    };
  
    return (
      <SymbolContext.Provider
        value={{
          symbols: state.symbols,
          current: state.current,
          filters: state.filters,
          error: state.error,
          loading: state.loading,
          date: state.date,
          hasFilter: state.hasFilter,
          filterDate: state.filterDate,
          getSymbols,
          setSingleFilter,
          removeFilters,
        }}
      >
        {props.children}
      </SymbolContext.Provider>
    );
  };
  
  export default ContactState;
  