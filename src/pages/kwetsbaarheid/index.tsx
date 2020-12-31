/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import SimpleContent from '../../components/content/SimpleContent';

const Cookies = () => {
    return (
        <SimpleContent>
            <Container>
                <h2>Kwetsbaarheid melden</h2>
                <p>
                    Ontdekt u een zwakke plek of kwetsbaarheid op deze website, meld dit dan aan het Nationaal Cyber Security Centrum (NCSC). Het maken van zo'n melding heet Coordinated Vulnerability Disclosure (CVD). Wij bekijken samen met het NCSC het probleem en lossen dit zo snel mogelijk op.
                </p>
                <p>
                    Een melding doorgeven kan via <Link href="https://www.ncsc.nl/contact/kwetsbaarheid-melden"><a>www.ncsc.nl/contact/kwetsbaarheid-melden</a></Link>
                </p>
            </Container>
        </SimpleContent>
    );
}

export default Cookies;
