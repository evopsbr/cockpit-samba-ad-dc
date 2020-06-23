import cockpit from 'cockpit';
import React, { useState } from 'react';
import { RenderError, Loading } from '../common';
import {
    Form,
    FormGroup,
    TextInput,
    Button,
    Card,
    CardBody,
    CardHeader,
    ActionGroup,
} from '@patternfly/react-core';

export default function DomainInfo() {
    const [info, setInfo] = useState();
    const [ipAddress, setIPAdress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleIPAddressChange = (e) => {
        setIPAdress(e);
    };

    const getDomainInfo = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool domain info ${ipAddress}`;
        const script = () => cockpit.script(command, { superuser: true, err: "message" })
                .then((data) => {
                    setInfo(data);
                    setLoading(false);
                })
                .catch((exception) => {
                    if (exception != null) {
                        setError(exception.message);
                        setAlertVisible(true);
                        setLoading(false);
                    }
                });
        return script();
    };

    return (
        <>
            <div>
                <Form isHorizontal onSubmit={getDomainInfo}>
                    <FormGroup
                    label="IP Address"
                    isRequired
                    fieldId="horizontal-form-ip-address"
                    helperText="Enter an IP Address"
                    >
                        <TextInput
                        value={ipAddress}
                        type="text"
                        id="horizontal-form-ip-address"
                        aria-describedby="horizontal-form-ip-address-helper"
                        name="horizontal-form-ip-address"
                        onChange={handleIPAddressChange}
                        placeholder="127.0.0.1"
                        />
                    </FormGroup>
                    <ActionGroup>
                        <Button variant="primary" type="submit">Submit</Button>
                    </ActionGroup>
                </Form>
                <Card isHoverable>
                    <CardHeader>Domain Info</CardHeader>
                    <CardBody>{info}</CardBody>
                </Card>
                <Loading loading={loading} />
                <RenderError error={error} hideAlert={hideAlert} alertVisible={alertVisible} />
            </div>
        </>
    );
}
