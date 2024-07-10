import { Table, BaseSchema, Route, TableItem, createModel, createSchema } from '@lcdp-js/core';
import { ApiType } from './interface';
@Route({
	label: '用户列表',
	path: '/admin/user/list',
	icon: 'icon-user'
})
@Table<User, ApiType>({
	name: '用户',
	apiKey: 'user',
	renderInSearch: (s) => `${s.nickname}-${s.uid}`
})
export class User extends BaseSchema {
	@TableItem({ label: '昵称', searchable: true, attributes: { width: 600 } })
	nickname!: string;

	@TableItem({ label: '头像', render: (val) => val || '---' })
	avatar!: string;

	@TableItem({ label: '邮箱', searchable: true, render: (val) => val || '---' })
	email!: string;

	@TableItem({ label: '密码', searchable: true, render: (val) => val || '---' })
	password!: string;
}

export const UserModel = createModel<User>(
	User.name,
	createSchema<User>({
		nickname: { type: String, default: '无名称' },
		avatar: { type: String },
		email: { type: String, index: true, default: '' },
		password: { type: String, index: true, default: '' }
	})
);
