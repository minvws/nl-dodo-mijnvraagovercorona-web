/** @jsx jsx */
import { jsx } from 'theme-ui';

import {
	Footer as FooterComponent,
	FooterColumn,
	useSanitySiteSettings,
	Link,
	ContentBlock,
} from '@quarantaine/common';

export const Footer = () => {
	const siteSettings = useSanitySiteSettings();
	return (
		<FooterComponent>
			<div sx={{ order: [3, 'inherit'], marginTop: ['50px', 0] }}>
				<ContentBlock content={siteSettings.footer.footerText} />
			</div>
			<FooterColumn title={siteSettings.footer.title}>
				<ul>
					{siteSettings.footer.items.map((item) => (
						<li key={item.url}>
							<Link href={item.url}>{item.content}</Link>
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
