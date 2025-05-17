/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export type FlexiFormContext<TFormValues extends FieldValues = any> = {
	control: Control<TFormValues>;
};

export const FlexiFormContext = createContext<null | FlexiFormContext>(
	null
);

/**
 * A hook to use the form context.
 * @returns The form context.
 */

export const useFlexiFormContext = <
	TFormValues extends FieldValues = any
>() => {
	const context = useContext(FlexiFormContext);
	if (!context) {
		throw new Error('Form fields must be used within a FlexiForm.');
	}
	return context as FlexiFormContext<TFormValues>;
};