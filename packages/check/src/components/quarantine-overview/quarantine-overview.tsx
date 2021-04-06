/** @jsx jsx */
import { Box, Flex, jsx, Text } from 'theme-ui';

interface QuarantaineOverviewBlockProps {
	title: string;
	subtitle: string;
	day: string;
}

export const QuarantaineOverviewBlock: React.FC<QuarantaineOverviewBlockProps> = ({
	title,
	subtitle,
	day,
	children,
}) => (
	<Box
		sx={{
			backgroundColor: 'white',
			borderRadius: 'box',
			padding: 'box',
			position: 'relative',
			fontSize: ['bodyMobile', 'body'],
			'& + &': {
				marginTop: '72px',
				// lines between blocks.
				'::before': {
					position: 'absolute',
					content: '""',
					display: 'block',
					width: '24px',
					height: '68px',
					left: '50%',
					top: '-68px',
					transform: 'translateX(-50%)',
					backgroundImage: 'url(/icons/section-divider.svg)',
					backgroundRepeat: 'repeat-y',
					backgroundPosition: 'top center',
				},
			},
		}}
	>
		<Flex sx={{ justifyContent: 'space-between', '& + div': { mt: '16px' } }}>
			<p sx={{ margin: 0, color: 'smallText', fontWeight: 'bold' }}>
				{title}{' '}
				<span sx={{ fontWeight: 'normal', textTransform: 'lowercase' }}>
					{subtitle}
				</span>
			</p>
			<Text
				variant="chapeau"
				as="span"
				sx={{
					margin: 0,
					color: 'copyHeading',
					fontWeight: 'normal',
				}}
			>
				{day}
			</Text>
		</Flex>
		{children && <Box>{children}</Box>}
	</Box>
);

export const QuarantaineOverviewBullet: React.FC = ({ children }) => (
	<Box
		sx={{
			paddingLeft: '30px',
			backgroundImage: 'url(/icons/triangle.svg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '0 5px',
			'a, button': {
				color: 'text',
				textDecoration: 'underline',
				fontSize: 'inherit',
				'.chevron': {
					display: 'none',
				},
				// eg modal icon
				svg: {
					marginLeft: '6px',
					width: '20px',
					height: '20px',
				},
				'&[target="_blank"]::after': {
					display: 'inline-block',
					content: '""',
					backgroundImage: `url('/icons/outlink.svg')`,
					backgroundSize: '19px 12px',
					backgroundRepeat: 'no-repeat',
					height: '14px',
					width: '14px',
					marginLeft: '6px',
				},
				'&:hover, &:focus': {
					color: 'inherit',
				},
			},
		}}
	>
		{children}
	</Box>
);
