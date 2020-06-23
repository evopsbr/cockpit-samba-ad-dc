import React, { useState, useEffect } from 'react';
import cockpit from 'cockpit';
import {
    Card,
    CardBody,
    Button,
    ButtonVariant,
    InputGroup,
    TextInput
} from '@patternfly/react-core';
import { Loading, RenderError } from '../common';
import { SearchIcon } from '@patternfly/react-icons';

export default function List() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onSearchInputChange = (newValue) => {
        setSearchValue(newValue);
    };

    const filteredList = users.filter((name) => name.includes(searchValue)).map(filteredName =>
        <li key={filteredName.toString()}>
            {filteredName}
        </li>
    );

    const hideAlert = () => {
        setAlertVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        const command = `samba-tool user list`;
        const script = () => cockpit.script(command, { superuser: true, err: 'message' })
                .done((data) => {
                    const splitData = data.split('\n');
                    const sortedData = splitData.sort();
                    setUsers(sortedData);
                    setLoading(false);
                })
                .catch((exception) => {
                    setError(exception.message);
                    setLoading(false);
                });
        script();
    }, []);
    return (
        <>
            <InputGroup>
                <TextInput
                    name="textInput2"
                    id="textInput2" type="search"
                    aria-label="search users"
                    onChange={onSearchInputChange}
                    value={searchValue}
                />
                <Button
                    variant={ButtonVariant.control}
                    aria-label="search button for search users"
                >
                    <SearchIcon />
                </Button>
            </InputGroup>
            <Card>
                <CardBody>
                    <Loading loading={loading} />
                    <RenderError
                        error={error}
                        hideAlert={hideAlert}
                        isAlertVisible={alertVisible}
                    />
                    {filteredList}
                </CardBody>
            </Card>
        </>
    );
}
