/** @jsx jsx */
import { Box, Button, jsx, Styled, SxStyleProp } from 'theme-ui';

import {
	useSanitySiteSettings,
	trackEvent,
	ScreenReaderOnly,
	ThumbIcon,
	Link,
} from '@quarantaine/common';
import { useState } from 'react';

interface OwnProps {
	likeEventName: string;
	dislikeEventName: string;
	feedbackUrl: string;
}

export const LikeOrDislike: React.FC<OwnProps> = ({
	likeEventName,
	dislikeEventName,
	feedbackUrl,
}) => {
	const siteSettings = useSanitySiteSettings();
	const [showFeedback, setShowFeedback] = useState<boolean>(false);
	const [feedback, setFeedback] = useState<'like' | 'dislike' | undefined>(
		undefined,
	);

	const buttonStyles: SxStyleProp = {
		paddingTop: '15px',
		paddingBottom: '15px',
		paddingRight: 'buttonPadding',
		paddingLeft: 'buttonPadding',
		margin: '0',
		borderRadius: '5px',
		display: 'inline-block',
		textDecoration: 'none',
		border: '1px solid currentColor',
		minHeight: 'buttonHeight',
		fontSize: ['buttonMobile', 'button'],
		fontFamily: 'heading',
		backgroundColor: 'white',
		color: 'button',
		transitionProperty: 'background-color color border-color',
		transitionDuration: '300ms',
		transitionTimingFunction: 'ease-in-out',
		textAlign: 'center',

		':hover, :focus': {
			backgroundColor: 'button',
			color: 'white',
			borderColor: 'button',
		},
	};

	return (
		<Box>
			<h2
				sx={{
					color: 'header',
					fontSize: ['h2Mobile', 'h2'],
				}}
			>
				{siteSettings.feedback.title}
			</h2>
			<Styled.p>{siteSettings.feedback.content}</Styled.p>
			<Box sx={{ display: 'flex', gap: '1em' }}>
				<Button
					sx={buttonStyles}
					onClick={() => {
						if (!feedback) {
							setShowFeedback(true);
							setFeedback('like');
							trackEvent('Button', 'Click', likeEventName);
						}
					}}
				>
					<ThumbIcon
						sx={{
							display: 'block',
							height: '1.26em',
							width: '1.26em',
						}}
					/>
					<ScreenReaderOnly>Ja</ScreenReaderOnly>
				</Button>
				<Button
					sx={buttonStyles}
					onClick={() => {
						if (!feedback) {
							setShowFeedback(true);
							setFeedback('dislike');
							trackEvent('Button', 'Click', dislikeEventName);
						}
					}}
				>
					<ThumbIcon
						sx={{
							display: 'block',
							height: '1.26em',
							width: '1.26em',
							transform: 'rotate(-180deg)',
						}}
					/>
					<ScreenReaderOnly>Nee</ScreenReaderOnly>
				</Button>
			</Box>
			{showFeedback && (
				<Box
					sx={{
						backgroundColor: 'buttonSecondary',
						padding: '16px',
						borderRadius: '5px',
						marginTop: '16px',
					}}
				>
					<Styled.p sx={{ marginBottom: '16px' }}>
						Bedankt voor je reactie. Je zou ons enorm helpen als je met een paar
						anonieme vragen wilt vertellen wat je van deze website vindt.
					</Styled.p>
					<Link
						styledAs="button"
						href={`${feedbackUrl}&feedback=${feedback}`}
						external
					>
						{siteSettings.feedback.button}
					</Link>
				</Box>
			)}
		</Box>
	);
};
