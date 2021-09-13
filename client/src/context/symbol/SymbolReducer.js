import {
    GET_SYMBOLS,
    SYMBOLS_ERROR,
    SET_LOADING,
    REMOVE_LOADING,
    REMOVE_FILTERS,
    SET_SINGLE_FILTER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SYMBOLS:
            const date = new Date();
            return {
                ...state,
                symbols: action.payload,
                loading: false,
                error: null,
                date: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            };
        case SYMBOLS_ERROR:
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        case REMOVE_FILTERS:
            return {
                ...state,
                filters: action.payload,
                hasFilter: false,
                filterDate: null,
            };
        case SET_SINGLE_FILTER:
            return {
                ...state,
                filters: { ...state.filters, [action.payload.key]: action.payload.value},
                hasFilter: true,
                filterDate: new Date()
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case REMOVE_LOADING:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}