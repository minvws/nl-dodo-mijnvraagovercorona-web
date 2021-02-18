/** @jsx jsx */
import React from 'react';
import { Box, jsx, Styled } from 'theme-ui';

import { ButtonPrimary } from 'components/button';

import { useSanitySiteSettings } from 'hooks/translation';

export const Feedback = () => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Box sx={{ paddingY: ['36px', '44px'] }}>
			<h2
				sx={{
					color: 'header',
					fontSize: ['h2Mobile', 'h2'],
				}}
			>
				{siteSettings.feedback.title}
			</h2>
			<Styled.p>{siteSettings.feedback.content}</Styled.p>
			<ButtonPrimary href={siteSettings.feedback.url} external>
				{siteSettings.feedback.button}
			</ButtonPrimary>
		</Box>
	);
};
