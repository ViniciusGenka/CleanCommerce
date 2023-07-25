export default class Address {
	public id: string | null;
	public userId: string;
	public contactFullName: string;
	public contactPhoneNumber: string;
	public postalCode: string;
	public state: string;
	public city: string;
	public neighborhood: string;
	public street: string;
	public streetNumber: number;
	public complement: string;

	constructor(
		city: string,
		complement: string,
		contactFullName: string,
		contactPhoneNumber: string,
		neighborhood: string,
		postalCode: string,
		state: string,
		street: string,
		streetNumber: number,
		userId: string,
		id?: string
	) {
		this.city = city;
		this.complement = complement;
		this.contactFullName = contactFullName;
		this.contactPhoneNumber = contactPhoneNumber;
		this.id = id ? id : null;
		this.neighborhood = neighborhood;
		this.postalCode = postalCode;
		this.state = state;
		this.street = street;
		this.streetNumber = streetNumber;
		this.userId = userId;
	}
}
