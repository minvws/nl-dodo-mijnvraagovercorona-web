/** @jsx jsx */
import { jsx } from 'theme-ui';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import React from 'react';
import '@reach/dialog/styles.css';

interface DialogProps {
	closeDialog: () => void;
	isVisible: boolean;
	title: string;
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
				background: 'rgba(1, 104, 155, 0.7)',
				paddingRight: [0, '300px', '400px'],
				paddingTop: [0, '67px'],
				p: {
					fontSize: ['bodyMobile', 'body'],
					lineHeight: ['bodyMobile', 'body'],
				},
			}}
		>
			<DialogContent
				sx={{
					width: '100%',
					maxWidth: '434px',
					height: ['100%', 'auto'],
					borderRadius: [0, '20px'],
					color: 'header',
					marginTop: ['auto', '168px'],
				}}
			>
				<button
					className="close-button"
					onClick={closeDialog}
					sx={{
						background: 'url("/icons/Close.svg")',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '18px 18px',
						backgroundPosition: 'right top',
						border: 'none',
						float: 'right',
						height: '18px',
						width: '18px',
						marginTop: '-12px',
						marginRight: '-15px',
					}}
				>
					<VisuallyHidden>Close</VisuallyHidden>
				</button>
				<h2>{title}</h2>
				{children}
			</DialogContent>
		</DialogOverlay>
	);
};
