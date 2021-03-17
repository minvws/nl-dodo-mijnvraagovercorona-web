/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { BodyContainer } from '@quarantaine/common';

export const Content: React.FC = ({ children }) => (
	<BodyContainer
		sx={{
			paddingTop: '65px',
			'> :first-child': { marginTop: 0 },
		}}
	>
		{children}
	</BodyContainer>
);
