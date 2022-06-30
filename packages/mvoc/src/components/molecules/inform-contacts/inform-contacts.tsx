/** @jsx jsx */
import {
	ContentBlock,
	getHrefWithlocale,
	isBrowser,
	StyledLink,
	useCurrentLocale,
} from '@quarantaine/common';
import React, { useEffect, useState } from 'react';
import { jsx, Box, Styled } from 'theme-ui';
import useCopyToClipboard from 'utilities/use-copy-to-clipboard';
import { Situation } from 'config/situaties';

export type InformContactsProps = {
	title: string;
	preButtonContent?: Object[];
	steps?: {
		title: string;
		content: Object[];
		points?: {
			title: string;
			content: Object[];
		}[];
	}[];
	buttons: {
		situation: string;
		copyButton: {
			label: string;
			labelCopied: string;
		};
		shareButton: {
			label: string;
			message: string;
		};
	};
	url: string;
};

const bulletSize = '1.75rem';

export const InformContacts: React.FC<InformContactsProps> = ({
	title,
	preButtonContent,
	steps,
	buttons,
}) => {
	const locale = useCurrentLocale();
	const [canShare, setCanShare] = useState(false);
	const [value, copy] = useCopyToClipboard();
	const shareLink = `${
		isBrowser() ? window.location.origin : 'https://mijnvraagovercorona.nl'
	}/${getHrefWithlocale(buttons.situation || '#situaties', locale.id)}`;

	const triggerShareDialog = () => {
		if (isBrowser()) {
			window.navigator
				.share({
					title: buttons.shareButton.message,
					url: shareLink,
				})
				.catch(() => {
					return;
				});
		}
	};

	useEffect(() => {
		if (isBrowser()) setCanShare('share' in window.navigator);
	}, []);

	return (
		<Box>
			<Styled.h2>{title}</Styled.h2>
			{steps ? (
				<ol
					sx={{
						margin: 0,
						padding: 0,
						paddingInlineStart: 0,
						listStyle: 'none',
						counterReset: 'customList',
					}}
				>
					{steps.map((step) => (
						<li
							key={step.title}
							sx={{
								position: 'relative',
								paddingLeft: '2.5rem',
								counterIncrement: 'customList',

								'&::before': {
									content: '""',
									position: 'absolute',
									width: '2px',
									backgroundColor: 'secondary',
									left: `calc(${bulletSize} / 2 - 1px)`,
									top: bulletSize,
									bottom: `-${bulletSize}`,
								},

								'&:last-child::before': {
									width: 0,
								},

								'&::after': {
									content: 'counter(customList)',
									position: 'absolute',
									display: 'flex',
									justifyContent: 'center',
									placeItems: 'center',
									top: '0',
									left: '0',
									borderRadius: '50%',
									backgroundColor: 'secondary',
									color: 'white',
									width: bulletSize,
									height: bulletSize,
									fontWeight: 'bold',
								},
							}}
						>
							<Styled.h3
								sx={{
									color: 'secondary',
									fontSize: '1.1875rem',
									marginBlockStart: '0',
									// adjust heading with bullet
									paddingBlockStart: '0.1875rem',
								}}
							>
								{step.title}
							</Styled.h3>
							<ContentBlock content={step.content} />
							{step.points ? (
								<ul
									sx={{
										listStyleImage: 'url(/images/bullet.svg)',
									}}
								>
									{step.points.map((point) => (
										<li key={point.title}>
											<Styled.h4
												sx={{
													color: 'copyHeading',
													fontSize: '1.1875rem',
													marginBlockEnd: '0.25rem',
												}}
											>
												{point.title}
											</Styled.h4>
											<ContentBlock content={point.content} />
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ol>
			) : null}
			{preButtonContent ? <ContentBlock content={preButtonContent} /> : null}
			{canShare ? (
				<StyledLink
					as="button"
					styledAs="button-tertiary"
					onClick={() => triggerShareDialog()}
				>
					{buttons.shareButton.label}
				</StyledLink>
			) : (
				<StyledLink
					as="button"
					styledAs="button-tertiary"
					onClick={() => copy(shareLink)}
				>
					{value ? buttons.copyButton.labelCopied : buttons.copyButton.label}
				</StyledLink>
			)}
		</Box>
	);
};
