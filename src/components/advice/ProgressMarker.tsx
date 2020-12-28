/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type ProgressMarkerProps = {
    stage: number,
    totalStages: number
}

const ProgressMarker = (props: ProgressMarkerProps) => {
    const rangeArr = [...Array(props.totalStages).keys()];
    return (
        <ul sx={{
            position: 'absolute',
            top: '10px',
            paddingLeft: 0,
            fontSize: '12pt',
            fontWeight: 'bold'
        }}>

            {rangeArr.map(index => {
                const stageNumber = index + 1;
                const isCurrentStage = stageNumber === props.stage;
                const isPastStage = stageNumber < props.stage;
                let background =  'white';

                if (isCurrentStage) {
                    background = 'button';
                }
                if (isPastStage) {
                    background = 'gray';
                }

                return (
                    <li sx={{
                        display: 'inline-block',
                        backgroundColor: background,
                        color: isCurrentStage ? 'white' : 'header',
                        borderRadius: '50%',
                        width: '2.1em',
                        height: '2.1em',
                        padding: '0.5em',
                        textAlign: 'center',
                        marginRight: '1.4em'
                    }}>{stageNumber}</li>
                )
            })}
        </ul>
    )
};

export default ProgressMarker;
