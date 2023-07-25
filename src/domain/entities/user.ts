import Role from "./role";

export default class User {
	public email: string;
	public id: string | null;
	public roles?: Role[];
	public name: string;
	public password: string;

	constructor(email: string, name: string, password: string, roles: Role[] = [], id: string = null) {
		this.email = email;
		this.id = id;
		this.roles = roles;
		this.name = name;
		this.password = password;
	}
}
