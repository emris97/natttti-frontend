import type { InferType, Schema, ValidationError } from 'yup';

type ValidateSchemaErrors<T extends Schema> = Partial<Record<keyof InferType<T>, ValidationError>>;

type IsErrorResult<T extends Schema> = {
	isError: true;
	errors: ValidateSchemaErrors<T>;
	data: undefined;
};

type IsValidResult<T extends Schema> = {
	isError: false;
	errors: ValidateSchemaErrors<T>;
	data: InferType<T>;
};

export type ValidateSchemaResult<T extends Schema> = IsErrorResult<T> | IsValidResult<T>;

export const validateSchema = <T extends Schema>(
	schema: Schema,
	data: InferType<T>
): ValidateSchemaResult<T> => {
	const errors: ValidateSchemaResult<T>['errors'] = {};
	let resultData: typeof data | undefined = undefined;

	try {
		const result = schema.validateSync(schema.cast(data), {
			abortEarly: false
		});
		resultData = result;
	} catch (_error) {
		const { inner } = _error as ValidationError;
		inner?.forEach((err) => {
			errors[err.path as keyof typeof errors] = { ...err };
		});
	}

	const isError = Object.keys(errors).length > 0;

	//@ts-ignore
	return {
		isError,
		errors,
		data: resultData
	};
};
