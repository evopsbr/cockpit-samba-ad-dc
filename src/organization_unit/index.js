import React from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import ListObjects from './listobjects';
import Create from './create';
import Delete from './delete';
import Move from './move';
import Rename from './rename';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';
import { BackButton } from '../common';

export default function OrgUnit() {
    return (
        <>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Create />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Delete />
                        </ToolbarItem>
                        <ToolbarItem>
                            <ListObjects />
                        </ToolbarItem>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Move />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Rename />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
            <List />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<OrgUnit />, document.getElementById("org-unit"));
});
