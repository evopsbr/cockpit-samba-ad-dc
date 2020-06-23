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

export default function CreateSite() {
    const [siteName, setSiteName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSiteNameChange = (e) => {
        setSiteName(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool site create ${siteName}`;
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
                Create Site
            </Button>
            <Modal
                title="Create A New Site"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating a new site"
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
                        label="Site Name"
                        isRequired
                        fieldId="horizontal-form-site-name"
                    >
                        <TextInput
                            value={siteName}
                            type="text"
                            id="horizontal-form-site-name"
                            aria-describedby="horizontal-form-site-name-helper"
                            name="horizontal-form-site-name"
                            onChange={handleSiteNameChange}
                            placeholder="Site1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
