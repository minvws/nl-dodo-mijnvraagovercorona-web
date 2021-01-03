/** @jsx jsx */
import React from 'react';
import { Image, Container, jsx } from 'theme-ui';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

type CopyParagraphProps = {
    imageUrl?: string,
    imageAltText?: string,
    children?: React.ReactNode,
    imageAlignment?: 'left' | 'right'
};

const CopyParagraph = (props: CopyParagraphProps) => {
    const isDesktop = useDesktopQuery();
    //let gridTemplateColumns = ['1fr', '1.2fr 0.8fr']
    let imageOrder = isDesktop ? 2 : 1;
    let contentOrder = isDesktop ? 1 : 2;
    if (props.imageAlignment === 'left') {
        //gridTemplateColumns = ['1fr', '0.8fr 1.2fr'];
        imageOrder = 1;
        contentOrder = 2;
    }

    return (
        <Container sx={{
            display: 'grid',
            columnGap: '29px',
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            marginBottom: '60px'
        }}>
            <div sx={{
                display: 'flex',
                justifyContent: 'center',
                order: imageOrder
            }}>
                {props.imageUrl &&
                 <Image
                     src={props.imageUrl} />
                }
            </div>
            <div sx={{
                order: contentOrder,
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
