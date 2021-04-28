import React, { useState } 	from 'react';
import { useMutation, useApolloClient }     from '@apollo/client';
import { UPDATE }			from '../../cache/mutations';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
    const client = useApolloClient();
    const [input, setInput] = useState({ email: props.user.email, password: '', firstName: props.user.firstName, lastName: props.user.lastName});
	const [loading, toggleLoading] = useState(false);
    const [showErr, displayErrorMsg] = useState(false);
    const errorMsg = "Email already in use";
    const [Update] = useMutation(UPDATE)

    const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

    const handleUpdateAccount = async (e) => {
        const updated = { ...input, oldEmail: props.user.email };
		const { loading, error, data } = await Update({ variables: { ...updated } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			if(data.update.email === 'already exists') {
				displayErrorMsg(true);
			    return;
			}
			else {
				props.setShowUpdate(false);
            }

		};
	};

    return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
										barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" defaultValue = {props.user.firstName}
									/>
								</WCol>
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
										barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" defaultValue = {props.user.lastName}
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" defaultValue = {props.user.email}
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" defaultValue = {props.user.password}
							/>
                            {
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Update
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;
