import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    FormSelect,
    FormSelectOption,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import {
    RenderError,
    Loading,
    Success
} from './common';

function ProvisionModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        return (
            setIsModalOpen(!isModalOpen)
        );
    };
    const serverRoleOptions = [
        { value: 'dc', label: 'dc', disabled: false },
        { value: 'member', label: 'member', disabled: false },
        { value: 'standalone', label: 'standalone', disabled: false },
    ];

    const dnsBackendOptions = [
        { value: 'SAMBA_INTERNAL', label: 'SAMBA_INTERNAL', disabled: false },
        { value: 'BIND9_FLATFILE', label: 'BIND9_FLATFILE', disabled: false },
        { value: 'BIND9_DLZ', label: 'BIND9_DLZ', disabled: false },
        { value: 'NONE', label: 'NONE', disabled: false },
    ];

    const [realm, setRealm] = useState('');
    const [domain, setDomain] = useState('');
    const [serverRole, setServerRole] = useState(serverRoleOptions[0].value);
    const [dnsBackend, setDnsBackend] = useState(dnsBackendOptions[0].value);
    const [dnsforwarder, setDnsForwarder] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidated, setIsValidated] = useState('error');
    const [helperText, setHelperText] = useState("Enter a Password");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [helperTextInvalid, setHelperTextInvalid] = useState();
    const [errorMesssage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState();

    const hideErrorAlert = () => {
        setErrorAlertVisible(false);
    };

    const hideSuccessAlert = () => {
        setSuccessAlertVisible(false);
    };

    const passwordChecker = (pass1, pass2) => {
        // TODO: Regex for checking password strength instead of if/else clause
        if (pass1.length === 0) {
            setHelperTextInvalid('Password must be greater than one character');
        } else if (pass1.length < 8) {
            setHelperTextInvalid('Password length must be longer than 8 characters');
        } else if (pass1 != pass2) {
            setHelperTextInvalid("Passwords don't match");
        } else {
            setHelperTextInvalid();
            setIsValidPassword(true);
            setIsValidated('success');
            setHelperText('Password Valid');
        }
    };

    const handleServerRole = (value) => {
        setServerRole(value);
    };
    const handleDnsBackend = value => {
        setDnsBackend(value);
    };

    const handleRealmInputChange = value => {
        setRealm(value);
    };
    const handleDomainInputChange = value => {
        setDomain(value);
    };
    const handleDnsForwarder = dnsforwarder => {
        setDnsForwarder(dnsforwarder);
    };
    const handlePassword1Change = password => {
        setPassword1(password);
        passwordChecker(password, password2);
    };
    const handlePassword2Change = password => {
        setPassword2(password);
        passwordChecker(password1, password);
    };
    const handleSubmit = () => {
        setLoading(true);
        const command = `
        samba-tool domain provision \
                --use-rfc2307 \
                --realm ${realm} \
                --domain ${domain} \
                --server-role ${serverRole} \
                --dns-backend ${dnsBackend} \
                --adminpass ${password1}
        
        cp -f /var/lib/samba/private/krb5.conf /etc/krb5.conf
        samba
        samba-tool domain info 127.0.0.1
    `;
        const script = () => cockpit.script(command, { superuser: true, err: "message" })
                .done((data) => {
                    console.log(data);
                    setSuccessMessage(data);
                    setErrorAlertVisible(true);
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
            <Button variant="primary" onClick={handleModalToggle}>
                Provision Domain
            </Button>
            <RenderError error={errorMesssage} hideAlert={hideErrorAlert} isAlertVisible={errorAlertVisible} />
            <Success message={successMessage} hideAlert={hideSuccessAlert} isAlertVisible={successAlertVisible} />
            <Modal
                title="Samba AD DC Setup"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for provisioning a Samba AD DC Domain"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Provision
                    </Button>,
                    <Loading key="loading" loading={loading} />,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>
                ]}
                isFooterLeftAligned
                appendTo={document.body}
            >
                <Form isHorizontal onSubmit={handleSubmit}>
                    <FormGroup
          label="Realm"
          isRequired
          fieldId="horizontal-form-realm"
                    >
                        <TextInput
            value={realm}
            isRequired
            type="text"
            id="horizontal-form-realm"
            aria-describedby="horizontal-form-realm-helper"
            name="horizontal-form-realm"
            onChange={handleRealmInputChange}
            placeholder="SAMDOM.EXAMPLE.COM"

                        />
                    </FormGroup>
                    <FormGroup label="Domain" isRequired fieldId="horizontal-form-domain">
                        <TextInput
            value={domain}
            onChange={handleDomainInputChange}
            isRequired
            type="text"
            id="horizontal-form-domain"
            name="horizontal-form-domain"
            placeholder="SAMDOM"
                        />
                    </FormGroup>
                    <FormGroup label="Server Role" isRequired fieldId="horizontal-form-role">
                        <FormSelect
            value={serverRole}
            onChange={handleServerRole}
            id="horzontal-form-role"
            name="horizontal-form-role"
            aria-label="Server Role"
                        >
                            {serverRoleOptions.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup label="DNS Backend" isRequired fieldId="horizontal-form-dns-backend">
                        <FormSelect
            value={dnsBackend}
            onChange={handleDnsBackend}
            id="horzontal-form-dns-backend"
            name="horizontal-form-dns-backend"
            aria-label="DNS Backend"
                        >
                            {dnsBackendOptions.map((option, index) => (
                                <FormSelectOption key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup label="DNS Forwarder IP Address" isRequired fieldId="horizontal-form-dns-forwarder">
                        <TextInput
                            value={dnsforwarder}
                            onChange={handleDnsForwarder}
                            type="text"
                            id="horizontal-form-dns-forwarder"
                            name="horizontal-form-dns-forwarder"
                            placeholder="8.8.8.8"
                        />
                    </FormGroup>
                    <FormGroup
                    label="Password"
                    isRequired
                    isValid={isValidPassword}
                    fieldId="horizontal-form-password1"
                    helperText={helperText}
                    helperTextInvalid={helperTextInvalid}
                    validated={isValidated}
                    >
                        <TextInput
                            value={password1}
                            onChange={handlePassword1Change}
                            type="password"
                            id="horizontal-form-password1"
                            name="horizontal-form-password1"
                            isValid={isValidPassword}
                            validated={isValidated}
                        />
                    </FormGroup>
                    <FormGroup
                    label="Retype Password"
                    isRequired
                    fieldId="horizontal-form-password2"
                    isValid={isValidPassword}
                    helperText={helperText}
                    helperTextInvalid={helperTextInvalid}
                    validated={isValidated}
                    >
                        <TextInput
                            value={password2}
                            onChange={handlePassword2Change}
                            type="password"
                            id="horizontal-form-password2"
                            name="horizontal-form-password2"
                            isValid={isValidPassword}
                            validated={isValidated}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}

export default ProvisionModal;
