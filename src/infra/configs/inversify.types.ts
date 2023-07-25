const TYPES = {
	//Controllers
	AuthController: Symbol.for('AuthController'),
	OrderController: Symbol.for('OrderController'),
	PaymentController: Symbol.for('PaymentController'),
	ProductController: Symbol.for('ProductController'),
	RoleController: Symbol.for('RoleController'),
	UserController: Symbol.for('UserController'),
	//Use Cases
	AddCategoriesToProducts: Symbol.for('AddCategoriesToProducts'),
	AddCategories: Symbol.for('AddCategories'),
	AddDiscountCoupons: Symbol.for('AddDiscountCoupons'),
	AddPermissionsToRoles: Symbol.for('AddPermissionsToRoles'),
	AddProducts: Symbol.for('AddProducts'),
	AddProductQuestion: Symbol.for('AddProductQuestion'),
	AddProductQuestionAnswer: Symbol.for('AddProductQuestionAnswer'),
	AddProductReview: Symbol.for('AddProductReview'),
	AddPromotions: Symbol.for('AddPromotions'),
	AddPromotionsToCategories: Symbol.for('AddPromotionsToCategories'),
	AddPromotionsToProducts: Symbol.for('AddPromotionsToProducts'),
	AddRoles: Symbol.for('AddRoles'),
	AddRolesToUsers: Symbol.for('AddRolesToUsers'),
	GetDiscountCouponDetailsByDiscountCode: Symbol.for('GetDiscountCouponDetailsByDiscountCode'),
	GetProductDetails: Symbol.for('GetProductDetails'),
	GetProductShippingEstimates: Symbol.for('GetProductShippingEstimates'),
	AddUserAddress: Symbol.for('AddUserAddress'),
	GetOrderDetails: Symbol.for('GetOrderDetails'),
	GetUserAddresses: Symbol.for('GetUserAddresses'),
	GetUserOrders: Symbol.for('GetUserOrders'),
	GetUserProfile: Symbol.for('GetUserProfile'),
	NotifyPaymentUpdate: Symbol.for('NotifyPaymentUpdate'),
	PlaceOrder: Symbol.for('PlaceOrder'),
	PayOrder: Symbol.for('PayOrder'),
	SendMessageInOrderItemChat: Symbol.for('SendMessageInOrderItemChat'),
	UpdateUserProfile: Symbol.for('UpdateUserProfile'),
	UserSignIn: Symbol.for('UserSignIn'),
	UserSignUp: Symbol.for('UserSignUp'),
	//Repositories
	AddressRepository: Symbol.for('AddressRepository'),
	CategoryRepository: Symbol.for('CategoryRepository'),
	DiscountCouponRepository: Symbol.for('DiscountCouponRepository'),
	OrderRepository: Symbol.for('OrderRepository'),
	PermissionRepository: Symbol.for('PermissionRepository'),
	ProductRepository: Symbol.for('ProductRepository'),
	PromotionRepository: Symbol.for('PromotionRepository'),
	RoleRepository: Symbol.for('RoleRepository'),
	UserRepository: Symbol.for('UserRepository'),
	//Services
	CalculateOrderShippingCostService: Symbol.for(
		'CalculateOrderShippingCostService'
	),
	CalculateRouteShippingCostService: Symbol.for(
		'CalculateRouteShippingCostService'
	),
	CalculateRouteShippingTimeService: Symbol.for(
		'CalculateRouteShippingTimeService'
	),
	EmailService: Symbol.for('EmailService'),
	PaymentService: Symbol.for('PaymentService'),
	VerifyAccessTokenService: Symbol.for('VerifyAccessTokenService'),
	CompareUserPasswordsService: Symbol.for('CompareUserPasswordsService'),
	GenerateAccessTokenService: Symbol.for('GenerateAccessTokenService'),
	HashUserPasswordService: Symbol.for('HashUserPasswordService'),
	WebSocketEventService: Symbol.for('WebSocketEventService'),
	//Validators
	EmailValidator: Symbol.for('EmailValidator'),
	PasswordValidator: Symbol.for('PasswordValidator'),
	PostalCodeValidator: Symbol.for('PostalCodeValidator'),
	ProductQuestionValidator: Symbol.for('ProductQuestionValidator'),
	ProductQuestionAnswerValidator: Symbol.for('ProductQuestionAnswerValidator'),
	ProductReviewValidator: Symbol.for('ProductReviewValidator'),
	UsernameValidator: Symbol.for('UsernameValidator'),
	//teste
	SocketIOServer: Symbol.for('Server'),
};

export { TYPES };
