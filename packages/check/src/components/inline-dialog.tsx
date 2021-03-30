/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Dialog, Link, QuestionIcon } from '@quarantaine/common';
import { useState } from 'react';

export const InlineDialog: React.FC<{ title: string; buttonText: string }> = ({
	buttonText,
	title,
	children,
}) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<Link
				as="button"
				onClick={() => setIsVisible(true)}
				sx={{
					textDecoration: 'none !important',
				}}
			>
				<span
					sx={{
						backgroundImage:
							'linear-gradient(to right, black 60%, rgba(255,255,255,0) 0%)',
						backgroundPosition: 'center bottom 3px',
						backgroundSize: '6px 1px',
						backgroundRepeat: 'repeat-x',
					}}
				>
					{buttonText}
				</span>{' '}
				<QuestionIcon />
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
