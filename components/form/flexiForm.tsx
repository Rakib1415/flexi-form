'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, Ref, useImperativeHandle } from 'react';
import {
	Control,
	DefaultValues,
	FieldValues,
	FormState,
	Path,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from 'react-hook-form';
import { z, ZodType } from 'zod';
import { Form } from '../ui/form';
import { FieldArray } from './FieldArray';
import { TextField } from './fields/TextField';
import { TextAreaField } from './fields/TextAreaField';
import { UniqueTextField } from './fields/UniqueTextField';
import { SwitchField } from './fields/SwitchField';
import { SelectField } from './fields/SelectField';
import { RadioGroupField } from './fields/RadioGroupField';
import { PasswordField } from './fields/PasswordField';
import { ImageUploadField } from './fields/ImageUploadField';
import { DateField } from './fields/DateField';
import { DateTimeField } from './fields/DateTimeField';
import { CheckboxField } from './fields/CheckboxField';
import { CheckboxGroupField } from './fields/CheckboxGroupField';

export type FlexiFormRef<T extends FieldValues> = {
	getValues: () => T;
	reset: (values?: Partial<T>) => void;
	setValue: (name: keyof T, value: T[keyof T]) => void;
	formState: FormState<T>;
	control: Control<T>;
	form: UseFormReturn<T>;
};

export type FlexiFormProps<TSchema extends ZodType> = {
	schema: TSchema;
	defaultValues: Partial<z.infer<TSchema>>;
	onSubmit: SubmitHandler<z.infer<TSchema>>;
	children: ReactNode;
	ref: Ref<FlexiFormRef<z.infer<TSchema>>>;
	mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'all';
} & React.ComponentPropsWithoutRef<'form'>;

/**
 * A Flexi form component.
 * @param schema The schema of the form.
 * @param defaultValues The initial values of the form.
 * @param onSubmit The submit handler of the form.
 * @param children The children of the form.
 * @param ref The reference of the form.
 *
 * @returns The Flexi form component.
 */

export const FlexiForm = <TSchema extends ZodType>({
	ref,
	defaultValues,
	schema,
	onSubmit,
	children,
	mode = 'onChange',
}: FlexiFormProps<TSchema>) => {
	const form = useForm<z.infer<TSchema>>({
		defaultValues : defaultValues as DefaultValues<z.infer<TSchema>>,
		resolver: zodResolver(schema),
		mode,
	});

	useImperativeHandle(ref, () => {
		type TFormValues = z.infer<TSchema>;

		return {
			getValues: form.getValues,
			reset: (values?: Partial<TFormValues>) =>
				form.reset(values as TFormValues),
			setValue: (
				name: keyof TFormValues,
				value: TFormValues[keyof TFormValues]
			) => form.setValue(name as Path<TFormValues>, value),
			formState: form.formState,
			control: form.control,
			form: form,
		};
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
		</Form>
	);
};

FlexiForm.displayName = 'FlexiForm';

FlexiForm.ArrayField = FieldArray;
FlexiForm.TextField = TextField;
FlexiForm.TextAreaField = TextAreaField;
FlexiForm.UniqueTextField = UniqueTextField;
FlexiForm.SwitchField = SwitchField;
FlexiForm.SelectField = SelectField;
FlexiForm.RadioGroupField = RadioGroupField;
FlexiForm.PasswordField = PasswordField;
FlexiForm.ImageUploadField = ImageUploadField;
FlexiForm.DateField = DateField;
FlexiForm.DateTimeField = DateTimeField;
FlexiForm.CheckboxField = CheckboxField;
FlexiForm.CheckboxGroupField = CheckboxGroupField;