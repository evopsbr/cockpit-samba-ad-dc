import React from 'react';
import {
    Card,
    CardBody,
    Gallery,
    GalleryItem,
    Page,
    PageSection,
} from '@patternfly/react-core';

export default function Dashboard() {
    return (
        <>
            <Page>
                <PageSection>
                    <Gallery hasGutter>
                        <GalleryItem>
                            <a href="computer/computer.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Computer Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="domain/domain.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Domain Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="contact/contact.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Contact Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="user/user.html" role="link">
                                <Card isHoverable>
                                    <CardBody>User Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="sites/sites.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Sites Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="time/time.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Time</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                        <GalleryItem>
                            <a href="organization_unit/orgunit.html" role="link">
                                <Card isHoverable>
                                    <CardBody>Organization Units Management</CardBody>
                                </Card>
                            </a>
                        </GalleryItem>
                    </Gallery>
                </PageSection>
            </Page>
        </>
    );
}
