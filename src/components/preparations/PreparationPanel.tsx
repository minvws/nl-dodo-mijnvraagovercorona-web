/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import CopyParagraph from 'components/home/CopyParagraph';

type PreparationPanelProps = {
	text: string;
	image: string;
	children?: React.ReactNode;
};

const PreparationPanel = (props: PreparationPanelProps) => {
	return (
		<CopyParagraph imageUrl={props.image}>
			<Styled.h2 sx={{ color: 'header' }}>{props.text}</Styled.h2>
			{props.children}
		</CopyParagraph>
	);
};

export default PreparationPanel;
