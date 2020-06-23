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
    Modal,
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import './index.css';

export default function RemoveSubnet() {
    const [subnet, setSubnet] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubnetInputChange = (e) => {
        setSubnet(e);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool site subnet remove ${subnet}`;
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
            <Button variant="danger" onClick={handleModalToggle}>
                Remove Subnet
            </Button>
            <Modal
                title="Delete A Subnet"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for deleting a subnet"
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
                        label="Subnet"
                        isRequired
                        fieldId="horizontal-form-subnet"
                    >
                        <TextInput
                            value={subnet}
                            type="text"
                            id="horizontal-form-subnet"
                            aria-describedby="horizontal-form-subnet-helper"
                            name="horizontal-form-subnet"
                            onChange={handleSubnetInputChange}
                            placeholder="Subnet1"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
