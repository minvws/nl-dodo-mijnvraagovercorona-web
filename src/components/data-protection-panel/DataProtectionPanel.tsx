/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import { PrivacyList } from 'components/privacy-list';
import { useSanitySiteSettings } from 'hooks/translation';

type DataProtectionPanelProps = {
	className?: string;
	illustrationUrl?: string;
};

export const DataProtectionPanel = ({
	className,
	illustrationUrl,
}: DataProtectionPanelProps) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Box
			as="aside"
			id="privacy"
			className={className}
			sx={{
				backgroundColor: ['white', 'sidePanel'],
				position: ['relative', 'sticky'],
				top: ['inherit', 0],
				right: ['inherit', 0],
				height: ['auto', '100vh'],
				maxWidth: ['100%', '400px'],
				padding: ['mobilePadding', '30px'],
				backgroundImage: ['none', `url("${illustrationUrl}")`],
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right -60px bottom 20px',
				backgroundSize: ['auto', '339px', '439px'],
			}}
		>
			<Box
				sx={{
					background:
						'linear-gradient(360deg, #EFF7F9 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
					boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
					borderRadius: '11px',
					paddingLeft: ['20px'],
					paddingTop: ['29px'],
					paddingRight: ['16px'],
				}}
			>
				<h3
					sx={{
						fontSize: ['h2Mobile', 'h2'],
						color: 'secondaryHeader',
						paddingLeft: '4px',
						paddingBottom: '8px',
						margin: 0,
					}}
				>
					{siteSettings.privacy.title}
				</h3>
				<PrivacyList>
					{siteSettings.privacy.beloftes.map((belofte) => (
						<li key={belofte}>{belofte}</li>
					))}
				</PrivacyList>
			</Box>
		</Box>
	);
};
