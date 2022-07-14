/** @jsx jsx */
import React from 'react';
import { Image, jsx } from 'theme-ui';
import { keyframes } from '@emotion/react';
import { TheGrid, ChevronIcon } from '@quarantaine/common';

interface ItemProps {
	label: string;
	href: string;
	image?: string;
}
interface OwnProps {
	items: ItemProps[];
	as?: 'ol' | 'ul';
}

const bounce = keyframes({
	'0%': { transform: 'translateY(0) rotate(90deg)' },
	'25%': { transform: 'translateY(2px) rotate(90deg)' },
	'75%': { transform: 'translateY(-2px) rotate(90deg)' },
	'100%': { transform: 'translateY(0) rotate(90deg)' },
});

export const ListAnchor: React.FC<OwnProps> = ({ items, as = 'ul' }) => {
	return (
		<TheGrid
			as={as}
			gap={['1rem']}
			minItemSize="19rem"
			styles={{
				counterReset: 'list-anchor-counter',
			}}
		>
			{items.map((item, index) => (
				<li
					key={index}
					sx={{ display: 'flex', counterIncrement: 'list-anchor-counter' }}
				>
					<a
						href={item.href}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
							inlineSize: '100%',
							paddingBlock: ['0.75rem', '1rem'],
							paddingInline: ['1rem'],
							borderRadius: '5px',
							border: 'tile',
							boxShadow: 'tile',
							outline: 'none',
							fontFamily: 'heading',
							fontSize: ['buttonMobile', 'button'],
							textDecoration: 'none',
							color: 'primary',
							backgroundColor: 'white',
							'.chevron': {
								transition: 'transform',
							},
							':hover, :focus': {
								border: 'tileInteraction',
								boxShadow: 'tileInteraction',
								backgroundColor: 'white',
								'.chevron': {
									animation: `${bounce} 1s infinite linear`,
								},
							},
						}}
					>
						{item.image ? (
							<Image
								src={item.image}
								alt=""
								sx={{
									blockSize: '1.75rem',
									aspectRatio: '1/1',
									objectFit: 'contain',
								}}
							/>
						) : as === 'ol' ? (
							<span
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									blockSize: '1.75rem',
									aspectRatio: '1/1',
									borderRadius: '50%',
									textAlign: 'center',
									backgroundColor: 'header',
									color: 'white',
									'&:before': { content: 'counter(list-anchor-counter)' },
								}}
							/>
						) : null}
						<span
							sx={{ flex: 'auto', inlineSize: '0%', maxInlineSize: 'none' }}
						>
							{item.label}
						</span>
						<ChevronIcon
							className="chevron"
							sx={{
								inlineSize: '1.1875rem',
								aspectRatio: '1/1',
								color: 'secondary',
								transform: 'rotate(90deg)',
							}}
						/>
					</a>
				</li>
			))}
		</TheGrid>
	);
};
