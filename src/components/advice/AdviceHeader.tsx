/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import RoHeaderLogo from '../RoHeaderLogo';
import ProgressMarker from './ProgressMarker';
import BodyContainer from 'components/BodyContainer';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

type HeaderProps = {
    header: string,
    questionStage: number,
    totalStages: number,
    children?: React.ReactNode
};

const AdviceHeader = (props: HeaderProps) => {
    const isDesktop = useDesktopQuery();

    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'header',
                paddingBottom: ['31px', '29px'],
            }}>
            <BodyContainer>
                <RoHeaderLogo align={isDesktop ? 'center' :'right'} />
                <ProgressMarker stage={props.questionStage} totalStages={props.totalStages} />
                <h2 sx={{
                    marginTop: ['-15px', '112px'],
                    marginBottom: ['17px', '10px'],
                    width: '65%',
                    fontSize: ['h2Mobile', 'h2']
                }}>{props.header}</h2>
                { props.children }
            </BodyContainer>
        </header>
    );
};

export default AdviceHeader;
