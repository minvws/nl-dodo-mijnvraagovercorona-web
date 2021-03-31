/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import {
	Header as HeaderComponent,
	NavigationLink,
	useSanitySiteSettings,
} from '@quarantaine/common';

type HeaderProps = {
	title: string;
	headerPrefix?: React.ReactNode;
	showRetryLink?: Boolean;
};

export const Header = ({ title, headerPrefix, showRetryLink }: HeaderProps) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<HeaderComponent title={title} headerPrefix={headerPrefix}>
			{showRetryLink && (
				<NavigationLink href="/jouw-situatie" icon="refresh">
					{siteSettings.header.opnieuw}
				</NavigationLink>
			)}
		</HeaderComponent>
	);
};
