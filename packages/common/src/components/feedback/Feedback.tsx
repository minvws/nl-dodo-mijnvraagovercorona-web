/** @jsx jsx */
import { Box, jsx, Styled } from 'theme-ui';

import { useSanitySiteSettings, Link } from '@quarantaine/common';

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
			<Link styledAs="button" href={siteSettings.feedback.url} external>
				{siteSettings.feedback.button}
			</Link>
		</Box>
	);
};
