import React, { useState } from 'react';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import './css/computer.css';

export default function Delete() {
    const [computerName, setComputerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleComputerNameChange = (e) => {
        setComputerName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool computer delete ${computerName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    console.log(data);
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                });
        script();
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="danger" onClick={handleModalToggle}>
                Delete Computer
            </Button>
            <Modal
                title="Delete A Computer"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for deleting computers"
                actions={[
                    <Button key="confirm" variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Loading key="loading" loading={loading} />
                ]}
                isFooterLeftAligned
                appendTo={document.body}
            >
                <Form isHorizontal>
                    <FormGroup
                        label="Computer Name"
                        isRequired
                        fieldId="horizontal-form-computer-name"
                    >
                        <TextInput
                            value={computerName}
                            type="text"
                            id="horizontal-form-computer-name"
                            aria-describedby="horizontal-form-computer-name-helper"
                            name="horizontal-form-computer-name"
                            onChange={handleComputerNameChange}
                            placeholder="Computer1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
