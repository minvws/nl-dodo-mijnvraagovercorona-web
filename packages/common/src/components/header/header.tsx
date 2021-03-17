/** @jsx jsx */
import { jsx } from 'theme-ui';
import { BodyContainer } from '@quarantaine/common';

export const Header: React.FC = ({ children, ...props }) => {
	return (
		<header
			{...props}
			sx={{ backgroundColor: 'headerBackground', paddingBottom: '38px' }}
		>
			<BodyContainer>{children}</BodyContainer>
		</header>
	);
};
