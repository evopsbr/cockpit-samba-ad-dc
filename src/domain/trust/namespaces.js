import React, { useState } from 'react';
import cockpit from 'cockpit';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import {
    Loading,
    ErrorToast
} from '../../common';

export default function NameSpaces() {
    const [domain, setDomain] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const handleDomainChange = (e) => {
        setDomain(e);
    };

    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool domain namespaces online ${domain}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    setSuccessMessage(splitData);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    if (exception != null) {
                        setErrorMessage(exception.message);
                        setErrorAlertVisible(true);
                        setLoading(false);
                        setIsModalOpen(false);
                    }
                });
        return script();
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible &&
            <Modal
                title="Namespaces"
                isOpen={successAlertVisible}
                onClose={() => setSuccessAlertVisible(false)}
                appendTo={document.body}
            >
                <div>{successMessage.map((line) => <h6 key={line.toString()}>{line}</h6>)}</div>
            </Modal>}
            <Button variant="secondary" onClick={handleModalToggle}>
                Namespaces
            </Button>
            <Modal
                title="Namespaces"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="Basic info about a domain and the DC passed as parameter."
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Show
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
                        label="Domain"
                        isRequired
                        fieldId="horizontal-form-domain"
                    >
                        <TextInput
                            value={domain}
                            type="text"
                            id="horizontal-form-domain"
                            aria-describedby="horizontal-form-domain-helper"
                            name="horizontal-form-domain"
                            onChange={handleDomainChange}
                            placeholder="DOMAIN"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
