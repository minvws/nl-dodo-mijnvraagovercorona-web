/** @jsx jsx */
import React, { useRef } from 'react';
import { jsx, Box } from 'theme-ui';

import { InternalLink, ExternalLink } from 'components/Links';
import { useTranslation } from 'hooks/use-translation';

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
				backgroundImage: `url(${image})`,
				backgroundRepeat: 'no-repeat',
				...imagePosition,
				cursor: 'pointer',
				maxWidth: 'widgetMaxWidth',
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
				{title}
			</h3>
			{!external ? (
				<InternalLink href={href} ref={linkElement}>
					{t('general__more_information')}
				</InternalLink>
			) : (
				<ExternalLink href={href} ref={linkElement}>
					{t('general__more_information')}
				</ExternalLink>
			)}
		</Box>
	);
};
