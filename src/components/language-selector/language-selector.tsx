/** @jsx jsx */
import { Menu, MenuButton, MenuItems, MenuPopover } from '@reach/menu-button';
import { positionRight } from '@reach/popover';
import '@reach/menu-button/styles.css';
import { Chevron } from 'components/icons/Chevron';
import { InternalLink } from 'components/Links';
import { ScreenreaderOnly } from 'components/ScreenreaderOnly';
import { useTranslation } from 'hooks/use-translation';
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import { getCurrentUrlForLanguage, useCurrentLangage } from './utils';

export enum Languages {
	Dutch = 'nl',
	English = 'en',
}

export interface Language {
	id: Languages;
	urlPrefix: string;
	fullName: string;
	currentLanguageText: string;
}

export const languages: Language[] = [
	{
		id: Languages.Dutch,
		fullName: 'Nederlands',
		urlPrefix: '',
		currentLanguageText: 'huidige taal',
	},
	{
		id: Languages.English,
		fullName: 'English',
		urlPrefix: '/en',
		currentLanguageText: 'current language',
	},
];

interface LanguageLinkProps {
	id: Languages;
	currentPath: string;
}

const LanguageLink = ({ id, currentPath }: LanguageLinkProps) => {
	const language = languages.find((lang) => lang.id === id);
	const currentLanguage = useCurrentLangage(currentPath, languages);

	if (!language) return null;

	return (
		<InternalLink
			href={getCurrentUrlForLanguage(currentPath, language, currentLanguage)}
			lang={Languages.Dutch}
		>
			{language.fullName}{' '}
			{currentLanguage.id === language.id && (
				<>({language.currentLanguageText})</>
			)}
		</InternalLink>
	);
};

export const LanguageSelector = () => {
	const { asPath } = useRouter();
	const { t } = useTranslation();

	const currentLanguage = useCurrentLangage(asPath, languages);

	return (
		<div
			sx={{
				position: 'absolute',
				top: '2rem',
				right: 'mobilePadding',
			}}
		>
			<Menu>
				<MenuButton
					sx={{
						fontWeight: 'bold',
						fontSize: '16px',
						border: 'none',
						backgroundColor: 'white',
						padding: 12,
						borderRadius: '6px',
						color: 'copyHeading',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						transition: '200ms ease-in-out',
						transitionProperty: 'background-color, color',
						':hover, :focus': {
							backgroundColor: 'link',
							color: 'white',
							path: {
								fill: 'white',
								stroke: 'white',
							},
						},
						svg: {
							transform: 'rotate(90deg)',
							width: '8px',
							marginLeft: '12px',
						},
						path: {
							fill: 'copyHeading',
							stroke: 'copyHeading',
							transition: '200ms ease-in-out',
							transitionProperty: 'stroke, fill',
						},
						// On tiny devices the language selector won't fit.
						'@media screen and (max-width: 350px)': {
							fontSize: '12px',
							svg: {
								width: '6px',
								marginLeft: '8px',
							},
						},
					}}
				>
					<ScreenreaderOnly>
						{t('general__huidige_taal_prefix')}
					</ScreenreaderOnly>
					<span
						sx={{
							fontWeight: 'normal',
							display: ['none', 'inline-block'],
							marginRight: '6px',
						}}
					>
						{t('general__taal')}:
					</span>{' '}
					{currentLanguage.fullName}
					<Chevron />
				</MenuButton>
				<MenuPopover position={positionRight}>
					<MenuItems
						sx={{
							backgroundColor: 'white',
							padding: '12px',
							border: 'none',
							boxShadow: `
            0 2.8px 6.3px rgba(0, 0, 0, 0.008),
            0 6.7px 15.1px rgba(0, 0, 0, 0.013),
            0 12.5px 28.4px rgba(0, 0, 0, 0.017),
            0 22.3px 50.7px rgba(0, 0, 0, 0.021),
            0 41.8px 94.8px rgba(0, 0, 0, 0.026),
            0 100px 227px rgba(0, 0, 0, 0.04)
            `,
							a: {
								fontSize: '16px',
							},
						}}
					>
						<ul sx={{ listStyleType: 'none', padding: 0 }}>
							<li sx={{ marginBottom: '8px' }}>
								{t('general__wissel_van_taal')}
							</li>
							<li>
								<LanguageLink id={Languages.Dutch} currentPath={asPath} />
							</li>
							<li>
								<LanguageLink id={Languages.English} currentPath={asPath} />
							</li>
						</ul>
					</MenuItems>
				</MenuPopover>
			</Menu>
		</div>
	);
};
