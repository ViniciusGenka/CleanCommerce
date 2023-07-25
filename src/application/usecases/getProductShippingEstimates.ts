export default interface GetProductShippingEstimates {
	execute(
		postalCode: string,
		productId: string
	): Promise<{ shippingCost: number; shippingTime: number }>;
}
