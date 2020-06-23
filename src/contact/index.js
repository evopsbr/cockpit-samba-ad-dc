import React from 'react';
import ReactDOM from 'react-dom';
import Create from './create';
import List from './list';
import Show from './show';
import Delete from './delete';
import './index.css';
import { BackButton } from '../common';
import { Toolbar, ToolbarItem, ToolbarGroup, ToolbarContent } from '@patternfly/react-core';

export default function Contact() {
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
                            <Show />
                        </ToolbarItem>
                    </ToolbarGroup>
                </ToolbarContent>
            </Toolbar>
            <List />
        </>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Contact />, document.getElementById("contact"));
});
