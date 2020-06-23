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

export default function SetSite() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [subnet, setSubnet] = useState("");
    const [siteOfSubnet, setSiteOfSubnet] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubnetInputChange = (value) => setSubnet(value);
    const handleSiteOfSubnetChange = (value) => setSiteOfSubnet(value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool sites subnet set-site ${subnet} ${siteOfSubnet}`;
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
                Set Site
            </Button>
            <Modal
                title="Set Site"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for setting a site"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Set Site
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
                            placeholder="Subnet"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Site of Subnet"
                        isRequired
                        fieldId="horizontal-form-site-of-subnet"
                    >
                        <TextInput
                            value={siteOfSubnet}
                            type="text"
                            id="horizontal-form-site-of-subnet"
                            aria-describedby="horizontal-form-site-of-subnet-helper"
                            name="horizontal-form-site-of-subnet"
                            onChange={handleSiteOfSubnetChange}
                            placeholder="Site of Subnet"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
