import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Button,
    Modal
} from '@patternfly/react-core';
import './index.css';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';

export default function CreateContact() {
    const [givenName, setGivenName] = useState("");
    const [initials, setInitials] = useState("");
    const [surname, setSurname] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGivenNameChange = (e) => {
        setGivenName(e);
    };

    const handleInitialsChange = (e) => {
        setInitials(e);
    };

    const handleSurnameChange = (e) => {
        setSurname(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool contact create --given-name=${givenName} --initials=${initials} --surname=${surname}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
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
            <Button variant="primary" onClick={handleModalToggle}>
                Create Contact
            </Button>
            <Modal
                title="Create A New Contact"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating new contacts"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Create
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
                        label="Given Name"
                        isRequired
                        fieldId="horizontal-form-given-name"
                    >
                        <TextInput
                            value={givenName}
                            type="text"
                            id="horizontal-form-given-name"
                            aria-describedby="horizontal-form-given-name-helper"
                            name="horizontal-form-given-name"
                            onChange={handleGivenNameChange}
                            placeholder="James"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Initials"
                        isRequired
                        fieldId="horizontal-form-initials"
                    >
                        <TextInput
                            value={initials}
                            type="text"
                            id="horizontal-form-initials"
                            aria-describedby="horizontal-form-initials-helper"
                            name="horizontal-form-initials"
                            onChange={handleInitialsChange}
                            placeholder="T"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Surname"
                        isRequired
                        fieldId="horizontal-form-surname"
                    >
                        <TextInput
                            value={surname}
                            type="text"
                            id="horizontal-form-surname"
                            aria-describedby="horizontal-form-surname-helper"
                            name="horizontal-form-surname"
                            onChange={handleSurnameChange}
                            placeholder="Kirk"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
