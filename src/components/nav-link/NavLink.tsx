/** @jsx jsx */
import React from 'react';
import { Link } from 'components/link';
import { jsx, Link as ThemeLink } from 'theme-ui';

type NavLinkProps = NavLinkWithHrefProps & NavLinkWithOnClickProps;

interface NavLinkWithHrefProps {
	href?: Object | string;
	icon: 'refresh' | 'back';
	children: React.ReactNode;
}

interface NavLinkWithOnClickProps {
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
	icon: 'refresh' | 'back';
	children: React.ReactNode;
}

const LinkWrapper: React.FC<{
	href?: Object | string;
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ href, onClick, children }) =>
	href ? (
		<Link href={href} passHref>
			{children}
		</Link>
	) : (
		<span
			onClick={onClick}
			sx={{
				cursor: 'pointer',
			}}
		>
			{children}
		</span>
	);

export const NavLink: React.FC<NavLinkProps> = ({
	href,
	onClick,
	icon,
	children,
}) => (
	<LinkWrapper href={href} onClick={onClick}>
		<ThemeLink
			sx={{
				position: 'absolute',
				top: '30px',
				textDecoration: 'none',
				fontFamily: 'body',
				verticalAlign: 'top',
				color: 'copyHeading',
				fontWeight: 700,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				'::before': {
					display: 'block',
					content: '""',
					...(icon === 'refresh'
						? {
								backgroundImage: `url("/icons/Refresh.svg")`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: '1.5em 1.5em',
						  }
						: {}),
					...(icon === 'back'
						? {
								backgroundImage: `url("/icons/Back Arrow Small.svg")`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: '1em 1em',
								backgroundPositionY: 'center',
						  }
						: {}),
					height: '1.5em',
					width: '1.5em',
					paddingRight: '0.5em',
				},
			}}
		>
			{children}
		</ThemeLink>
	</LinkWrapper>
);
