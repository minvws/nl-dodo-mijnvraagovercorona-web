/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { CopyParagraph } from 'components/home';

type PreparationPanelProps = {
	text: string;
	image: string;
	children?: React.ReactNode;
};

export const PreparationPanel = (props: PreparationPanelProps) => (
	<CopyParagraph imageUrl={props.image}>
		<Styled.h2 sx={{ color: 'header' }}>{props.text}</Styled.h2>
		{props.children}
	</CopyParagraph>
);
