/** @jsx jsx */
import React from 'react';
import { Container, Box, Styled, Text, jsx } from 'theme-ui';

export interface DatepickerTopbarTitleProps {
	title: string;
	subtitle?: string;
}

export const DatepickerTopbarTitle = ({
	title,
	subtitle,
}: DatepickerTopbarTitleProps) => (
	<>
		<Styled.h2
			sx={{
				fontSize: ['20px', '20px'],
				marginBottom: 0,
				color: 'white',
				fontWeight: 'normal',
			}}
		>
			{title}
		</Styled.h2>
		{subtitle && (
			<Text
				sx={{
					fontSize: '18px',
					marginTop: '2px',
				}}
			>
				{subtitle}
			</Text>
		)}
	</>
);

export const DatepickerBacklinkWrapper: React.FC = ({ children }) => (
	<Box
		sx={{
			position: 'absolute',
			left: 0,
			top: '50%',
			transform: 'translateY(-50%)',
			color: 'white',
			a: {
				color: 'white',
				':hover, :focus': {
					color: 'white',
					'.chevron': {
						transform: 'rotate(180deg) translate3d(4px, 0, 0)',
					},
				},
				'.chevron': {
					transform: 'rotate(180deg) translate3d(0, 0, 0)',
					width: '20px',
				},
			},
		}}
	>
		{children}
	</Box>
);

export const DatepickerTopbar: React.FC = ({ children }) => {
	return (
		<Container
			sx={{
				backgroundColor: 'roHighlight',
				textAlign: 'center',
				color: 'white',
				paddingTop: '0.1em',
				paddingX: ['17px'],
				maxWidth: '100%',
			}}
		>
			<Box
				sx={{
					maxWidth: 'container',
					margin: '0 auto',
					position: 'relative',
					padding: '14px 0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				{children}
			</Box>
		</Container>
	);
};
