import React, { createContext, useContext, useReducer } from 'react';

// prepare the daya layer
export const StateContext = createContext();

// Wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <>
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StateContext.Provider>
    </>
  );
};

// PUll the information from the data layer
export const useStateValue = () => useContext(StateContext);
