/** @jsx jsx */
import React, { useMemo, useContext } from 'react';
import AdviceContext from 'components/advice/AdviceContext';
import { getAdvicePath } from 'components/advice/utils';
import { NavLink } from 'components/nav-link';
import RoHeaderLogo from 'components/structure/RoHeaderLogo';
import { useRouter } from 'next/router';
import { jsx, Styled } from 'theme-ui';
import BodyContainer from './BodyContainer';
import { useCurrentLanguage } from 'hooks/translation';

type HeaderProps = {
	message: string;
	headerPrefix?: React.ReactNode;
	backgroundImage?: string;
	showBackLink?: 'result' | 'previous' | 'retry';
};

const Header = ({
	message,
	headerPrefix,
	backgroundImage,
	showBackLink,
}: HeaderProps) => {
	const { from, to, stage, destination, meansOfTransport } = useContext(
		AdviceContext,
	);
	const locale = useCurrentLanguage();
	const router = useRouter();
	const resultLink = useMemo(() => {
		if (
			showBackLink === 'result' &&
			from &&
			to &&
			stage &&
			destination &&
			meansOfTransport
		) {
			return getAdvicePath.result({
				fromDate: from,
				toDate: to,
				stage,
				destination,
				meansOfTransport,
				locale,
			});
		}

		return null;
	}, [showBackLink, from, to, stage, destination, meansOfTransport]);

	return (
		<header
			sx={{
				backgroundColor: 'headerBackground',
				backgroundImage: [`url("${backgroundImage}")`, 'none'],
				color: 'header',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right top',
				paddingBottom: '28px',
			}}
		>
			<RoHeaderLogo />
			<BodyContainer>
				{resultLink && (
					<NavLink href={resultLink} icon="back">
						naar resultaat
					</NavLink>
				)}

				{showBackLink === 'previous' && (
					<NavLink onClick={() => router.back()} icon="back">
						terug
					</NavLink>
				)}

				{showBackLink === 'retry' && (
					<NavLink href="/" icon="refresh">
						opnieuw
					</NavLink>
				)}

				{headerPrefix && (
					<span
						sx={{
							fontSize: 'chapeau',
							fontWeight: 'bold',
							color: 'smallText',
							marginBottom: '25px',
							display: 'block',
							maxWidth: '60%',
						}}
					>
						{headerPrefix}
					</span>
				)}

				<Styled.h1
					sx={{
						marginTop: 0,
						marginBottom: 0,
						width: ['80%', '60%'],
					}}
				>
					{message}
				</Styled.h1>
			</BodyContainer>
		</header>
	);
};

export default Header;
