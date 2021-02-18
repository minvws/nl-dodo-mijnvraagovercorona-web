/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import { AnchorLink } from 'components/links/Links';

interface HomePageNavigationProps {
	uitleg: {
		description: string;
		image: string;
		pretitle: string;
		title: string;
		linklist: {
			id?: string;
			usp?: string;
		};
	}[];
}

export const HomePageNavigation = ({ uitleg }: HomePageNavigationProps) => (
	<Container as="nav">
		<div
			sx={{
				display: 'grid',
				gridTemplateColumns: ['1fr', '1fr 1fr 1fr'], // todo: replace this with repeat()
				paddingX: ['17px'],
				paddingBottom: '23px',
				columnGap: '29px',
				rowGap: '22px',
				maxWidth: ['maxWidthBody', '665px'],
				margin: '0 auto',
				borderBottom: ['none', '1px solid #AEC1D1'],
			}}
		>
			{uitleg.map(
				(item) =>
					item.linklist.id &&
					item.linklist.usp && (
						<AnchorLink href={`#${item.linklist.id}`} key={item.linklist.id}>
							{item.linklist.usp}
						</AnchorLink>
					),
			)}
			<span sx={{ display: ['block', 'none'] }}>
				<AnchorLink href="#privacy">Je privacy is altijd beschermd</AnchorLink>
			</span>
		</div>
	</Container>
);
