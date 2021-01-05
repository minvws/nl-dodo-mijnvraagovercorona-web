/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Kwetsbaarheid melden | Quarantaine Reischeck | Reizentijdenscorona.nl "
				description="Ontdekt u een zwakke plek of kwetsbaarheid op deze website, meld dit dan aan het Nationaal Cyber Security Centrum (NCSC). Het maken van zo'n melding heet Coordinated Vulnerability Disclosure (CVD). Wij bekijken samen met het NCSC het probleem en lossen dit zo snel mogelijk op."
				url="/kwetsbaarheid-melden"
			/>
			<ContentPage title="Kwetsbaarheid melden">
				<Styled.p sx={{ paddingTop: '63px' }}>
					Ontdekt u een zwakke plek of kwetsbaarheid op deze website, meld dit
					dan aan het Nationaal Cyber Security Centrum (NCSC). Het maken van
					zo'n melding heet Coordinated Vulnerability Disclosure (CVD). Wij
					bekijken samen met het NCSC het probleem en lossen dit zo snel
					mogelijk op.
				</Styled.p>
				<Styled.p sx={{ paddingBottom: '80px' }}>
					Een melding doorgeven kan via{' '}
					<a href="https://www.ncsc.nl/contact/kwetsbaarheid-melden">
						www.ncsc.nl/contact/kwetsbaarheid-melden
					</a>
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Cookies;
