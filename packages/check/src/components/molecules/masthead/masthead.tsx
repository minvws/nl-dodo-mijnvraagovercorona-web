/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

export interface MastheadProps {
	headerSlot: React.ReactNode;
}

export const Masthead: React.FC<MastheadProps> = ({ headerSlot }) => {
	return (
		<div>
			{headerSlot}
			<mark>chapeau</mark>
			<mark>title</mark>
			<mark>Illustration</mark>
			<mark>children</mark>
		</div>
	);
};
