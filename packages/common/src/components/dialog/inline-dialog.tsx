/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Dialog } from './dialog';
import { Link } from '../link';
import { QuestionIcon } from '../../icons/question';
import React, { useState } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { useSanitySiteSettings } from '@quarantaine/common';

export const InlineDialog: React.FC<{ title: string; buttonText: string }> = ({
	buttonText,
	title,
	children,
}) => {
	const siteSettings = useSanitySiteSettings();
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			<Link
				as="button"
				onClick={() => setIsVisible(true)}
				sx={{
					textDecoration: 'none !important',
					'.chevron': {
						display: 'none',
					},
					svg: {
						fill: 'currentColor',
					},
				}}
				type="button"
			>
				<span
					sx={{
						backgroundImage:
							'linear-gradient(to right, currentColor 60%, rgba(255,255,255,0) 0%)',
						backgroundPosition: 'center bottom 3px',
						backgroundSize: '6px 1px',
						backgroundRepeat: 'repeat-x',
					}}
				>
					{buttonText}
				</span>{' '}
				<QuestionIcon />
				<VisuallyHidden>
					({siteSettings.accessibility.labelModal})
				</VisuallyHidden>
			</Link>
			<Dialog
				closeDialog={() => setIsVisible(false)}
				isVisible={isVisible}
				title={title}
			>
				{children}
			</Dialog>
		</>
	);
};
