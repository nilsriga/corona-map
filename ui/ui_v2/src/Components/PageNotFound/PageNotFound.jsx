import React from 'react';
import { Image, Modal } from 'semantic-ui-react'

const PageNotFound = () => {

    return (

        <Modal style={{ "color": "black", "width": "auto" }} open={true}>
            <Modal.Header>404</Modal.Header>
            <Modal.Content style={{ "padding": 0 + "px" }}>
                <Image centered={true} size='massive' src='/veryWrong.jpg' />
            </Modal.Content>
        </Modal>

    )

}
export default PageNotFound;
