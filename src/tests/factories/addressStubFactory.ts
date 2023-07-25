import Address from "../../domain/entities/address"

export class AddressStubFactory {
    static create(): jest.Mocked<Address> {
        const AddressObject: jest.Mocked<Address> = {
            id: "any_address_id",
            userId: "any_user_id",
            contactFullName: "any full name",
            contactPhoneNumber: "00000000000",
            postalCode: "00000000",
            state: "any_state",
            city: "any_city",
            neighborhood: "any_neighborhood",
            street: "any_street",
            streetNumber: 0,
            complement: "any_complement",
        }
        return AddressObject
    }
}