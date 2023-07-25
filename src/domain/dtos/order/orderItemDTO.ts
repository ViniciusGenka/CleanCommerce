import { AddressDTO } from '../address/addressDTO';

export type OrderItemDTO = {
	id: string;
	estimatedShippingTime: number;
	price: number;
	quantity: number;
	stockAddress: AddressDTO;
	title: string;
};
