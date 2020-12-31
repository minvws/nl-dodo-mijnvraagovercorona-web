/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { AnchorLinkItem } from 'components/content/ListItems';

const HomePageNavigation = () => {
    return (
        <nav sx={{
            marginTop: '2em',
            marginBottom: '1em',
            paddingLeft: ['1em', 0],
            width: '100%'
        }}>
            <div sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr 1fr 1fr'], // todo: replace this with repeat()
                paddingLeft: [0, '2em']
            }}>
                <AnchorLinkItem href="privacy">
                    Je privacy is altijd beschermd
                </AnchorLinkItem>
                <AnchorLinkItem href="snel">
                    Binnen 2 minuten resultaat
                </AnchorLinkItem>
                <AnchorLinkItem href="actueel">Actuele infomatie over je bestemming en thuiskomst
                </AnchorLinkItem>
                <AnchorLinkItem href="thuis-quarantaine">
                    We helpen je met je thuisquarantaine
                </AnchorLinkItem>
            </div>
        </nav>
    )
};

export default HomePageNavigation;
