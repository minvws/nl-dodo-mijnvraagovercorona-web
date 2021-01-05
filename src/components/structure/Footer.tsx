/** @jsx jsx */
import { jsx, Container, ThemeUICSSObject } from 'theme-ui';
import Link from 'next/link';

import BodyContainer from 'components/structure/BodyContainer';

type FooterProps = {
	onlyDesktop?: boolean;
	pushToBottom?: boolean;
};

const Footer = ({ onlyDesktop = false, pushToBottom = false }: FooterProps) => {
	const mobileDisplay = onlyDesktop ? 'none' : 'inherit';
	const absolutePositioning: ThemeUICSSObject = pushToBottom
		? {
				position: 'absolute',
				width: '100%',
				zIndex: '-1',
				bottom: 0,
		  }
		: {};
	return (
		<footer
			sx={{
				...absolutePositioning,
				display: [mobileDisplay, 'inherit'],
				backgroundColor: 'footerBackground',
				color: 'white',
				fontSize: 'bodyMobile',
				h3: {
					marginBottom: 0,
					paddingBottom: '1px',
				},
				a: {
					color: 'white',
					textDecoration: 'none',
					fontWeight: 'regular',
				},
				ul: {
					listStylePosition: 'inside',
					paddingLeft: 0,
					marginBottom: 0,
					marginTop: 0,
				},
				li: {
					listStyleImage: 'url("/icons/Link Arrow white.svg")',
					':before': {
						content: '""',
						display: 'inline-block',
					},
					paddingTop: '16px',
				},
				paddingLeft: ['mobilePadding', 0],
				paddingRight: ['mobilePadding', 0],
			}}
		>
			<BodyContainer>
				<Container
					sx={{
						paddingTop: '45px',
						paddingBottom: '68px',
						display: 'grid',
						gridTemplateColumns: ['1fr', '1fr 1fr'],
					}}
				>
					<div>
						<h3>Over deze check</h3>
						<ul>
							<li>
								<Link href="/privacy">Privacy</Link>
							</li>
							<li>
								<Link href="/cookies">Cookies</Link>
							</li>
							<li>
								<Link href="/copyright">Copyright</Link>
							</li>
							<li>
								<Link href="/toegankelijkheid">Toegankelijkheid</Link>
							</li>
							<li>
								<Link href="/kwetsbaarheid-melden">Kwetsbaarheid melden</Link>
							</li>
						</ul>
					</div>

					<div
						sx={{
							marginTop: ['41px', 0],
						}}
					>
						<h3>Meer informatie?</h3>
						<ul>
							<li>
								<a href="https://www.rijksoverheid.nl">
									Kijk op rijksoverheid.nl
								</a>
							</li>
						</ul>
					</div>
				</Container>
			</BodyContainer>
		</footer>
	);
};

export default Footer;
