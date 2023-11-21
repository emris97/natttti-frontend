/* eslint-disable boundaries/element-types */
import { array, object } from 'yup';
import { UsersSchema } from '$entities/users';
import { PocketBaseSchema } from '$shared/model';

export class GiftEventMembersSchema {
	static fields = object({
		user: UsersSchema.record.required(),
		targets: array(UsersSchema.record).default([]).required(),
		gifts: array().default([]).required()
	});

	static create = this.fields;

	static update = this.fields;

	static record = this.fields.concat(PocketBaseSchema.base);
}
