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
				<p
					sx={{
						fontWeight: 'bold',
						fontSize: 'smallText',
						lineHeight: ['smallTextMobile', 'smallText'],
						color: 'smallText',
						marginBottom: '5px',
					}}
				>
					{item.pretitle}
				</p>
				<h3
					sx={{
						marginTop: 0,
						marginBottom: '17px',
						padding: 0,
						fontWeight: 'bold',
						fontSize: ['h2Mobile', 'h2'],
						lineHeight: ['h2Mobile', 'h2'],
						color: 'copyHeading',
					}}
				>
					{item.title}
				</h3>
				<p
					sx={{
						fontWeight: 'normal',
						margin: 0,
						fontSize: ['bodyMobile', 'body'],
						lineHeight: ['bodyMobile', 'body'],
						color: 'copyBody',
					}}
				>
					{item.description}
				</p>
			</CopyParagraph>
		))}
	</Container>
);
