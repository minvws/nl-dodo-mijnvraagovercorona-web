/** @jsx jsx */
import { jsx, Container } from 'theme-ui';

type PreparationPanelListItemProps = {
	text: string;
	subtext?: string;
};

const PreparationPanelListItem = (props: PreparationPanelListItemProps) => {
	return (
		<li
			sx={{
				listStyleImage: 'url("/icons/List box.svg")',
				paddingLeft: '17px',
				paddingBottom: '16px',
				marginBottom: 0,
			}}
		>
			<p
				sx={{
					fontSize: ['bodyMobile', 'body'],
					lineHeight: ['bodyMobile', 'body'],
					marginBottom: 0,
				}}
			>
				{props.text}
			</p>
			{props.subtext && (
				<p
					sx={{
						color: 'detailText',
						fontSize: '16px',
						lineHeight: '24px',
						marginBottom: 0,
					}}
				>
					{props.subtext}
				</p>
			)}
		</li>
	);
};

export default PreparationPanelListItem;
