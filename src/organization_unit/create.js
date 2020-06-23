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

export default function CreateOrgUnit() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [oudn, setOudn] = useState("");
    const [description, setDescription] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOudnInputChange = (value) => setOudn(value);
    const handleDescriptionChange = (value) => setDescription(value);

    const handleSubmit = () => {
        setLoading(true);
        if (description.length > 0) {
            const command = `samba-tool ou create ${oudn} --description=${description}`;
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
            script();
        } else {
            const command = `samba-tool ou create ${oudn}`;
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
            script();
        }
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="primary" onClick={handleModalToggle}>
                Create OU
            </Button>
            <Modal
                title="Create A New Organization Unit"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating new organization unit"
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
                        label="Organization Unit Name"
                        isRequired
                        fieldId="horizontal-form-orgunit"
                    >
                        <TextInput
                            value={oudn}
                            type="text"
                            id="horizontal-form-orgunit"
                            aria-describedby="horizontal-form-orgunit-helper"
                            name="horizontal-form-orgunit"
                            onChange={handleOudnInputChange}
                            placeholder="'OU=OrgUnit'"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Description"
                        fieldId="horizontal-form-desc"
                    >
                        <TextInput
                            value={description}
                            type="text"
                            id="horizontal-form-desc"
                            aria-describedby="horizontal-form-desc-helper"
                            name="horizontal-form-desc"
                            onChange={handleDescriptionChange}
                            placeholder="Description"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
