import React from 'react';

export interface StateContext {
	startPoint: string;
	setStartPoint?: (value: string) => void;
}

export const defaultState = { startPoint: '/' };
const GlobalContext = React.createContext<StateContext>(defaultState);

export default GlobalContext;
