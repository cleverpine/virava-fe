import { ChangeEvent } from 'react';

export interface FormInput {
	readonly value: string;
	readonly onChange: (e: ChangeEvent<HTMLInputElement>, compareValue?: string) => void;
	readonly hasError: boolean;
	readonly isTouched: boolean;
	readonly message: string;
}
