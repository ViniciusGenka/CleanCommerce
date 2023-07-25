export default interface NotifyPaymentUpdate {
	execute(paymentNotification: any): Promise<void>;
}
