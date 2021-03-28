import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

function modal(props) {
    const handleClose = () => {
        props.setShow(false)
    };

    const handleDelete = () => {
        handleClose();
        props.handleDelete(props.matricula)
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Solicitação de Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Confirma exclusão?</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default modal;