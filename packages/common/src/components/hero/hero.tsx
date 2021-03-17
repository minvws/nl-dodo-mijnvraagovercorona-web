/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { Content } from '@quarantaine/common';

export const Hero: React.FC = ({ children }) => (
	<div
		sx={{
			backgroundColor: 'headerBackground',
			paddingBottom: '36px',
			/**
			 * If the Hero is nested INSIDE the main element, this means that not only the header has a hero,
			 * but also the page content has a hero section. The negative margin top makes sure that these two
			 * hero sections "connect" with each other.
			 */
			'main > &': {
				marginTop: '-45px',
			},
			'> div': {
				paddingTop: '18px',
			},
		}}
	>
		<Content>{children}</Content>
	</div>
);
