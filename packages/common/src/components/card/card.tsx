/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { jsx, Themed, Box, Text, Flex } from 'theme-ui';

import {
	ContentBlock,
	StyledLink,
	Stack,
	ExpansionPanel,
} from '@quarantaine/common';
import slugify from 'slugify';
export interface CardProps {
	title: string;
	chapeau: string;
	content: Object[];
	disclosure: {
		label: {
			this: string;
			that: string;
		};
		content: Object[];
	};
	buttons: {
		link?: string;
		situation?: string;
		text: string;
	}[];
}

export const Card: React.FC<CardProps> = ({
	title,
	chapeau,
	content,
	disclosure,
	buttons,
	children,
}) => {
	const [panelState, setPanelState] = useState('close');
	return (
		<Box
			id={
				title &&
				slugify(title, {
					strict: true,
					lower: true,
				})
			}
			sx={{
				position: 'relative',
				padding: 'box',
				borderRadius: 'box',
				border: 'card',
				fontSize: ['bodyMobile', 'body'],
				backgroundColor: 'white',

				'*:last-child': {
					marginBlockEnd: 0,
				},
			}}
		>
			<Stack spacing={['1rem']}>
				<Flex
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: ['0.5rem'],
						// && is used to increase specificity with 1 by doubling up generated classes `.css-1o804hg.css-1o804hg`
						'&& > *': {
							marginBlockEnd: '0',
							marginBlockStart: '0',
						},
					}}
				>
					<Themed.h3
						sx={{
							order: 2,
							fontSize: ['h2Mobile', 'h2'],
							lineHeight: ['h2Mobile', 'h2'],
						}}
					>
						{title}
					</Themed.h3>
					{chapeau && (
						<Text
							variant="chapeau"
							as="p"
							sx={{ order: 1, marginBlockStart: 0 }}
							role="presentation"
						>
							{chapeau}
						</Text>
					)}
				</Flex>

				<ContentBlock content={content} />

				{disclosure.content &&
				disclosure.label.this &&
				disclosure.label.that ? (
					<ExpansionPanel
						title={
							panelState === 'open'
								? disclosure.label.that
								: disclosure.label.this
						}
						variant="plusinline"
						toggleEvent={(value: string) => setPanelState(value)}
					>
						<ContentBlock content={disclosure.content} />
					</ExpansionPanel>
				) : null}

				{!!buttons?.length ? (
					<Flex
						as="ul"
						sx={{
							flexDirection: 'column',
							gap: ['1rem'],
							listStyle: 'none',
							paddingInlineStart: 0,
						}}
					>
						{buttons.map(({ text, link, situation }) => (
							<li key={text}>
								<StyledLink
									styledAs="button"
									href={link || `/${situation}`}
									external={!!link}
								>
									{text}
								</StyledLink>
							</li>
						))}
					</Flex>
				) : null}
				{children}
			</Stack>
		</Box>
	);
};
