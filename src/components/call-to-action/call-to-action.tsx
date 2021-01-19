/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface CallToActionProps {
	icon?: React.FC;
}

export const CallToAction: React.FC<CallToActionProps> = ({
	children,
	icon: Icon,
}) => {
	return (
		<span
			sx={{
				backgroundImage: `url("/icons/Button Arrow.svg")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right 14px top 50%',
				border: '1px solid',
				borderColor: 'footerBackground',
				borderRadius: '11px',
				padding: '14px',
				paddingRight: '34px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start',
				textAlign: 'left',
				maxWidth: 'widgetMaxWidth',
				transition: 'background-position 300ms ease-in-out',
				':hover, :focus': {
					backgroundPosition: 'right 8px top 50%',
				},
				p: {
					fontSize: ['bodyMobile', 'body'],
					fontWeight: 'bold',
					color: 'link',
					margin: 0,
				},
			}}
		>
			{Icon && (
				<span sx={{ marginRight: '12px' }}>
					<Icon />
				</span>
			)}
			<span>{children}</span>
		</span>
	);
};
