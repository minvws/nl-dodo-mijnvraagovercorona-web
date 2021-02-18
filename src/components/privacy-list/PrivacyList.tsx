/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type PrivacyListProps = {
	children: React.ReactNode;
};

export const PrivacyList = ({ children }: PrivacyListProps) => {
	return (
		<ul
			sx={{
				fontSize: ['bodyMobile', 'body'],
				listStyle: 'none',
				lineHeight: ['bodyMobile', 'body'],
				padding: 0,
				li: {
					'::before': {
						position: 'absolute',
						left: ['37px', '50px'],
						marginTop: '5px',
						content: '""',
						backgroundImage: 'url("/icons/Privacy Protection.svg")',
						backgroundSize: '36px 36px',
						float: 'left',
						height: '36px',
						width: '36px',
						paddingRight: '-36px',
					},
					paddingLeft: '47px',
					paddingBottom: '22px',
				},
			}}
		>
			{children}
		</ul>
	);
};
