/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from 'next/link';

type FooterProps = {
    href: string,
    children: React.ReactNode
}

const Footer = (props: any) => {
    return (
        <footer
            sx={{
                      background: 'roHighlight',
                      color: 'white',
                      fontSize: 1,
                      variant: 'styles.footer',
            }}>
            <em>Over deze check</em>
            <ul>
                <li>
                    <Link href="#">
                        <a>Privacy</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Cookies</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Copyright</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Colofon</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Toegankelijkheid</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Open data</a>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <a>Kwetsbaarheid melden</a>
                    </Link>
                </li>
            </ul>

            <em>Meer informatie?</em>
            <ul>
                <li>
                    <Link href="#">
                        <a>Kijk op rijksoverheid.nl</a>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
