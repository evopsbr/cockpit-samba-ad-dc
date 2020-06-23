import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Button,
    Modal
} from '@patternfly/react-core';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';
import './index.css';

export default function ShowContact() {
    const [contactName, setContactName] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState();

    const handleContactNameChange = (e) => {
        setContactName(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact show ${contactName}`;
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
                    setIsModalOpen(false);
                });
        return script();
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="secondary" onClick={handleModalToggle}>
                Show Contact
            </Button>
            <Modal
                title="Show A Contact"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for showing contacts"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Show
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
                            placeholder="James T. Kirk"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
