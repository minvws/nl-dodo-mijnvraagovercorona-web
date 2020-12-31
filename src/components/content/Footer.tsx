/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer
            sx={{
                backgroundColor: 'footerBackground',
                paddingTop: '2em',
                paddingLeft: '1em',
                paddingBottom: '2em',
                color: 'white',
                fontSize: 1,
                variant: 'styles.footer',
                h3: {
                    marginTop: '2em',
                    fontSize: '14pt'
                },
                a: {
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'regular',
                    fontSize: '14pt'
                },
                ul: {
                    listStylePosition: 'inside',
                    paddingLeft: 0,
                },
                li: {
                    paddingBottom: '1.3em',
                    listStyleImage: 'url("/icons/Link Arrow white.svg")',
                    ':before': {
                        content: '""',
                        display: 'inline-block',
                        width: '0.5em'
                    }

                }
            }}>
            <Container sx={{
                width: ['100%', '1024px'],
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr']
            }}>
                <div>
                <h3>Over deze check</h3>
                <ul>
                    <li>
                        <Link href="/privacy"><a>Privacy</a></Link>
                    </li>
                    <li>
                        <Link href="/cookies"><a>Cookies</a></Link>
                    </li>
                    <li>
                        <Link href="/copyright"><a>Copyright</a></Link>
                    </li>
                    <li>
                        <Link href="/toegankelijkheid"><a>Toegankelijkheid</a></Link>
                    </li>
                    <li>
                        <Link href="/kwetsbaarheid"><a>Kwetsbaarheid melden</a></Link>
                    </li>
                </ul>
                </div>

                <div>
                <h3>Meer informatie?</h3>
                <ul>
                    <li>
                        <Link href="https://www.rijksoverheid.nl"><a>Kijk op rijksoverheid.nl</a></Link>
                    </li>
                </ul>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
