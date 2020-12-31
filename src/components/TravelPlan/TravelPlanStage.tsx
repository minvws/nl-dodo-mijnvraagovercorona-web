/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type TravelPlanStageProps = {
    title: string,
    subHeading?: string,
    date: string,
    children?: React.ReactNode
};

const TravelPlanStage = (props: TravelPlanStageProps) => {
    return (
        <>
            <div sx={{
                     marginBottom: '1em'
                 }}>
                <h3>{props.title}</h3>
                <h4 sx={{
                        paddingTop: '1em',
                        float: 'right',
                        fontSize: '14pt',
                        textAlign: 'right',
                        marginRight: '1em',
                        marginTop: '-2em',
                    }}>{props.date}</h4>
                {props.subHeading && <h4 sx={{
                                             fontWeight: 'normal',
                                             fontSize: '14pt',
                                             marginTop: 0
                                         }}>{props.subHeading}</h4>}
            </div>
            {props.children}
        </>
    );
};

export default TravelPlanStage;
