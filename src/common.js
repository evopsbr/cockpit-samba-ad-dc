import React from 'react';
import {
    Alert,
    AlertActionCloseButton,
    Spinner,
    Button,
    AlertGroup,
    AlertVariant
} from '@patternfly/react-core';
import { AngleLeftIcon } from '@patternfly/react-icons';
import './css/common.css';

export const RenderError = (props) => {
    const hideAlert = props.hideAlert;
    if (props.alertVisible) {
        return (
            <Alert
            variant="danger"
            title="An Error Occurred"
            actionClose={<AlertActionCloseButton onClose={hideAlert} />}
            >
                {props.error}
            </Alert>
        );
    }
    return <div />;
};

export const Success = (props) => {
    const hideAlert = props.hideAlert;
    if (props.alertVisible) {
        return (
            <Alert
            variant="success"
            title="Success"
            actionClose={<AlertActionCloseButton onClose={hideAlert} />}
            >
                {props.message}
            </Alert>
        );
    }
    return <div />;
};

export const Loading = (props) => {
    if (props.loading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }
    return <div />;
};

export const BackButton = () => {
    return (
        <div className="back-button">
            <Button variant="tertiary" onClick={() => history.back()}>
                <AngleLeftIcon />
                Back
            </Button>
        </div>
    );
};

export const ErrorToast = ({ errorMessage, closeModal }) => {
    return (
        <AlertGroup isToast>
            <Alert
            isLiveRegion
            variant={AlertVariant.danger}
            title="An Error Occurred"
            actionClose={
                <AlertActionCloseButton
                    title="Close Error Alert Toast"
                    variantLabel="Danger Alert"
                    onClose={closeModal}
                />
            }
            >
                <p>{errorMessage}</p>
            </Alert>
        </AlertGroup>
    );
};

export const SuccessToast = ({ successMessage, closeModal }) => {
    return (
        <AlertGroup isToast>
            <Alert
        isLiveRegion
        variant={AlertVariant.success}
        title="Success"
        actionClose={
            <AlertActionCloseButton
                title="Close Success Alert Toast"
                variantLabel="Success Alert"
                onClose={closeModal}
            />
        }
            >
                <p>{successMessage}</p>
            </Alert>
        </AlertGroup>
    );
};
