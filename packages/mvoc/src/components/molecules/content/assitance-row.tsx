/** @jsxRuntime classic /
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx, Box, Styled } from 'theme-ui';

import type { PageContent } from 'pages/[locale]/index';
import {
	Retain,
	Stack,
	TheGrid,
	useSanityPageContent,
	getFeedbackUrl,
	StyledLink,
	useSanitySiteSettings,
} from '@quarantaine/common';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';

type AssistanceRowProps = {
	feedback?: boolean;
};

/**
 * This specific function will check only if the current time is between 08:00 and 18:00 on a weekday
 */
const getIsPhonenumberOpen = () => {
	const now = new Date();
	const hours = now.getHours();
	const day = now.getDay();

	const isValidHours = hours >= 8 && hours < 18;
	const isValidDay = day > 0 && day < 6;

	return isValidHours && isValidDay;
};

export const AssistanceRow = ({ feedback }: AssistanceRowProps) => {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	const [isChatOpen, setIsChatOpen] = useState(false);
	const isPhonenumberOpen = getIsPhonenumberOpen();

	const fetchChatData = async () => {
		const response = await fetch(
			'https://server.vragenovercorona.nl/client/areaStatus/BXVIVGePHOZtcUQMz2vm.json',
		);
		const json = await response.json();

		setIsChatOpen(json.isOpenToClients);
	};

	useEffect(() => {
		fetchChatData();
	}, []);

	return (
		<Retain maxWidth={[retainMaxWidth, '100%']}>
			<TheGrid minItemSize="25rem" gap={['1rem']}>
				<Box>
					<Styled.h2
						sx={{
							fontSize: ['h1Mobile', 'h1'],
							lineHeight: ['h1Mobile', 'h1'],
						}}
					>
						{page.assistance.title}
					</Styled.h2>
					<img
						src={page.assistance.image?.src || '/images/questions.svg'}
						alt=""
						sx={{
							display: ['block', feedback ? 'none' : ''],
							marginBottom: '1.25rem',
							width: '240px',
						}}
					/>
					<Styled.h3
						sx={{
							fontSize: ['h2Mobile', 'h2'],
							lineHeight: ['h2Mobile', 'h2'],
							color: 'header',
						}}
					>
						{isChatOpen
							? page.assistance.tekstWithChat
							: page.assistance.tekstWithoutChat}
					</Styled.h3>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '1.25rem',
						}}
					>
						<img src="/icons/phone.svg" alt="" />
						<Styled.a
							sx={{
								color: 'secondary',
								fontWeight: 'bold',
								textDecoration: 'none',
								fontSize: '2rem',
								margin: 0,
								padding: 0,
							}}
							href={`tel:${page.assistance.phonenumber.replace(/\D/g, '')}`}
						>
							{page.assistance.phonenumber}
						</Styled.a>
					</Box>
					{page.assistance.openingHoursPhonenumber && (
						<Styled.p>
							{page.assistance.openingHoursPhonenumber}
							{isPhonenumberOpen && (
								<>
									<br />
									<span sx={{ color: 'green' }}>{page.assistance.open}</span>
								</>
							)}
						</Styled.p>
					)}
					{page.assistance.chat && (
						<>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									marginBottom: '1.25rem',
								}}
							>
								<img src="/icons/chat.svg" alt="" />
								<Styled.a
									sx={{
										color: 'secondary',
										fontWeight: 'bold',
										textDecoration: 'none',
										fontSize: '2rem',
										margin: 0,
										padding: 0,
									}}
									href="https://chat.vragenovercorona.nl/"
								>
									{page.assistance.chat}
								</Styled.a>
							</Box>
							<Styled.p sx={{ marginBottom: 0 }}>
								{page.assistance.openingHours}
								{isChatOpen && (
									<>
										<br />
										<span sx={{ color: 'green' }}>{page.assistance.open}</span>
									</>
								)}
							</Styled.p>
						</>
					)}
				</Box>
				{feedback && (
					<Box>
						<img
							src={page.assistance.image?.src || '/images/questions.svg'}
							alt=""
							sx={{
								marginInlineEnd: 'auto',
								marginInlineStart: 'auto',
								display: ['none', 'block'],
							}}
						/>
						<Styled.h3
							sx={{
								fontSize: ['h2Mobile', 'h2'],
								fontWeight: 'bold',
								color: 'header',
								marginTop: '1.25rem',
							}}
						>
							{page.assistance.situationQuestion}
						</Styled.h3>
						<StyledLink
							styledAs="button"
							external
							href={getFeedbackUrl(siteSettings.feedback.url, {
								source: 'home',
								advice: 'home',
							})}
						>
							{page.assistance.situationButton}
						</StyledLink>
					</Box>
				)}
			</TheGrid>
		</Retain>
	);
};
