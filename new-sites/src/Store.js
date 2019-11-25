import { h, render } from 'preact';
import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const intitialState = {
    format: 'video',
    device: 'desktop',
    vertId: 'test_tall_single',
    size: 'landscape'
}

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORMAT':
            return { ...state, format: action.payload }
        case 'UPDATE_DEVICE':
            return { ...state, device: action.payload } 
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, intitialState);
    const value = { state, dispatch };

    return (
        <Store.Provider value={value}>
            { props.children}
        </Store.Provider>
    )
}