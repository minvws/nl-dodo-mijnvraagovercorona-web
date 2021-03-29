/** @jsx jsx */
import { jsx } from 'theme-ui';

import {
	Footer as FooterComponent,
	FooterColumn,
	useSanitySiteSettings,
	Link,
} from '@quarantaine/common';

export const Footer = () => {
	const siteSettings = useSanitySiteSettings();
	const footerLinks = [
		'/privacy',
		'/cookies',
		'/copyright',
		'/toegankelijkheid',
		'/kwetsbaarheid-melden',
	];
	return (
		<FooterComponent>
			<FooterColumn title={siteSettings.footer.title}>
				<ul>
					{siteSettings.footer.items.map((item, index) => (
						<li key={item}>
							<Link href={footerLinks[index]}>{item}</Link>
						</li>
					))}
				</ul>
			</FooterColumn>

			<FooterColumn title={siteSettings.footer.meerInformatieTitle}>
				<ul>
					<li>
						<Link href={siteSettings.footer.rijksoverheidUrl} external>
							{siteSettings.footer.rijksoverheidText}
						</Link>
					</li>
				</ul>
			</FooterColumn>
		</FooterComponent>
	);
};
