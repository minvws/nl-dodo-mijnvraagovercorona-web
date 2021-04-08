/** @jsx jsx */
import React, { useRef } from 'react';
import { jsx, Styled, Box } from 'theme-ui';

import { useTranslation, Link } from '@quarantaine/common';

interface CardProps {
	title: string;
	href: string;
	image: string;
	external?: boolean;
	imagePosition: {
		backgroundPositionX?: string;
		backgroundPositionY?: string;
	};
}

export const Card: React.FC<CardProps> = ({
	title,
	href,
	image,
	imagePosition,
	external,
}) => {
	const linkElement = useRef<HTMLAnchorElement>(null);
	const { t } = useTranslation();
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
				paddingRight: '13px',
				backgroundImage: `url(${image})`,
				backgroundRepeat: 'no-repeat',
				...imagePosition,
				cursor: 'pointer',
				maxWidth: 'widgetMaxWidth',
			}}
			onClick={handleClick}
		>
			<Styled.h3
				sx={{
					color: 'secondaryHeader',
				}}
			>
				{title}
			</Styled.h3>

			<Link href={href} ref={linkElement} external={external}>
				{t('general__more_information')}
			</Link>
		</Box>
	);
};
