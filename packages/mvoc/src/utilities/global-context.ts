import React from 'react';

export interface StateContext {
	history: string[];
	setHistory?: (value: string[]) => void;
}

export const defaultState: StateContext = { history: [] };
const GlobalContext = React.createContext<StateContext>(defaultState);

export default GlobalContext;
