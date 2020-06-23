import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import Remove from './remove';
import CreateSubnet from './create_subnet';
import RemoveSubnet from './remove_subnet';
import SetSite from './set-site';
import './index.css';
import { BackButton } from '../common';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';

export default function Sites() {
    return (
        <div>
            <BackButton />
            <Toolbar>
                <ToolbarContent>
                    <ToolbarGroup>
                        <ToolbarItem>
                            <Create />
                        </ToolbarItem>
                        <ToolbarItem>
                            <Remove />
                        </ToolbarItem>
                        <ToolbarItem>
                            <CreateSubnet />
                        </ToolbarItem>
                        <ToolbarItem>
                            <RemoveSubnet />
                        </ToolbarItem>
                        <ToolbarItem>
                            <SetSite />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Sites />, document.getElementById("sites"));
});
