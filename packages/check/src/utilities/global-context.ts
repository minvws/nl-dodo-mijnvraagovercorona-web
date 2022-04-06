import React from 'react';

export interface StateContext {
	startPoint: string;
	history: string[];
	setStartPoint?: (value: string) => void;
	setHistory?: (value: string[]) => void;
}

export const defaultState: StateContext = { startPoint: '', history: [] };
const GlobalContext = React.createContext<StateContext>(defaultState);

export default GlobalContext;
