import { FormInput } from "../models/FormInput";

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isEmailValid = (email: string): boolean => {
	if (!email) {
		return false;
	}

	return emailPattern.test(email);
};

export const isPasswordValid = (password: string): boolean => {
	return password.length > 0;
};

export const isConfirmPasswordValid = (confirmPassword: string, password: string): boolean => {
	return confirmPassword.length > 0 && confirmPassword === password;
};

export const isDisabledForm = (page: string, email: FormInput, password?: FormInput, confirmPassword?: FormInput): boolean => {
	switch (page) {
		case 'login':
			return !email.value || !password!.value || (email.isTouched && email.hasError)
				|| (password!.isTouched && password!.hasError);
		case 'register':
			return !email.value
			|| !password!.value
			|| !confirmPassword!.value
			|| (email.isTouched && email.hasError)
			|| (password!.isTouched && password!.hasError)
			|| (confirmPassword!.isTouched && confirmPassword!.hasError);
		default:
			return !email.value || (!!email.value && email.hasError);
	}
};

export const isChangePasswordFormDisabled = (
	email: FormInput,
	currentPassword: FormInput,
	newPassword: FormInput,
	confirmPassword: FormInput
) => {
	return !email.value
	|| !currentPassword.value
	|| !newPassword!.value
	|| !confirmPassword!.value
	|| (email.isTouched && email.hasError)
	|| (currentPassword!.isTouched && currentPassword!.hasError)
	|| (newPassword!.isTouched && newPassword!.hasError)
	|| (confirmPassword!.isTouched && confirmPassword!.hasError);
}

export const validators: Record<string, Function> = {
	email: isEmailValid,
	password: isPasswordValid,
	currentPassword: isPasswordValid,
	newPassword: isPasswordValid,
	confirmPassword: isConfirmPasswordValid,
};
