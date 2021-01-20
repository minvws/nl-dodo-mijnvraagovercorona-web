/** @jsx jsx */
import AdviceContext from 'components/advice/AdviceContext';
import { NavLink } from 'components/nav-link';
import RoHeaderLogo from 'components/structure/RoHeaderLogo';
import { useDesktopQuery } from 'hooks/useDesktopQuery';
import { useRouter } from 'next/router';
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import BodyContainer from './BodyContainer';

type HeaderProps = {
	message: string;
	headerPrefix?: React.ReactNode;
	backgroundImage?: string;
	children?: React.ReactNode;
	showBackLink?: 'result' | 'previous' | 'retry';
};

const generateResultLink = ({
	from,
	to,
	destination,
	stage,
}: {
	from?: string;
	to?: string;
	destination?: string;
	stage?: string;
}) => ({
	pathname: `/${destination}/${stage}`,
	query: { van: from, tot: to },
});

const Header = (props: HeaderProps) => {
	const { from, to, stage, destination } = React.useContext(AdviceContext);
	const router = useRouter();
	const isDesktop = useDesktopQuery();

	let headerStyles = {
		backgroundColor: 'headerBackground',
		color: 'header',
		backgroundImage: 'none',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'right top',
		paddingBottom: '28px',
	};
	if (!isDesktop) {
		const bgImg = `url("${
			props.backgroundImage || '/images/Koffer_MobielRetina.svg'
		}")`;
		headerStyles.backgroundImage = bgImg;
	}
	return (
		<header sx={headerStyles}>
			<RoHeaderLogo />
			<BodyContainer>
				{stage && destination && props.showBackLink === 'result' && (
					<NavLink
						href={generateResultLink({
							from,
							to,
							stage,
							destination,
						})}
						icon="back"
					>
						naar resultaat
					</NavLink>
				)}

				{props.showBackLink === 'previous' && (
					<NavLink onClick={() => router.back()} icon="back">
						terug
					</NavLink>
				)}

				{props.showBackLink === 'retry' && (
					<NavLink href="/" icon="refresh">
						opnieuw
					</NavLink>
				)}

				{props.headerPrefix && (
					<span
						sx={{
							fontSize: 'chapeau',
							fontWeight: 'bold',
							color: 'smallText',
							marginBottom: '25px',
							display: 'block',
							maxWidth: ['80%', '60%'],
						}}
					>
						{props.headerPrefix}
					</span>
				)}

				<Styled.h1
					sx={{
						marginTop: 0,
						marginBottom: 0,
						width: ['80%', '60%'],
					}}
				>
					{props.message}
				</Styled.h1>
			</BodyContainer>
		</header>
	);
};

export default Header;
