import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';

export default function Show() {
    const [userName, setUserName] = useState('');
    const [orgUnitContainer, setOrgUnitContainer] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleUsernameInputChange = (value) => setUserName(value);

    const handleOrgUnitContainerChange = (value) => setOrgUnitContainer(value);

    const handleSubmit = () => {
        setLoading(true);
        const command = `samba-tool user move ${userName} ${orgUnitContainer}`;
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
            <Button variant="secondary" onClick={handleModalToggle}>
                Move User
            </Button>
            <Modal
                title="Delete A User"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for moving a user to an organizational unit/container"
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
                <Form isHorizontal onSubmit={handleSubmit}>
                    <FormGroup
                        label="Username"
                        fieldId="horizontal-form-username"
                        isRequired
                    >
                        <TextInput
                            value={userName}
                            type="text"
                            id="horizontal-form-username"
                            aria-describedby="horizontal-form-username-helper"
                            name="horizontal-form-username"
                            onChange={handleUsernameInputChange}
                            placeholder="User1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Organization Unit/Container"
                        fieldId="horizontal-form-orgUnitContainer"
                        isRequired
                    >
                        <TextInput
                            value={orgUnitContainer}
                            type="text"
                            id="horizontal-form-orgUnitContainer"
                            aria-describedby="horizontal-form-orgUnitContainer-helper"
                            name="horizontal-form-orgUnitContainer"
                            onChange={handleOrgUnitContainerChange}
                            placeholder="CN=Users"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
