/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Image, Container, jsx } from 'theme-ui';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

type CopyParagraphProps = {
    imageUrl?: string,
    imageAltText?: string,
    children?: React.ReactNode,
    imageAlignment?: 'left' | 'right'
    id?: string
};

const CopyParagraph = (props: CopyParagraphProps) => {
    const isDesktop = useDesktopQuery();

    const imageOrder = () => {
        if (props.imageAlignment === 'right' && isDesktop) {
            return 2;
        }
        return 1;
    }

    const contentOrder = () => {
        if (props.imageAlignment === 'right' && isDesktop) {
            return 1;
        }
        return 2;
    }

    return (
        <Container id={props.id} sx={{
            display: 'grid',
            columnGap: '29px',
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            marginBottom: '60px',
            paddingLeft: ['mobilePadding', 0],
            paddingRight: ['mobilePadding', 0]
        }}>

            <div sx={{
                display: 'flex',
                justifyContent: 'center',
                order: imageOrder()
            }}>
                {props.imageUrl &&
                 <Image
                     src={props.imageUrl} />
                }
            </div>
            <div sx={{
                order: contentOrder(),
                width: ['100%', '433px'],
                h4: {
                    fontWeight: 'bold',
                    fontSize: 'smallText',
                    lineHeight: 'smallText',
                    color: 'smallText',
                    marginBottom: '5px'
                },
                h3: {
                    marginTop: 0,
                    marginBottom: '17px',
                    padding: 0,
                    fontWeight: 'bold',
                    fontSize: ['h2Mobile', 'h2'],
                    lineHeight: ['h2Mobile', 'h2'],
                    color: 'copyHeading'
                },
                p: {
                    fontWeight: 'normal',
                    margin: 0,
                    fontSize: ['bodyMobile', 'body'],
                    lineHeight: ['bodyMobile', 'body'],
                    color: 'copyBody'
                }
            }}>
                { props.children }
            </div>
        </Container>
    );
};

export default CopyParagraph;
