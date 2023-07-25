const mp = new MercadoPago('TEST-b952a198-c7be-48d7-a2e6-a7ab2dc2d23e');

document
	.getElementById('form-login__submit')
	.addEventListener('click', async function (event) {
		event.preventDefault();
		const email = document.getElementById('form-login__email').value;
		const password = document.getElementById('form-login__password').value;

		const response = await fetch('http://localhost:3000/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		const accessToken = await response.json();
		Cookies.set('access_token', accessToken);
		console.log(Cookies.get('access_token'));
	});

document
	.getElementById('send-message')
	.addEventListener('click', async function (event) {
		event.preventDefault();
	});

document
	.getElementById('form-checkout-pix__submit')
	.addEventListener('click', async function (event) {
		event.preventDefault();
		const accessToken = Cookies.get('access_token');
		const email = document.getElementById('form-checkout-pix__email').value;
		const identificationNumber = document.getElementById(
			'form-checkout-pix__identificationNumber'
		).value;

		await fetch(
			'http://localhost:3000/orders/ec95fe6f-c3d9-41cd-bdbd-44f3165f62fa/pay',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					paymentData: {
						method: 'pix',
						payment_method_id: 'pix',
						description: 'Descrição do produto',
						payer: {
							email,
							identification: {
								type: 'CPF',
								number: identificationNumber,
							},
						},
					},
				}),
			}
		)
			.then(function (data) {
				return data.json();
			})
			.then(function (data) {
				const qrcodeBase64 =
					data.response.point_of_interaction.transaction_data.qr_code_base64;
				console.log(qrcodeBase64);
				const qrCodeContainer = document.getElementById('qrcode__container');
				const qrCodeImg = document.createElement('img');
				qrCodeImg.src = 'data:image/png;base64,' + qrcodeBase64;
				qrCodeContainer.appendChild(qrCodeImg);
			})
			.catch(function (err) {
				console.error(err);
			});
	});

const cardForm = mp.cardForm({
	amount: '100.5',
	iframe: true,
	form: {
		id: 'form-checkout',
		cardNumber: {
			id: 'form-checkout__cardNumber',
			placeholder: 'Número do cartão',
		},
		expirationDate: {
			id: 'form-checkout__expirationDate',
			placeholder: 'MM/YY',
		},
		securityCode: {
			id: 'form-checkout__securityCode',
			placeholder: 'Código de segurança',
		},
		cardholderName: {
			id: 'form-checkout__cardholderName',
			placeholder: 'Titular do cartão',
		},
		issuer: {
			id: 'form-checkout__issuer',
			placeholder: 'Banco emissor',
		},
		installments: {
			id: 'form-checkout__installments',
			placeholder: 'Parcelas',
		},
		identificationType: {
			id: 'form-checkout__identificationType',
			placeholder: 'Tipo de documento',
		},
		identificationNumber: {
			id: 'form-checkout__identificationNumber',
			placeholder: 'Número do documento',
		},
		cardholderEmail: {
			id: 'form-checkout__cardholderEmail',
			placeholder: 'E-mail',
		},
	},
	callbacks: {
		onFormMounted: (error) => {
			if (error) return console.warn('Form Mounted handling error: ', error);
			console.log('Form mounted');
		},
		onSubmit: (event) => {
			event.preventDefault();

			const {
				paymentMethodId: payment_method_id,
				issuerId: issuer_id,
				cardholderEmail: email,
				amount,
				token,
				installments,
				identificationNumber,
				identificationType,
			} = cardForm.getCardFormData();

			const accessToken = Cookies.get('access_token');
			console.log('Access token: ', accessToken);

			console.log(
				'payment_method_id: ' +
				payment_method_id +
				' type: ' +
				typeof payment_method_id,
				'issuer_id: ' + issuer_id + ' type: ' + typeof issuer_id,
				'email: ' + email + ' type: ' + typeof email,
				'amount: ' + amount + ' type: ' + typeof amount,
				'token: ' + token + ' type: ' + typeof token,
				'installments: ' + installments + ' type: ' + typeof installments,
				'identificationNumber: ' +
				identificationNumber +
				' type: ' +
				typeof identificationNumber,
				'identificationType: ' +
				identificationType +
				' type: ' +
				typeof identificationType
			);

			fetch(
				'http://localhost:3000/orders/f0e96534-6692-4368-8204-a32c428fd852/pay',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						paymentData: {
							method: 'credit_card',
							token,
							issuer_id,
							payment_method_id,
							transaction_amount: Number(amount),
							installments: Number(installments),
							description: 'Descrição do produto',
							payer: {
								email,
								identification: {
									type: identificationType,
									number: identificationNumber,
								},
							},
						},
					}),
				}
			)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (err) {
					console.error(err);
				});
		},
		onFetching: (resource) => {
			console.log('Fetching resource: ', resource);
			const progressBar = document.querySelector('.progress-bar');
			progressBar.removeAttribute('value');

			return () => {
				progressBar.setAttribute('value', '0');
			};
		},
	},
});
