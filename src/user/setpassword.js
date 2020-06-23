import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button,
    Switch,
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';

export default function SetPassword() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();
    const [mustChangeNextLogin, setMustChangeNextLogin] = useState(true);

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleUsernameInputChange = (value) => setUserName(value);

    const handlePasswordInputChange = (value) => setPassword(value);

    const handleNextLoginSwitchChange = () => setMustChangeNextLogin(!mustChangeNextLogin);

    const handleSubmit = () => {
        setLoading(true);
        if (mustChangeNextLogin) {
            const cmd = `samba-tool user ${userName} ${password} --must-change-next-login`;
            const script = () => cockpit.script(cmd, { superuser: true, err: 'message' })
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
        } else {
            const cmd = `samba-tool user ${userName} ${password}`;
            const script = () => cockpit.script(cmd, { superuser: true, err: 'message' })
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
        }
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="secondary" onClick={handleModalToggle}>
                Reset Password
            </Button>
            <Modal
                title="Reset Password for a user"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for resetting password for a user"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Reset
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
                        label="New Password"
                        fieldId="horizontal-form-password"
                    >
                        <TextInput
                            value={password}
                            type="password"
                            id="horizontal-form-password"
                            aria-describedby="horizontal-form-password-helper"
                            name="horizontal-form-password"
                            onChange={handlePasswordInputChange}
                            placeholder="PassW0rd!"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Switch
                        id="must-change-at-next-login-switch"
                        label="Must Change At Next Login"
                        labelOff="Must Change At Next Login"
                        isChecked={mustChangeNextLogin}
                        onChange={handleNextLoginSwitchChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
