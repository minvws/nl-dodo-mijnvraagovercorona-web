/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type TravelAdvicePanelProps = {
    title: string,
    subHeading?: string,
    children: React.ReactNode
}

const TravelAdvicePanel = (props: TravelAdvicePanelProps) => {
    return (
        <Container sx={{
            marginTop: '-0.5em',
            paddingBottom: '0.9em',        }}>
            <div sx={{
                color: 'black',
                border: '1px solid black',
                borderRadius: '10px',
                marginRight: '1em',
                paddingLeft: '0.5em',
                paddingRight: '0.5em'

            }}>
                <div sx={{
                    display: 'block',
                    paddingTop: '0.5em',
                    paddingBottom: '0.1em'
                }}>
                    <h4 sx={{

                        margin: 0,
                        padding: 0,
                        float: 'left',
                    }}>{props.title}</h4>
                    <h5 sx={{
                        color: 'gray', // todo
                        margin: 0,
                        padding: 0,
                        fontSize: '12pt',
                        fontWeight: 'normal',
                        float: 'right'
                    }}>{props.subHeading}</h5>
                </div>
                <Container sx={{
                    marginTop: '1em',
                    paddingTop: '0.2em',
                    paddingBottom: '0.5em'

                }}>
                    {props.children}
                </Container>
            </div>
        </Container>
    );
};

export default TravelAdvicePanel;
