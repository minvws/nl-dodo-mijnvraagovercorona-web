/** @jsx jsx */
import React, { useState } from 'react';
import slugify from 'slugify';
import { Styled, jsx, Flex, Image } from 'theme-ui';
import {
	ContentBlock,
	getHrefWithlocale,
	useCurrentLocale,
	ExpansionPanel,
	Stack,
	StyledLink,
	TheGrid,
	useSanitySiteSettings,
} from '@quarantaine/common';
import { ThemeCollectionProps } from 'utilities/theme';
import { SiteSettings } from 'content/site-settings';
import { QuestionCollectionProps } from 'utilities/question';

export const ThemeOverview: React.FC<ThemeCollectionProps> = ({
	themeCollection,
}) => {
	const siteSettings = useSanitySiteSettings<SiteSettings>();

	return (
		<TheGrid minItemSize="24rem" gap={['3rem', '3.75rem']}>
			{themeCollection?.map((theme) => (
				<Stack
					id={`thema-${slugify(theme.title, {
						strict: true,
						lower: true,
					})}`}
					key={theme.title}
				>
					<Flex sx={{ alignItems: 'center', gap: '1.5rem' }}>
						<Image
							src={theme.icon.src}
							alt=""
							sx={{
								flex: '0 0 auto',
								inlineSize: '4rem',
								blockSize: '4.5rem',
								objectFit: 'contain',
							}}
						/>
						<Flex
							sx={{
								flex: 'auto',
								inlineSize: '0%',
								alignItems: 'center',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
							}}
						>
							<Styled.h3
								sx={{
									marginBlock: 0,
									fontSize: ['h2Mobile', 'h2'],
									lineHeight: ['h2Mobile', 'h2'],
								}}
							>
								{theme.title}
							</Styled.h3>
							{theme.questionCollection ? (
								<div sx={{ color: 'primary' }}>
									{theme.questionCollection.length > 1
										? `${theme.questionCollection.length} ${siteSettings.situationPlural.that}`
										: `${theme.questionCollection.length} ${siteSettings.situationPlural.this}`}
								</div>
							) : null}
						</Flex>
					</Flex>

					{theme.questionCollection ? (
						<QuestionList questionCollection={theme.questionCollection} />
					) : null}
				</Stack>
			))}
		</TheGrid>
	);
};

const QuestionList: React.FC<QuestionCollectionProps> = ({
	questionCollection,
}) => {
	const siteSettings = useSanitySiteSettings<SiteSettings>();
	const locale = useCurrentLocale();
	if (!questionCollection.length) return null;

	const [panelState, setPanelState] = useState('close');

	const split = 3;

	// Split items into 2 groups
	const firstGroup = questionCollection.slice(
		0,
		split ? split : questionCollection.length,
	);
	const secondGroup = questionCollection.slice(
		split ? split : questionCollection.length,
		questionCollection.length,
	);
	return (
		<Stack spacing={['1rem']}>
			{firstGroup.map((item, index) => (
				<StyledLink
					styledAs="button-tile"
					key={index}
					href={getHrefWithlocale(`/${item.path}`, locale.id)}
				>
					<ContentBlock content={item.title} />
				</StyledLink>
			))}
			{secondGroup.length ? (
				<ExpansionPanel
					title={
						panelState === 'open'
							? `${siteSettings.seeMoreExpand.that} ${siteSettings.situationPlural.that}`
							: secondGroup.length > 1
							? `${siteSettings.seeMoreExpand.this} ${secondGroup.length} ${siteSettings.situationPlural.that}`
							: `${siteSettings.seeMoreExpand.this} ${secondGroup.length} ${siteSettings.situationPlural.this}`
					}
					variant="plusinline"
					toggleEvent={(value: string) => setPanelState(value)}
				>
					<Stack spacing={['1rem']}>
						{secondGroup.map((item, index) => (
							<StyledLink
								styledAs="button-tile"
								key={index}
								href={getHrefWithlocale(`/${item.path}`, locale.id)}
							>
								<ContentBlock content={item.title} />
							</StyledLink>
						))}
					</Stack>
				</ExpansionPanel>
			) : null}
		</Stack>
	);
};
