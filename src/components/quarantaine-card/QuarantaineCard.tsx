/** @jsx jsx */
import React, { useRef } from 'react';
import { jsx, Box } from 'theme-ui';

import { InternalLink } from 'components/Links';

export const QuarantaineCard = () => {
	const linkElement = useRef<HTMLAnchorElement>(null);
	const handleClick = () => {
		const isTextSelected:
			| string
			| undefined = window?.getSelection()?.toString();

		if (!isTextSelected) {
			linkElement?.current?.click();
		}
	};

	return (
		<Box
			sx={{
				borderRadius: '11px',
				boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
				marginBottom: '10px',
				paddingTop: '11px',
				paddingBottom: '13px',
				paddingLeft: '115px',
				backgroundImage: 'url("/images/Banner_we_helpen_jeRetina.svg")',
				backgroundRepeat: 'no-repeat',
				backgroundPositionX: '-10px',
				cursor: 'pointer',
			}}
			onClick={handleClick}
		>
			<h3
				sx={{
					color: 'secondaryHeader',
					fontSize: ['bodyMobile', 'body'],
					lineHeight: ['bodyMobile', 'body'],
				}}
			>
				Wat moet ik regelen voor mijn thuisquarantaine?
			</h3>
			<InternalLink href="/voorbereiding" ref={linkElement}>
				Meer uitleg
			</InternalLink>
		</Box>
	);
};
