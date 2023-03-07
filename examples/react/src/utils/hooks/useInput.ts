import { ChangeEvent, useState } from "react";

import { validators } from "../validators";
import {FormInput} from '../../models/FormInput';

const messages: Record<string, string> = {
	email: 'Please enter a valid e-mail.',
	password: 'Password field is required.',
	currentPassword: 'Current password field is required.',
	newPassword: 'New password field is required.',
	confirmPassword: 'Passwords don\'t match.',
};

const useInput = (initialValue: string, inputType: string): FormInput => {
	const [value, setValue] = useState(initialValue);
	const [hasError, setHasError] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const [message, setMessage] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>, compareValue?: string): void => {
		let isInputValid: boolean = false;
		const eventValue = e.currentTarget.value;

		if (typeof eventValue === 'undefined') {
			return;
		}

		!isTouched && setIsTouched(true);
		isInputValid = validators[inputType](eventValue, compareValue);
		isInputValid ? setMessage('') : setMessage(messages[inputType]);
		setHasError(!isInputValid);
		setValue(eventValue);
	};

	return {
		value,
		onChange,
		hasError,
		isTouched,
		message
	};
};

export default useInput;
