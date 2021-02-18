/** @jsx jsx */
import { jsx, Container, ThemeUICSSObject } from 'theme-ui';
import { Link } from 'components/link';

import { BodyContainer } from 'components/structure/BodyContainer';
import { useSanitySiteSettings } from 'hooks/translation';

type FooterProps = {
	onlyDesktop?: boolean;
	pushToBottom?: boolean;
};

export const Footer = ({
	onlyDesktop = false,
	pushToBottom = false,
}: FooterProps) => {
	const siteSettings = useSanitySiteSettings();
	const footerLinks = [
		'/privacy',
		'/cookies',
		'/copyright',
		'/toegankelijkheid',
		'/kwetsbaarheid-melden',
	];
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
				fontSize: 'footerText',
				h3: {
					marginBottom: 0,
					paddingBottom: '1px',
					fontSize: 'footerText',
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
				marginTop: 'auto',
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
						<h3>{siteSettings.footer.title}</h3>
						<ul>
							{siteSettings.footer.items.map((item, index) => (
								<li key={item}>
									<Link href={footerLinks[index]}>{item}</Link>
								</li>
							))}
						</ul>
					</div>

					<div
						sx={{
							marginTop: ['41px', 0],
						}}
					>
						<h3>{siteSettings.footer.meerInformatieTitle}</h3>
						<ul>
							<li>
								<a
									href={siteSettings.footer.rijksoverheidUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{siteSettings.footer.rijksoverheidText}
								</a>
							</li>
						</ul>
					</div>
				</Container>
			</BodyContainer>
		</footer>
	);
};
