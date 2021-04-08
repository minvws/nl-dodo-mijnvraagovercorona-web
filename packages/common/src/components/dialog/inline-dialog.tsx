/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Dialog } from './dialog';
import { Link } from '../link';
import { QuestionIcon } from '../../icons/question';
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
					'.chevron': {
						display: 'none',
					},
					svg: {
						fill: 'currentColor',
					},
				}}
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
