/** @jsx jsx */
import {
	BodyContainer,
	Footer,
	FooterColumn,
	Header,
	Link,
	Logo,
} from '@quarantaine/common';
import React from 'react';
import { Flex, jsx } from 'theme-ui';

interface PageProps {
	title: string;
	withoutContainer?: boolean;
}

export const Page: React.FC<PageProps> = ({
	children,
	title,
	withoutContainer,
	...props
}) => {
	return (
		<Flex
			{...props}
			sx={{
				flexDirection: 'column',
				minHeight: '100vh',
				fontSize: ['bodyMobile', 'body'],
			}}
		>
			<Header sx={{ '.logo': { mt: '-2rem' } }}>
				<Logo alt="Logo Rijksoverheid - Naar de homepage van quarantainecheck.rijksoverheid.nl" />
				<h1>{title}</h1>
			</Header>
			{withoutContainer ? children : <BodyContainer>{children}</BodyContainer>}
			<Footer sx={{ mt: 'auto' }}>
				<FooterColumn title="Over deze check">
					<ul>
						<li>
							<Link href="/">Informatie over deze website</Link>
						</li>
						<li>
							<Link href="/">Privacy</Link>
						</li>
						<li>
							<Link href="/">Cookies</Link>
						</li>
						<li>
							<Link href="/">Copyright</Link>
						</li>
						<li>
							<Link href="/">Toegankelijkheid</Link>
						</li>
						<li>
							<Link href="/">Kwetsbaarheid melden</Link>
						</li>
					</ul>
				</FooterColumn>
				<FooterColumn title="Meer informatie?">
					<ul>
						<li>
							<Link href="https://www.rijksoverheid.nl/" external>
								Kijk op rijksoverheid.nl
							</Link>
						</li>
					</ul>
				</FooterColumn>
			</Footer>
		</Flex>
	);
};
