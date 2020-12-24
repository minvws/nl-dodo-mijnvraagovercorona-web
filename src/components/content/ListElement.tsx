/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type ListElementProps = {
    symbolFile?: string,
    children: React.ReactNode
}

const ListElement = (props: ListElementProps) => {

    const symbolUrl = props.symbolFile
                    ? `url("/icons/${props.symbolFile}")`
                    : 'url("/icons/Polygon 6.svg")';
    return (
        <li
        sx={{
            listStyleImage: symbolUrl
        }}>
        { props.children }
        </li>
    );
};

export default ListElement;
