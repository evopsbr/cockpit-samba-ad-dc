import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import { Loading, RenderError } from '../common';
import {
    Card,
    CardBody,
    CardHeader,
    InputGroup,
    Button,
    ButtonVariant,
    TextInput
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

export default function OUList() {
    const [list, setList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onSearchInputChange = (value) => setSearchValue(value);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const filteredList = list.filter((ou) => ou.includes(searchValue)).map(filteredList =>
        <li key={filteredList.toString()}>
            {filteredList}
        </li>
    );

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool ou list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    const sortedData = splitData.sort();
                    setList(sortedData);
                    setLoading(false);
                })
                .catch((exception) => {
                    setError(exception.message);
                    setAlertVisible(true);
                    setLoading(false);
                });
        script();
    }, []);

    return (
        <>
            <div>
                <InputGroup>
                    <TextInput
                    name="OUSearchInput"
                    id="OUSearchInput"
                    type="search"
                    aria-label="search organization units"
                    onChange={onSearchInputChange}
                    value={searchValue}
                    />
                    <Button
                    variant={ButtonVariant.control}
                    aria-label="search button to search OU"
                    >
                        <SearchIcon />
                    </Button>
                </InputGroup>
                <Card>
                    <CardHeader>Organization Units</CardHeader>
                    <CardBody>
                        <Loading loading={loading} />
                        <RenderError hideAlert={hideAlert} error={error} alertVisible={alertVisible} />
                        {filteredList}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
