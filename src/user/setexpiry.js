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

export default function SetExpiry() {
    const [userName, setUserName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();
    const [isChecked, setIsChecked] = useState(true);
    const [days, setDays] = useState("");

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleDaysInputChange = (value) => {
        setDays(value);
        if ((days.length + value) > 0) {
            setIsChecked(false);
        }
    };

    const handleUsernameInputChange = (value) => setUserName(value);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
        setDays("");
    };

    const handleSubmit = () => {
        setLoading(true);
        if (days.length > 0 && !isChecked) {
            const command = `samba-tool user setexpiry ${userName} ${days}`;
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
        } else {
            const cmd = `samba-tool user setexpiry ${userName} --noexpiry`;
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
                Set Expiry
            </Button>
            <Modal
                title="Set expiry for a user"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for setting expiry for a user "
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Submit
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
                        label="Days"
                        fieldId="horizontal-form-days"
                    >
                        <TextInput
                            value={days}
                            type="number"
                            id="horizontal-form-days"
                            aria-describedby="horizontal-form-days-helper"
                            name="horizontal-form-days"
                            onChange={handleDaysInputChange}
                            placeholder="10"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Switch
                            id="expiry-switch"
                            label="No Expiry"
                            labelOff={`User is set to expire in ${days} days`}
                            isChecked={isChecked}
                            onChange={handleSwitchChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
