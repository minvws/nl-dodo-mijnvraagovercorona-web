/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';

import '@reach/dialog/styles.css';

interface DialogProps {
	closeDialog: () => void;
	isVisible: boolean;
	title: string;
	children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
	closeDialog,
	isVisible,
	title,
	children,
}) => {
	return (
		<DialogOverlay
			aria-label={title}
			isOpen={isVisible}
			onDismiss={closeDialog}
			sx={{
				// White background color on mobile is needed because otherwise overflowing
				// content would have a blue background.
				background: ['white', 'rgba(1, 104, 155, 0.7)'],
				paddingRight: [0, '300px', '400px'],
				p: {
					fontSize: ['bodyMobile', 'body'],
					lineHeight: ['bodyMobile', 'body'],
					color: 'text',
				},
				'.close-button': {
					position: 'absolute',
					right: 20,
					top: [-10, 20],
					background: 'transparent',
					'&:focus': {
						path: {
							fill: 'button',
						},
					},
				},
			}}
		>
			<DialogContent
				sx={{
					backgroundColor: 'white',
					width: '100%',
					maxWidth: '434px',
					height: ['100%', 'auto'],
					borderRadius: [0, '20px'],
					margin: ['20px auto', '10vh auto'],
					padding: ['10px 32px', '32px'],
					color: 'header',
					position: 'relative',
					h2: {
						paddingRight: '20px',
					},
				}}
			>
				<button
					className="close-button"
					onClick={closeDialog}
					sx={{
						border: 'none',
						width: '44px',
						height: '44px',
						padding: 0,
						outline: 'none',
					}}
				>
					<svg
						aria-hidden
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16.9857 0.439346C16.3999 -0.146464 15.4501 -0.146434 14.8643 0.439346L8.7125 6.5912L2.56066 0.439365C1.97488 -0.146415 1.02515 -0.146445 0.439344 0.439365C-0.146457 1.02517 -0.146439 1.97492 0.439344 2.5607L6.59117 8.71251L0.439365 14.8643C-0.146415 15.4501 -0.146436 16.3998 0.439365 16.9857C1.02517 17.5715 1.97491 17.5714 2.56069 16.9857L8.7125 10.8338L14.8643 16.9857C15.4501 17.5715 16.3998 17.5715 16.9856 16.9857C17.5714 16.3999 17.5714 15.4501 16.9856 14.8643L10.8338 8.71251L16.9857 2.56068C17.5714 1.9749 17.5715 1.02516 16.9857 0.439346V0.439346Z"
							fill="#154273"
						/>
					</svg>

					<VisuallyHidden>Close</VisuallyHidden>
				</button>
				<h2>{title}</h2>
				{children}
			</DialogContent>
		</DialogOverlay>
	);
};
