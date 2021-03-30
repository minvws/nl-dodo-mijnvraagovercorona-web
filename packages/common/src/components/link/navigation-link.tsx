/** @jsx jsx */
import React from 'react';
import { jsx, Link as ThemeLink } from 'theme-ui';

import { NavLink } from '@quarantaine/common';

type NavigationLinkProps = NavigationLinkWithHrefProps &
	NavigationLinkWithOnClickProps;

interface NavigationLinkWithHrefProps {
	href?: string;
	icon: 'refresh' | 'back';
	children: React.ReactNode;
}

interface NavigationLinkWithOnClickProps {
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
	icon: 'refresh' | 'back';
	children: React.ReactNode;
}

const LinkWrapper: React.FC<{
	href?: string;
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ href, onClick, children }) =>
	href ? (
		<NavLink href={href}>{children}</NavLink>
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

export const NavigationLink: React.FC<NavigationLinkProps> = ({
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
