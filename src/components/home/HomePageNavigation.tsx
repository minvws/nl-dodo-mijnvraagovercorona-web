/** @jsx jsx */
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
	privacy: {
		id: string;
		usp: string;
	};
}

export const HomePageNavigation = ({
	uitleg,
	privacy,
}: HomePageNavigationProps) => (
	<Container as="nav">
		<div
			sx={{
				display: 'grid',
				gridTemplateColumns: ['1fr', 'repeat(3, 1fr)'],
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
			<div sx={{ display: ['block', 'none'] }}>
				<AnchorLink href={`#${privacy.id}`} sx={{ display: ['block', 'none'] }}>
					{privacy.usp}
				</AnchorLink>
			</div>
		</div>
	</Container>
);
