import { useId } from '@reach/auto-id';
import React, { useContext, useState } from 'react';

interface ExpansionPanelGroupContextState {
	expandedPanel?: string;
	setExpandedPanel?: (panelId: string) => void;
}
const ExpansionPanelGroupContext = React.createContext(
	{} as ExpansionPanelGroupContextState,
);

/**
 * Uses the group state, exposes an object containing:
 * expandedPanel - current expanded panel id
 * setExpandedPanel - set method to change the expanded panel id.
 *
 * Note: If the panel is NOT wrapped inside an expansion panel group,
 * this will return an empty object. Use this to check whether the panel
 * should be controlled via a group.
 */
export const useExpansionPanelGroup = () =>
	useContext(ExpansionPanelGroupContext);

/**
 * Generates a unique ID for each panel.
 */
export const useExpansionPanelId = () => {
	const id = useId();
	return `panel-${id}`;
};

/**
 * This component wraps multiple panels inside a context. All panels inside
 * this context will send their id to this context when expanded.
 * The expansion panel component will react to this expanded panel id and collapse
 * itself if another panel is opened.
 */
export const ExpansionPanelGroup: React.FC = ({ children }) => {
	const [expandedPanel, setExpandedPanel] = useState<string>();
	return (
		<ExpansionPanelGroupContext.Provider
			value={{ expandedPanel, setExpandedPanel }}
		>
			{children}
		</ExpansionPanelGroupContext.Provider>
	);
};
