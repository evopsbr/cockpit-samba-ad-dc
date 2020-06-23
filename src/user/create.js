import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    TextInput,
    Modal,
    Button
} from '@patternfly/react-core';
import cockpit from 'cockpit';
import {
    Loading,
    SuccessToast,
    ErrorToast
} from '../common';

export default function Create(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userou, setUserou] = useState("");
    const [surname, setSurname] = useState("");
    const [initials, setInitials] = useState("");
    const [givenName, setGivenName] = useState("");
    const [profilePath, setProfilePath] = useState("");
    const [scriptPath, setScriptPath] = useState("");
    const [homeDrive, setHomeDrive] = useState("");
    const [homeDirectory, setHomeDirectory] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [mailAddress, setMailAddress] = useState("");
    const [internetAddress, setInternetAddress] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [physicalDeliveryOffice, setPhysicalDeliveryOffice] = useState("");
    const [nisDomain, setNisDomain] = useState("");
    const [unixHome, setUnixHome] = useState("");
    const [uid, setUid] = useState("");
    const [uidNumber, setUidNumber] = useState("");
    const [gidNumber, setGidNumber] = useState("");
    const [gecos, setGecos] = useState("");
    const [loginShell, setLoginShell] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);

    const handleUsernameInputChange = (value) => {
        setUsername(value);
    };

    const handlePasswordInputChange = (value) => {
        setPassword(value);
    };

    const handleUserouInputChange = (value) => {
        setUserou(value);
    };

    const handleSurnameInputChange = (value) => {
        setSurname(value);
    };

    const handleInitialsInputChange = (value) => {
        setInitials(value);
    };

    const handleGivenNameInputChange = (value) => {
        setGivenName(value);
    };

    const handleProfilePathInputChange = (value) => {
        setProfilePath(value);
    };

    const handleScriptPathInputChange = (value) => {
        setScriptPath(value);
    };

    const handleHomeDriveInputChange = (value) => {
        setHomeDrive(value);
    };

    const handleHomeDirectoryInputChange = (value) => {
        setHomeDirectory(value);
    };

    const handleJobTitleInputChange = (value) => {
        setJobTitle(value);
    };

    const handleDepartmentInputChange = (value) => {
        setDepartment(value);
    };

    const handleCompanyInputChange = (value) => {
        setCompany(value);
    };

    const handleDescriptionInputChange = (value) => {
        setDescription(value);
    };

    const handleMailAddressInputChange = (value) => {
        setMailAddress(value);
    };

    const handleInternetAddressInputChange = (value) => {
        setInternetAddress(value);
    };

    const handleTelephoneNumberInputChange = (value) => {
        setTelephoneNumber(value);
    };

    const handlePhysicalDeliveryOfficeChange = (value) => {
        setPhysicalDeliveryOffice(value);
    };

    const handleNisDomainInputChange = (value) => {
        setNisDomain(value);
    };

    const handleUnixHomeInputChange = (value) => {
        setUnixHome(value);
    };

    const handleUidInputChange = (value) => {
        setUid(value);
    };

    const handleUidNumberInputChange = (value) => {
        setUidNumber(value);
    };

    const handleGidNumberInputChange = (value) => {
        setGidNumber(value);
    };

    const handleGecosInputChange = (value) => {
        setGecos(value);
    };

    const handleLoginShellInputChange = (value) => {
        setLoginShell(value);
    };

    const handleModalToggle = () => {
        return (
            setIsModalOpen(!isModalOpen)
        );
    };

    const handleSubmit = () => {
        setLoading(true);
        const cmd = ["samba-tool", "user", "create", `${username}`, `${password}`];
        if (userou.length > 0) {
            cmd.push(`--userou=${userou}`);
        }
        if (surname.length > 0) {
            cmd.push(`--surname=${surname}`);
        }
        if (givenName.length > 0) {
            cmd.push(`--given-name=${givenName}`);
        }
        if (initials.length > 0) {
            cmd.push(`--initials=${initials}`);
        }
        if (profilePath.length > 0) {
            cmd.push(`--profile-path=${profilePath}`);
        }
        if (scriptPath.length > 0) {
            cmd.push(`--script-path=${scriptPath}`);
        }
        if (homeDrive.length > 0) {
            cmd.push(`--home-drive=${homeDrive}`);
        }
        if (homeDirectory.length > 0) {
            cmd.push(`--home-directory=${homeDirectory}`);
        }
        if (jobTitle.length > 0) {
            cmd.push(`--job-title=${jobTitle}`);
        }
        if (department.length > 0) {
            cmd.push(`--department=${department}`);
        }
        if (company.length > 0) {
            cmd.push(`--company=${company}`);
        }
        if (description.length > 0) {
            cmd.push(`--description=${description}`);
        }
        if (mailAddress.length > 0) {
            cmd.push(`--mail-address=${mailAddress}`);
        }
        if (internetAddress.length > 0) {
            cmd.push(`--internet-address=${internetAddress}`);
        }
        if (telephoneNumber.length > 0) {
            cmd.push(`--telephone-number=${telephoneNumber}`);
        }
        if (physicalDeliveryOffice.length > 0) {
            cmd.push(`--physical-delivery-office=${physicalDeliveryOffice}`);
        }
        if (nisDomain.length > 0) {
            cmd.push(`--nis-domain=${nisDomain}`);
        }
        if (unixHome.length > 0) {
            cmd.push(`--unix-home=${unixHome}`);
        }
        if (uid.length > 0) {
            cmd.push(`--uid=${uid}`);
        }
        if (uidNumber.length > 0) {
            cmd.push(`--uid-number=${uidNumber}`);
        }
        if (gidNumber.length > 0) {
            cmd.push(`--gid-number=${gidNumber}`);
        }
        if (gecos.length > 0) {
            cmd.push(`--gecos=${gecos}`);
        }
        if (loginShell.length > 0) {
            cmd.push(`--login-shell=${loginShell}`);
        }
        const process = () => cockpit.spawn(cmd, { superuser: true, err: "message" })
                .then((data) => {
                    console.log(data);
                    setSuccessMessage(data);
                    setSuccessAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                })
                .catch((exception) => {
                    console.log(exception);
                    setErrorMessage(exception.message);
                    setErrorAlertVisible(true);
                    setLoading(false);
                    setIsModalOpen(false);
                });
        process();
    };
    return (
        <>
            {errorAlertVisible && <ErrorToast errorMessage={errorMessage} closeModal={() => setErrorAlertVisible(false)} />}
            {successAlertVisible && <SuccessToast successMessage={successMessage} closeModal={() => setSuccessAlertVisible(false)} />}
            <Button variant="primary" onClick={handleModalToggle}>
                Create User
            </Button>
            <Modal
                title="Create A New User"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                description="A dialog for creating new users"
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleSubmit}>
                        Create
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Loading key="loading" loading={loading} />
                ]}
                isFooterLeftAligned
                appendTo={document.body}
            >
                <Form isHorizontal onSubmit={handleSubmit}>
                    <FormGroup
                        label="Username"
                        fieldId="horizontal-form-username"
                        isRequired
                    >
                        <TextInput
                            value={username}
                            type="text"
                            id="horizontal-form-username"
                            aria-describedby="horizontal-form-username-helper"
                            name="horizontal-form-username"
                            onChange={handleUsernameInputChange}
                            placeholder="User1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        isRequired
                        fieldId="horizontal-form-password"
                    >
                        <TextInput
                            value={password}
                            type="password"
                            id="horizontal-form-password"
                            aria-describedby="horizontal-form-password-helper"
                            name="horizontal-form-password"
                            onChange={handlePasswordInputChange}
                            placeholder="PassW0rd!"
                        />
                    </FormGroup>
                    <FormGroup
                        label="User Organizational Unit"
                        fieldId="horizontal-form-userou"
                    >
                        <TextInput
                            value={userou}
                            type="text"
                            id="horizontal-form-userou"
                            aria-describedby="horizontal-form-userou-helper"
                            name="horizontal-form-userou"
                            onChange={handleUserouInputChange}
                            placeholder="OU=OrgUnit"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Surname"
                        fieldId="horizontal-form-surname"
                    >
                        <TextInput
                            value={surname}
                            type="text"
                            id="horizontal-form-surname"
                            aria-describedby="horizontal-form-surname-helper"
                            name="horizontal-form-surname"
                            onChange={handleSurnameInputChange}
                            placeholder="Jack"
                        />
                    </FormGroup>
                    <FormGroup
                        label="User Initials"
                        fieldId="horizontal-form-initials"
                    >
                        <TextInput
                            value={initials}
                            type="text"
                            id="horizontal-form-initials"
                            aria-describedby="horizontal-form-initials-helper"
                            name="horizontal-form-initials"
                            onChange={handleInitialsInputChange}
                            placeholder="Daniels"
                        />
                    </FormGroup>
                    <FormGroup
                        label="User Given Name"
                        fieldId="horizontal-form-given-name"
                    >
                        <TextInput
                            value={givenName}
                            type="text"
                            id="horizontal-form-given-name"
                            aria-describedby="horizontal-form-given-name-helper"
                            name="horizontal-form-given-name"
                            onChange={handleGivenNameInputChange}
                            placeholder="Maker"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Profile Path"
                        fieldId="horizontal-form-profile-path"
                    >
                        <TextInput
                            value={profilePath}
                            type="text"
                            id="horizontal-form-profile-path"
                            aria-describedby="horizontal-form-profile-path-helper"
                            name="horizontal-form-profile-path"
                            onChange={handleProfilePathInputChange}
                            placeholder="/home/profile/path"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Script Path"
                        fieldId="horizontal-form-script-path"
                    >
                        <TextInput
                            value={scriptPath}
                            type="text"
                            id="horizontal-form-script-path"
                            aria-describedby="horizontal-form-script-path-helper"
                            name="horizontal-form-script-path"
                            onChange={handleScriptPathInputChange}
                            placeholder="/home/script/path"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Home Drive"
                        fieldId="horizontal-form-home-drive"
                    >
                        <TextInput
                            value={homeDrive}
                            type="text"
                            id="horizontal-form-home-drive"
                            aria-describedby="horizontal-form-home-drive-helper"
                            name="horizontal-form-home-drive"
                            onChange={handleHomeDriveInputChange}
                            placeholder="/home/drive"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Home Directory"
                        fieldId="horizontal-form-home-dir"
                    >
                        <TextInput
                            value={homeDirectory}
                            type="text"
                            id="horizontal-form-home-dir"
                            aria-describedby="horizontal-form-home-dir-helper"
                            name="horizontal-form-home-dir"
                            onChange={handleHomeDirectoryInputChange}
                            placeholder="/home/dir"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Job Title"
                        fieldId="horizontal-form-job-title"
                    >
                        <TextInput
                            value={jobTitle}
                            type="text"
                            id="horizontal-form-job-title"
                            aria-describedby="horizontal-form-job-title-helper"
                            name="horizontal-form-job-title"
                            onChange={handleJobTitleInputChange}
                            placeholder="Supervisor"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Department"
                        fieldId="horizontal-form-department"
                    >
                        <TextInput
                            value={department}
                            type="text"
                            id="horizontal-form-department"
                            aria-describedby="horizontal-form-department-helper"
                            name="horizontal-form-department"
                            onChange={handleDepartmentInputChange}
                            placeholder="Accounting"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Company"
                        fieldId="horizontal-form-company"
                    >
                        <TextInput
                            value={company}
                            type="text"
                            id="horizontal-form-company"
                            aria-describedby="horizontal-form-company-helper"
                            name="horizontal-form-company"
                            onChange={handleCompanyInputChange}
                            placeholder="Daniels"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Description"
                        fieldId="horizontal-form-description"
                    >
                        <TextInput
                            value={description}
                            type="text"
                            id="horizontal-form-description"
                            aria-describedby="horizontal-form-description-helper"
                            name="horizontal-form-description"
                            onChange={handleDescriptionInputChange}
                            placeholder="Some Description"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Mail Address"
                        fieldId="horizontal-form-mail-address"
                    >
                        <TextInput
                            value={mailAddress}
                            type="text"
                            id="horizontal-form-mail-address"
                            aria-describedby="horizontal-form-mail-address-helper"
                            name="horizontal-form-mail-address"
                            onChange={handleMailAddressInputChange}
                            placeholder="daniels@company.com"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Internet Address"
                        fieldId="horizontal-form-internet-address"
                    >
                        <TextInput
                            value={internetAddress}
                            type="text"
                            id="horizontal-form-internet-address"
                            aria-describedby="horizontal-form-internet-address-helper"
                            name="horizontal-form-internet-address"
                            onChange={handleInternetAddressInputChange}
                            placeholder="Daniels"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Telephone Number"
                        fieldId="horizontal-form-telephone-number"
                    >
                        <TextInput
                            value={telephoneNumber}
                            type="text"
                            id="horizontal-form-telephone-number"
                            aria-describedby="horizontal-form-telephone-number-helper"
                            name="horizontal-form-telephone-number"
                            onChange={handleTelephoneNumberInputChange}
                            placeholder="+000000"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Physical Delivery Office"
                        fieldId="horizontal-form-physical-delivery"
                    >
                        <TextInput
                            value={physicalDeliveryOffice}
                            type="text"
                            id="horizontal-form-physical-delivery"
                            aria-describedby="horizontal-form-physical-delivery-helper"
                            name="horizontal-form-physical-delivery"
                            onChange={handlePhysicalDeliveryOfficeChange}
                            placeholder="A1"
                        />
                    </FormGroup>
                    <FormGroup
                        label="NIS Domain"
                        fieldId="horizontal-form-nis-domain"
                    >
                        <TextInput
                            value={nisDomain}
                            type="text"
                            id="horizontal-form-nis-domain"
                            aria-describedby="horizontal-form-nis-domain-helper"
                            name="horizontal-form-nis-domain"
                            onChange={handleNisDomainInputChange}
                            placeholder="Nis Domain"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Unix Home"
                        fieldId="horizontal-form-unix-home"
                    >
                        <TextInput
                            value={unixHome}
                            type="text"
                            id="horizontal-form-unix-home"
                            aria-describedby="horizontal-form-unix-home-helper"
                            name="horizontal-form-unix-home"
                            onChange={handleUnixHomeInputChange}
                            placeholder="Unix Home"
                        />
                    </FormGroup>
                    <FormGroup
                        label="UID"
                        fieldId="horizontal-form-uid"
                    >
                        <TextInput
                            value={uid}
                            type="text"
                            id="horizontal-form-uid"
                            aria-describedby="horizontal-form-uid-helper"
                            name="horizontal-form-uid"
                            onChange={handleUidInputChange}
                            placeholder="UID"
                        />
                    </FormGroup>
                    <FormGroup
                        label="UID Number"
                        fieldId="horizontal-form-uid-number"
                    >
                        <TextInput
                            value={uidNumber}
                            type="text"
                            id="horizontal-form-uid-number"
                            aria-describedby="horizontal-form-uid-number-helper"
                            name="horizontal-form-uid-number"
                            onChange={handleUidNumberInputChange}
                            placeholder="UID Number"
                        />
                    </FormGroup>
                    <FormGroup
                        label="GID"
                        fieldId="horizontal-form-gid-number"
                    >
                        <TextInput
                            value={gidNumber}
                            type="text"
                            id="horizontal-form-gid-number"
                            aria-describedby="horizontal-form-gid-number-helper"
                            name="horizontal-form-gid-number"
                            onChange={handleGidNumberInputChange}
                            placeholder="GID Number"
                        />
                    </FormGroup>
                    <FormGroup
                        label="GECOS"
                        fieldId="horizontal-form-gecos"
                    >
                        <TextInput
                            value={gecos}
                            type="text"
                            id="horizontal-form-gecos"
                            aria-describedby="horizontal-form-gecos-helper"
                            name="horizontal-form-gecos"
                            onChange={handleGecosInputChange}
                            placeholder="GECOS"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Login Shell"
                        fieldId="horizontal-form-login-shell"
                    >
                        <TextInput
                            value={loginShell}
                            type="text"
                            id="horizontal-form-login-shell"
                            aria-describedby="horizontal-form-login-shell-helper"
                            name="horizontal-form-login-shell"
                            onChange={handleLoginShellInputChange}
                            placeholder="Login Shell"
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}
