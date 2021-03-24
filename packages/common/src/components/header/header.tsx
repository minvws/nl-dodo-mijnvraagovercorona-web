/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

import {
	BodyContainer,
	Logo,
	useSanitySiteSettings,
	LocaleSelector,
} from '@quarantaine/common';

type HeaderProps = {
	title: string;
	headerPrefix?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
	title,
	headerPrefix,
	children,
}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<header
			sx={{
				backgroundColor: 'headerBackground',
				color: 'header',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right top',
				paddingBottom: '28px',
			}}
		>
			<LocaleSelector />
			<Logo alt={siteSettings.header.logoAlt} />
			<BodyContainer>
				{children}

				{headerPrefix && (
					<span
						sx={{
							fontSize: 'chapeau',
							fontWeight: 'bold',
							color: 'smallText',
							marginBottom: '25px',
							display: 'block',
							maxWidth: '60%',
						}}
					>
						{headerPrefix}
					</span>
				)}

				<Styled.h1
					sx={{
						marginTop: 0,
						marginBottom: 0,
						width: ['80%', '60%'],
					}}
				>
					{title}
				</Styled.h1>
			</BodyContainer>
		</header>
	);
};
