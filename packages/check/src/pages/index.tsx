import LandingPage, {
	getStaticProps as localizedHomeGetStaticProps,
} from './[locale]/index';

export const getStaticProps = async () =>
	localizedHomeGetStaticProps({ params: { locale: 'nl' } });

export default LandingPage;
