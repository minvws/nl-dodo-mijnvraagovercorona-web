/** @jsx jsx */
import React from 'react';
import { useRouter } from 'next/router';

import { Container, jsx } from 'theme-ui';

import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { NavLink } from 'components/nav-link';

type ContentPageProps = {
	title: string;
	titleImage?: string;
	children: React.ReactNode;
};

const ContentPage = (props: ContentPageProps) => {
	const router = useRouter();

	return (
		<>
			<ContentPageHeader
				message={props.title}
				backgroundImage={props.titleImage}
			>
				<NavLink onClick={() => router.back()} icon="back">
					terug
				</NavLink>
			</ContentPageHeader>

			<BodyContainer>
				<Container
					sx={{
						paddingLeft: ['mobilePadding', 0],
						paddingRight: ['mobilePadding', 0],
						p: {
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
						},
					}}
				>
					{props.children}
				</Container>
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer />
		</>
	);
};

export default ContentPage;
