/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import { InternalLink } from 'components/Links';
import BodyContainer from 'components/BodyContainer';

const Footer = () => {
    return (
        <footer
            sx={{
                backgroundColor: 'footerBackground',
                color: 'white',
                fontSize: 'bodyMobile',
                h3: {
                    marginBottom: 0,
                    paddingBottom: '1px',
                },
                a: {
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'regular',
                },
                ul: {
                    listStylePosition: 'inside',
                    paddingLeft: 0,
                    marginBottom: 0,
                    marginTop: 0
                },
                li: {
                    listStyleImage: 'url("/icons/Link Arrow white.svg")',
                    ':before': {
                        content: '""',
                        display: 'inline-block',
                    },
                    paddingTop: '16px'
                }
            }}>

            <BodyContainer>
                <Container sx={{
                    paddingTop: '45px',
                    paddingBottom: '68px',
                    display: 'grid',
                    gridTemplateColumns: ['1fr', '1fr 1fr']
                }}>
                    <div>
                        <h3>Over deze check</h3>
                        <ul>
                            <li>
                                <a href="/privacy">Privacy</a>
                            </li>
                            <li>
                                <a href="/cookies">Cookies</a>
                            </li>
                            <li>
                                <a href="/copyright">Copyright</a>
                            </li>
                            <li>
                                <a href="/toegankelijkheid">Toegankelijkheid</a>
                            </li>
                            <li>
                                <a href="/kwetsbaarheid">Kwetsbaarheid melden</a>
                            </li>
                        </ul>
                    </div>

                    <div sx={{
                        marginTop: ['41px', 0]
                    }}>
                        <h3>Meer informatie?</h3>
                        <ul>
                            <li>
                                <a href="https://www.rijksoverheid.nl">Kijk op rijksoverheid.nl</a>
                            </li>
                        </ul>
                    </div>
                </Container>
            </BodyContainer>

        </footer>
    )
}

export default Footer
