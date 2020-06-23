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

export default function DeleteOU() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [oudn, setOudn] = useState("");

    const [isModalOpen, setIsModalOpen] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
    const handleOudnInputChange = (value) => setOudn(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool ou delete ${oudn}`;
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
                Delete OU
            </Button>
            <Modal
                title="Delete an Organization Unit"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for deleting organizational units"
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
                        label="Organization Unit"
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
                </Form>
            </Modal>
        </>
    );
}
