import { MetaTags } from 'components/meta-tags';
import { Header, Logo } from '@quarantaine/common';
import React from 'react';
import { Page } from 'components/page';

export default function Home() {
	return (
		<>
			<MetaTags title="Quarantaine check" description="" url="/" />
			<Page title="Moet ik in quarantaine?">Thuisblijven zul je!</Page>
		</>
	);
}
