/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Kwetsbaarheid melden | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Ontdekt u een zwakke plek of kwetsbaarheid op deze website, meld dit dan aan het Nationaal Cyber Security Centrum (NCSC). Het maken van zo'n melding heet Coordinated Vulnerability Disclosure (CVD). Wij bekijken samen met het NCSC het probleem en lossen dit zo snel mogelijk op."
				url="/kwetsbaarheid-melden"
			/>
			<Page title="Kwetsbaarheid melden" showBackLink="previous">
				<Content>
					<Styled.p>
						Ontdekt u een zwakke plek of kwetsbaarheid op deze website, meld dit
						dan aan het Nationaal Cyber Security Centrum (NCSC). Het maken van
						zo'n melding heet Coordinated Vulnerability Disclosure (CVD). Wij
						bekijken samen met het NCSC het probleem en lossen dit zo snel
						mogelijk op.
					</Styled.p>
					<Styled.p>
						Een melding doorgeven kan via{' '}
						<a
							href="https://www.ncsc.nl/contact/kwetsbaarheid-melden"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.ncsc.nl/contact/kwetsbaarheid-melden
						</a>
					</Styled.p>
				</Content>
			</Page>
		</>
	);
};

export default Cookies;
