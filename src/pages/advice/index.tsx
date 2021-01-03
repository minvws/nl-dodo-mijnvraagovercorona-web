/** @jsx jsx */
import React, { useState } from 'react';
import { Container, Input, jsx } from 'theme-ui';
import AdviceHeader from 'components/advice/AdviceHeader';
import { InternalLink } from 'components/Links';
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import VisuallyHidden from '@reach/visually-hidden';
import "@reach/dialog/styles.css";


import BodyContainer from 'components/BodyContainer';
import DestinationSearch from '../../components/advice/DestinationSearch';

import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/content/Footer';

const Destination = () => {
    const [showDialog, setShowDialog] = useState(false);
    const openDialog = (event: any) => {
        event.preventDefault();
        setShowDialog(true);
    }
    const closeDialog = () => setShowDialog(false);

    return (

        <>
            <AdviceHeader
                header="Wat is of was je bestemming?"
                questionStage={1}
                totalStages={2}>
                <InternalLink
                    href=""
                    onClick={openDialog}>
                    Waarom vragen we dit?
                </InternalLink>
                <DialogOverlay
                    aria-label="Waarom we vragen je naar je bestemming?"
                    isOpen={showDialog}
                    onDismiss={closeDialog}
                    sx={{
                        background: 'rgba(1, 104, 155, 0.7)',
                        paddingRight: [0, '300px', '400px'],
                        paddingTop: '67px'
                    }}>
                    <DialogContent
                        sx={{
                            width: '434px',
                            borderRadius: '20px',
                            color: 'header'
                        }}>
                        <button className="close-button" onClick={closeDialog}
                                sx={{
                                    background: 'url("/icons/Close.svg")',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '18px 18px',
                                    backgroundPosition: 'right top',
                                    border: 'none',
                                    float: 'right',
                                    height: '18px',
                                    width: '18px',
                                    marginTop: '-12px',
                                    marginRight: '-15px'
                                }}>
                            <VisuallyHidden>Close</VisuallyHidden>
                        </button>
                        <h2>Waarom vragen we je naar je bestemming?</h2>
                        <p>
                            Vaak wordt per regio bepaald hoe veilig het er is.
                            Zo kunnen de steden code oranje hebben en landelijke regio's code geel.
                        </p>
                    </DialogContent>
                </DialogOverlay>
            </AdviceHeader>
            <BodyContainer>
                <div sx={{
                    minHeight: '30vh' // need a better solution here
                }}>
                    <DestinationSearch />
                </div>
            </BodyContainer>
            <DataProtectionPanel onlyDesktop={true} />
            <Footer onlyDesktop={true} pushToBottom={!showDialog} />
        </>
    );
}

export default Destination;
