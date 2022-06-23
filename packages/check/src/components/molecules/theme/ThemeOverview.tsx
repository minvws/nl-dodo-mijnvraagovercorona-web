/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
import { Styled, jsx, Flex, Image } from 'theme-ui';
import {
	ContentBlock,
	getHrefWithlocale,
	Stack,
	StyledLink,
	TheGrid,
	useCurrentLocale,
} from '@quarantaine/common';
import { ThemeCollectionProps } from 'utilities/theme';

export const ThemeOverview: React.FC<ThemeCollectionProps> = ({
	themeCollection,
}) => {
	const locale = useCurrentLocale();

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
							<div sx={{ color: 'primary' }}>
								{theme.questionCollection ? theme.questionCollection.length : 0}{' '}
								{theme.questionCollection.length > 1 ? 'situaties' : 'situatie'}
							</div>
						</Flex>
					</Flex>

					{theme.questionCollection ? (
						<Stack spacing={['1rem']}>
							{theme.questionCollection?.map(({ path, title }, index) => (
								<StyledLink
									styledAs="button-tile"
									key={index}
									href={getHrefWithlocale(`/${path}`, locale.id)}
								>
									<ContentBlock content={title} />
								</StyledLink>
							))}
						</Stack>
					) : null}
				</Stack>
			))}
		</TheGrid>
	);
};
