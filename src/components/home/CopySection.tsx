/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { CopyParagraph } from './CopyParagraph';

interface CopySectionProps {
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

export const CopySection = ({ uitleg }: CopySectionProps) => (
	<Container sx={{ paddingTop: '30px' }}>
		{uitleg.map((item, index) => (
			<CopyParagraph
				imageUrl={item.image}
				imageAlignment={index % 2 === 0 ? 'right' : 'left'}
				key={item.title}
				id={item.linklist.id}
			>
				<h4>{item.pretitle}</h4>
				<h3>{item.title}</h3>
				<p className="large">{item.description}</p>
			</CopyParagraph>
		))}
	</Container>
);
