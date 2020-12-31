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
    let gridTemplateColumns = ['1fr', '1.2fr 0.8fr']
    let imageOrder = isDesktop ? 2 : 1;
    let contentOrder = isDesktop ? 1 : 2;
    if (props.imageAlignment === 'left') {
        gridTemplateColumns = ['1fr', '0.8fr 1.2fr'];
        imageOrder = 1;
        contentOrder = 2;
    }

    return (
        <Container sx={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns
        }}>
            <div sx={{
                textAlign: 'center',
                order: imageOrder
            }}>
                {props.imageUrl &&
                 <Image src={props.imageUrl} />
                }
            </div>
            <div sx={{
                order: contentOrder
            }}>
                { props.children }
            </div>
        </Container>
    );
};

export default CopyParagraph;
