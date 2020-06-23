import cockpit from 'cockpit';
import React, { useState, useEffect } from 'react';
import Provision from './provision-modal';
import { Spinner } from '@patternfly/react-core';
import Dashboard from './dashboard';

export default function GetServerRole() {
    const [addcStatus, setAdDcStatus] = useState();

    useEffect(() => {
        const command = 'samba-tool testparm --parameter-name=serverrole';
        cockpit.script(command, { superuser: true, err: "message" })
                .then((data) => {
                    if (data.includes("active directory domain controller")) {
                        setAdDcStatus(true);
                    } else {
                        setAdDcStatus(false);
                    }
                })
                .catch((exception) => {
                    console.log(exception);
                });
    }, []);

    const checkAD = () => {
        if (addcStatus) {
            return (
                <div>
                    <Dashboard />
                </div>
            );
        } else if (addcStatus === false) {
            return (
                <div>
                    <h1>No AD DC Found</h1>
                    <Provision />
                </div>
            );
        } else {
            return (
                <>
                    <Spinner />
                    <h1>Loading...</h1>
                </>
            );
        }
    };

    return (
        <>
            {checkAD()}
        </>
    );
}
