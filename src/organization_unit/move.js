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

export default function MoveOrgUnit() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [oldOudn, setOldOudn] = useState("");
    const [newOudn, setNewOudn] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOudnInputChange = (value) => setOldOudn(value);
    const handelNewOudnInputChange = (value) => setNewOudn(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool ou move ${oldOudn} ${newOudn}`;
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
                Move OU
            </Button>
            <Modal
                title="Move Organization Unit"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for moving an organization unit"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Move
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
                        label="Old Organization Unit"
                        isRequired
                        fieldId="horizontal-form-orgunit"
                    >
                        <TextInput
                            value={oldOudn}
                            type="text"
                            id="horizontal-form-orgunit"
                            aria-describedby="horizontal-form-orgunit-helper"
                            name="horizontal-form-orgunit"
                            onChange={handleOudnInputChange}
                            placeholder="'OU=OrgUnit'"
                        />
                    </FormGroup>
                    <FormGroup
                        label="New Organiaztion Unit"
                        fieldId="horizontal-form-new-oudn"
                    >
                        <TextInput
                            value={newOudn}
                            type="text"
                            id="horizontal-form-new-oudn"
                            aria-describedby="horizontal-form-new-oudn-helper"
                            name="horizontal-form-new-oudn"
                            onChange={handelNewOudnInputChange}
                            placeholder="'OU=NewParentOfOrgUnit,DC=samdom,DC=example,DC=com'"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
