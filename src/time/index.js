import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import cockpit from 'cockpit';
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
import './css/time.css';
import {
    RenderError,
    Loading,
    BackButton
} from '../common';

export default function ServerTime() {
    const [serverTime, setServerTime] = useState();
    const [server, setServer] = useState("");
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const getServerTime = (e) => {
        e.preventDefault();
        setLoading(true);
        const command = `samba-tool time ${server}`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .then((data) => {
                    setServerTime(data);
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

    const handleServerChange = (e) => {
        setServer(e);
    };

    return (
        <>
            <BackButton />
            <div>
                <Form isHorizontal onSubmit={getServerTime}>
                    <FormGroup
                        label="Server"
                        isRequired
                        fieldId="horizontal-form-server"
                    >
                        <TextInput
                            value={server}
                            type="text"
                            id="horizontal-form-server"
                            aria-describedby="horizontal-form-server-helper"
                            name="horizontal-form-server"
                            onChange={handleServerChange}
                            placeholder="127.0.0.1"
                        />
                    </FormGroup>
                    <ActionGroup>
                        <Button variant="primary" type="submit">Submit</Button>
                    </ActionGroup>
                </Form>
                <Card isHoverable>
                    <CardHeader>Server Time</CardHeader>
                    <CardBody>{serverTime}</CardBody>
                </Card>
                <Loading loading={loading} />
                <RenderError error={error} hideAlert={hideAlert} alertVisible={alertVisible} />
            </div>
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<ServerTime />, document.getElementById("time"));
});
