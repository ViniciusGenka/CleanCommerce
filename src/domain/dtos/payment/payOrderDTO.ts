export type PayOrderDTO = {
	method: string;
	payment_method_id?: string;
	issuer_id?: string;
	token?: string;
	installments?: string;
	identificationNumber?: string;
	identificationType?: string;
	payer?: {
		email: string;
		identification: {
			type: string;
			number: string;
		};
	};
};
