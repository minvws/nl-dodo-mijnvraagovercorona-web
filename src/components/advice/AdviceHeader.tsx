/** @jsx jsx */
import React from 'react';
import { Heading, Container, Image, jsx } from 'theme-ui';
import ExpandingInfoPanel from '../ExpandingInfoPanel';

type HeaderProps = {
    header: string,
    questionStage?: number,
    totalStages?: number,
    children?: React.ReactNode
};

const AdviceHeader = (props: HeaderProps) => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'headerText',
                padding: '1em'
            }}>
        <Container>
            <Image src='/icons/RO logo.svg' />
        </Container>
        <Heading as='h3'>{props.header}</Heading>
        { props.children }
        { props.questionStage &&
          <p>{props.questionStage}/{props.totalStages}</p>
        }

        </header>
    );
};

export default AdviceHeader;
