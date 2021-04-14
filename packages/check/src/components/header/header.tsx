/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import {
	Header as HeaderComponent,
	NavigationLink,
	useSanitySiteSettings,
} from '@quarantaine/common';

type HeaderProps = {
	showRetryLink?: Boolean;
};

export const Header = ({ showRetryLink }: HeaderProps) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<HeaderComponent>
			{showRetryLink && (
				<NavigationLink href="/" icon="refresh">
					{siteSettings.header.opnieuw}
				</NavigationLink>
			)}
		</HeaderComponent>
	);
};
