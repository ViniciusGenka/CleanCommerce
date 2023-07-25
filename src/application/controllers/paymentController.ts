export default interface PaymentController {
	notifyPaymentUpdate(params: any, body: any): Promise<void>;
}
