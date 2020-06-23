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

export default function RenameOrgUnit() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [oldOudnName, setOldOudnName] = useState("");
    const [newOudnName, setNewOudnName] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOudnInputChange = (value) => setOldOudnName(value);
    const handelNewOudnInputChange = (value) => setNewOudnName(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool ou rename ${oldOudnName} ${newOudnName}`;
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
    };
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="secondary" onClick={handleModalToggle}>
                Rename OU
            </Button>
            <Modal
                title="Rename an Organization Unit"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for renaming an organization unit"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Rename
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
                        label="Old OU"
                        isRequired
                        fieldId="horizontal-form-orgunit"
                    >
                        <TextInput
                            value={oldOudnName}
                            type="text"
                            id="horizontal-form-orgunit"
                            aria-describedby="horizontal-form-orgunit-helper"
                            name="horizontal-form-orgunit"
                            onChange={handleOudnInputChange}
                            placeholder="'OU=OrgUnit'"
                        />
                    </FormGroup>
                    <FormGroup
                        label="New OU Name"
                        fieldId="horizontal-form-new-oudn-name"
                    >
                        <TextInput
                            value={newOudnName}
                            type="text"
                            id="horizontal-form-new-oudn-name"
                            aria-describedby="horizontal-form-new-oudn-name-helper"
                            name="horizontal-form-new-oudn-name"
                            onChange={handelNewOudnInputChange}
                            placeholder="'OU=NewParentOfOrgUnit,DC=samdom,DC=example,DC=com'"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
