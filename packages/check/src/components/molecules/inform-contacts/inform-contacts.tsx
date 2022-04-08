/** @jsx jsx */
import { ContentBlock, StyledLink } from '@quarantaine/common';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import React from 'react';
import { jsx, Box, Styled } from 'theme-ui';

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
		situation: {
			url: string;
			showDate: boolean;
			showExceptions: boolean;
		};
		copyButton: {
			label: string;
			labelCopied: string;
		};
		shareButton: {
			label: string;
			message: string;
		};
	};
};

export const InformContacts: React.FC<InformContactsProps> = ({
	title,
	preButtonContent,
	steps,
	buttons,
}) => {
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
								paddingLeft: '40px',
								counterIncrement: 'customList',

								'&::before': {
									content: '""',
									position: 'absolute',
									width: '2px',
									backgroundColor: 'secondary',
									left: '13px',
									top: '24px',
									bottom: '-28px',
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
									width: '28px',
									height: '28px',
									fontWeight: 'bold',
								},
							}}
						>
							<Styled.h3 sx={{ color: 'secondary', fontSize: '19px' }}>
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
													fontSize: '19px',
													marginBottom: '4px',
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
			{
				/*navigator && navigator['share'] dit werkt niet 🤦🏻‍♂️ moet even omheen gebouwd worden */ true ? (
					<StyledLink
						styledAs="button-tertiary"
						onClick={() => console.log('test')}
					>
						{buttons.shareButton.label}
					</StyledLink>
				) : (
					<StyledLink styledAs="button-tertiary">
						{buttons.copyButton.label}
					</StyledLink>
				)
			}
		</Box>
	);
};
