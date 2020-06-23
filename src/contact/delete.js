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
    Button,
    Modal
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import './index.css';

export default function DeleteContact() {
    const [contactName, setContactName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleContactNameChange = (e) => {
        setContactName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact delete ${contactName}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                });
        script();
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="danger" onClick={handleModalToggle}>
                Delete Contact
            </Button>
            <Modal
                title="Delete A Contact"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for deleting contacts"
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
                        label="Contact Name"
                        isRequired
                        fieldId="horizontal-form-contact-name"
                    >
                        <TextInput
                            value={contactName}
                            type="text"
                            id="horizontal-form-contact-name"
                            aria-describedby="horizontal-form-contact-name-helper"
                            name="horizontal-form-contact-name"
                            onChange={handleContactNameChange}
                            placeholder="Contact1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
