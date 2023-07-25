import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import ProductController from '../../application/controllers/productController';
import ProductControllerImpl from '../controllers/productControllerImpl';
import AddProductReview from '../../application/usecases/addProductReview';
import AddProducts from '../../application/usecases/addProducts';
import GetProductDetails from '../../application/usecases/getProductDetails';
import AddProductReviewImpl from '../usecases/addProductReviewImpl';
import AddProductsImpl from '../usecases/addProductsImpl';
import GetProductDetailsImpl from '../usecases/getProductDetailsImpl';
import AddressRepository from '../../application/repositories/addressRepository';
import OrderRepository from '../../application/repositories/orderRepository';
import ProductRepository from '../../application/repositories/productRepository';
import UserRepository from '../../application/repositories/userRepository';
import CalculateOrderShippingCostService from '../../domain/services/calculateOrderShippingCostService';
import CalculateRouteShippingCostService from '../../domain/services/calculateRouteShippingCostService';
import CalculateOrderShippingCostServiceImpl from '../services/domain/calculateOrderShippingCostServiceImpl';
import CalculateRouteShippingCostServiceImpl from '../services/domain/calculateRouteShippingCostServiceImpl';
import VerifyAccessTokenService from '../../application/services/verifyAccessTokenService';
import ProductRoutes from '../http/express/routes/productRoutes';
import VerifyAccessTokenServiceWithJWT from '../services/application/verifyAccessTokenServiceWithJWT';
import UserRoutes from '../http/express/routes/userRoutes';
import UserControllerImpl from '../controllers/userControllerImpl';
import UserController from '../../application/controllers/userController';
import AddUserAddress from '../../application/usecases/addUserAddress';
import AddUserAddressImpl from '../usecases/addUserAddressImpl';
import GetUserAddresses from '../../application/usecases/getUserAddresses';
import GetUserAddressesImpl from '../usecases/getUserAddressesImpl';
import GetUserOrders from '../../application/usecases/getUserOrders';
import GetUserOrdersImpl from '../usecases/getUserOrdersImpl';
import GetUserProfile from '../../application/usecases/getUserProfile';
import GetUserProfileImpl from '../usecases/getUserProfileImpl';
import UpdateUserProfile from '../../application/usecases/updateUserProfile';
import UpdateUserProfileImpl from '../usecases/updateUserProfileImpl';
import UserSignIn from '../../application/usecases/userSignIn';
import UserSignInImpl from '../usecases/userSignInImpl';
import CompareUserPasswordsServiceWithBcrypt from '../services/application/compareUserPasswordsServiceWithBcrypt';
import CompareUserPasswordsService from '../../application/services/compareUserPasswordsService';
import GenerateAccessTokenServiceWithJWT from '../services/application/generateAccessTokenServiceWithJWT';
import GenerateAccessTokenService from '../../application/services/generateAccessTokenService';
import HashUserPasswordService from '../../application/services/hashUserPasswordService';
import HashUserPasswordServiceWithBcrypt from '../services/application/hashUserPasswordServiceWithBcrypt';
import AuthRoutes from '../http/express/routes/authRoutes';
import AuthController from '../../application/controllers/authController';
import AuthControllerImpl from '../controllers/authControllerImpl';
import UserSignUp from '../../application/usecases/userSignUp';
import UserSignUpImpl from '../usecases/userSignUpImpl';
import CalculateRouteShippingTimeService from '../../domain/services/calculateRouteShippingTimeService';
import CalculateRouteShippingTimeServiceImpl from '../services/domain/calculateRouteShippingTimeServiceImpl';
import UserRepositoryWithSequelizeAndMysql from '../repositories/sequelize/repositories/userRepositoryWithSequelizeAndMySql';
import AddressRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/addressRepositoryWithSequelizeAndMySql';
import ProductRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/productRepositoryWithSequelizeAndMySql';
import OrderRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/orderRepositoryWithSequelizeAndMySql';
import EmailValidator from '../../application/validators/emailValidator';
import { EmailValidatorWithJoi } from '../validators/emailValidatorWithJoi';
import PasswordValidator from '../../application/validators/passwordValidator';
import { PasswordValidatorWithJoi } from '../validators/passwordValidatorWithJoi';
import UsernameValidator from '../../application/validators/usernameValidator';
import { UsernameValidatorWithJoi } from '../validators/usernameValidatorWithJoi';
import PaymentService from '../../domain/services/paymentService';
import PaymentServiceWithMercadoPago from '../services/domain/paymentServiceWithMercadoPago';
import PaymentController from '../../application/controllers/paymentController';
import PaymentControllerImpl from '../controllers/paymentControllerImpl';
import NotifyPaymentUpdate from '../../application/usecases/notifyPaymentUpdate';
import NotifyPaymentUpdateImpl from '../usecases/notifyPaymentUpdateImpl';
import OrderController from '../../application/controllers/orderController';
import OrderControllerImpl from '../controllers/orderControllerImpl';
import PlaceOrder from '../../application/usecases/placeOrder';
import PlaceOrderImpl from '../usecases/placeOrderImpl';
import PayOrder from '../../application/usecases/payOrder';
import PayOrderImpl from '../usecases/payOrderImpl';
import GetOrderDetails from '../../application/usecases/getOrderDetails';
import GetOrderDetailsImpl from '../usecases/getOrderDetailsImpl';
import GetProductShippingEstimatesImpl from '../usecases/getProductShippingEstimatesImpl';
import GetProductShippingEstimates from '../../application/usecases/getProductShippingEstimates';
import EmailService from '../../application/services/emailService';
import { EmailServiceWithNodemailer } from '../services/application/emailServiceWithNodemailer';
import ProductReviewValidator from '../../application/validators/productReviewValidator';
import { ProductReviewValidatorWithJoi } from '../validators/productReviewValidatorWithJoi';
import PostalCodeValidator from '../../application/validators/postalCodeValidator';
import { BrazillianPostalCodeValidatorWithJoi } from '../validators/brazillianPostalCodeValidatorWithJoi';
import DiscountCouponRepository from '../../application/repositories/discountCouponRepository';
import DiscountCouponRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/discountCouponRepositoryWithSequelizeAndMySql';
import PromotionRepository from '../../application/repositories/promotionRepository';
import PromotionRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/promotionRepositoryWithSequelizeAndMySql';
import CategoryRepository from '../../application/repositories/categoryRepository';
import CategoryRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/categoryRepositoryWithSequelizeAndMySql';
import { ProductQuestionValidator } from '../../application/validators/productQuestionValidator';
import { ProductQuestionValidatorWithJoi } from '../validators/productQuestionValidatorWithJoi';
import WebSocketEventService from '../../application/services/webSocketEventService';
import WebSocketEventServiceWithExpressAndSocketIO from '../services/application/webSocketEventServiceWithExpressAndSocketIO';
import SendMessageInOrderItemChatImpl from '../usecases/sendMessageInOrderItemChatImpl';
import SendMessageInOrderItemChat from '../../application/usecases/sendMessageInOrderItemChat';
import AddCategories from '../../application/usecases/addCategories';
import AddCategoriesImpl from '../usecases/addCategoriesImpl';
import AddCategoriesToProducts from '../../application/usecases/addCategoriesToProducts';
import AddCategoriesToProductsImpl from '../usecases/addCategoriesToProductsImpl';
import AddDiscountCouponsImpl from '../usecases/addDiscountCouponsImpls';
import AddDiscountCoupons from '../../application/usecases/addDiscountCoupons';
import AddProductQuestionImpl from '../usecases/addProductQuestion';
import AddProductQuestion from '../../application/usecases/addProductQuestion';
import AddProductQuestionAnswer from '../../application/usecases/addProductQuestionAnswer';
import AddProductQuestionAnswerImpl from '../usecases/addProductQuestionAnswer';
import AddPromotions from '../../application/usecases/addPromotions';
import AddPromotionsImpl from '../usecases/addPromotionsImpl';
import AddPromotionsToCategories from '../../application/usecases/addPromotionsToCategories';
import AddPromotionsToCategoriesImpl from '../usecases/addPromotionsToCategoriesImpl';
import AddPromotionsToProducts from '../../application/usecases/addPromotionsToProducts';
import AddPromotionsToProductsImpl from '../usecases/addPromotionsToProducts';
import GetDiscountCouponDetailsByDiscountCode from '../../application/usecases/getDiscountCouponDetailsByDiscountCode';
import { GetDiscountCouponDetailsByDiscountCodeImpl } from '../usecases/getDiscountCouponDetailsByDiscountCodeImpl';
import AuthHandler from '../http/express/middlewares/authHandler';
import RoleRepository from '../../application/repositories/roleRepository';
import RoleRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/roleRepositoryWithSequelizeAndMySql';
import PermissionRepository from '../../application/repositories/permissionRepository';
import PermissionRepositoryWithSequelizeAndMySql from '../repositories/sequelize/repositories/permissionRepositoryWithSequelizeAndMySql';
import AddRolesToUsers from '../../application/usecases/addRolesToUsers';
import AddRolesToUsersImpl from '../usecases/addRolesToUsersImpl';
import RoleController from '../../application/controllers/roleController';
import RoleControllerImpl from '../controllers/roleControllerImpl';
import AddRoles from '../../application/usecases/addRoles';
import AddRolesImpl from '../usecases/addRolesImpl';
import AddPermissionsToRoles from '../../application/usecases/addPermissionsToRoles';
import AddPermissionsToRolesImpl from '../usecases/addPermissionsToRolesImpl';

const container = new Container();
//Routes
container.bind<AuthRoutes>(AuthRoutes).toSelf();
container.bind<ProductRoutes>(ProductRoutes).toSelf();
container.bind<UserRoutes>(UserRoutes).toSelf();
//Controllers
container
	.bind<AuthController>(TYPES.AuthController)
	.to(AuthControllerImpl)
	.inSingletonScope();
container
	.bind<OrderController>(TYPES.OrderController)
	.to(OrderControllerImpl)
	.inSingletonScope();
container
	.bind<PaymentController>(TYPES.PaymentController)
	.to(PaymentControllerImpl)
	.inSingletonScope();
container
	.bind<ProductController>(TYPES.ProductController)
	.to(ProductControllerImpl)
	.inSingletonScope();
container
	.bind<RoleController>(TYPES.RoleController)
	.to(RoleControllerImpl)
	.inSingletonScope();
container
	.bind<UserController>(TYPES.UserController)
	.to(UserControllerImpl)
	.inSingletonScope();

//Use Cases
container
	.bind<AddCategoriesToProducts>(TYPES.AddCategoriesToProducts)
	.to(AddCategoriesToProductsImpl)
	.inSingletonScope();
container
	.bind<AddCategories>(TYPES.AddCategories)
	.to(AddCategoriesImpl)
	.inSingletonScope();
container
	.bind<AddDiscountCoupons>(TYPES.AddDiscountCoupons)
	.to(AddDiscountCouponsImpl)
	.inSingletonScope();
container
	.bind<AddPermissionsToRoles>(TYPES.AddPermissionsToRoles)
	.to(AddPermissionsToRolesImpl)
	.inSingletonScope();
container
	.bind<AddProducts>(TYPES.AddProducts)
	.to(AddProductsImpl)
	.inSingletonScope();
container
	.bind<AddProductQuestion>(TYPES.AddProductQuestion)
	.to(AddProductQuestionImpl)
	.inSingletonScope();
container
	.bind<AddProductQuestionAnswer>(TYPES.AddProductQuestionAnswer)
	.to(AddProductQuestionAnswerImpl)
	.inSingletonScope();
container
	.bind<AddProductReview>(TYPES.AddProductReview)
	.to(AddProductReviewImpl)
	.inSingletonScope();
container
	.bind<AddPromotions>(TYPES.AddPromotions)
	.to(AddPromotionsImpl)
	.inSingletonScope();
container
	.bind<AddPromotionsToCategories>(TYPES.AddPromotionsToCategories)
	.to(AddPromotionsToCategoriesImpl)
	.inSingletonScope();
container
	.bind<AddPromotionsToProducts>(TYPES.AddPromotionsToProducts)
	.to(AddPromotionsToProductsImpl)
	.inSingletonScope();
container
	.bind<AddRoles>(TYPES.AddRoles)
	.to(AddRolesImpl)
	.inSingletonScope();
container
	.bind<AddRolesToUsers>(TYPES.AddRolesToUsers)
	.to(AddRolesToUsersImpl)
	.inSingletonScope();
container
	.bind<GetDiscountCouponDetailsByDiscountCode>(TYPES.GetDiscountCouponDetailsByDiscountCode)
	.to(GetDiscountCouponDetailsByDiscountCodeImpl)
	.inSingletonScope();
container
	.bind<GetProductDetails>(TYPES.GetProductDetails)
	.to(GetProductDetailsImpl)
	.inSingletonScope();
container
	.bind<AddUserAddress>(TYPES.AddUserAddress)
	.to(AddUserAddressImpl)
	.inSingletonScope();
container
	.bind<GetOrderDetails>(TYPES.GetOrderDetails)
	.to(GetOrderDetailsImpl)
	.inSingletonScope();
container
	.bind<GetProductShippingEstimates>(TYPES.GetProductShippingEstimates)
	.to(GetProductShippingEstimatesImpl)
	.inSingletonScope();
container
	.bind<GetUserAddresses>(TYPES.GetUserAddresses)
	.to(GetUserAddressesImpl)
	.inSingletonScope();
container
	.bind<GetUserOrders>(TYPES.GetUserOrders)
	.to(GetUserOrdersImpl)
	.inSingletonScope();
container
	.bind<GetUserProfile>(TYPES.GetUserProfile)
	.to(GetUserProfileImpl)
	.inSingletonScope();
container
	.bind<NotifyPaymentUpdate>(TYPES.NotifyPaymentUpdate)
	.to(NotifyPaymentUpdateImpl)
	.inSingletonScope();
container
	.bind<PlaceOrder>(TYPES.PlaceOrder)
	.to(PlaceOrderImpl)
	.inSingletonScope();
container
	.bind<PayOrder>(TYPES.PayOrder)
	.to(PayOrderImpl)
	.inSingletonScope();
container
	.bind<SendMessageInOrderItemChat>(TYPES.SendMessageInOrderItemChat)
	.to(SendMessageInOrderItemChatImpl)
	.inSingletonScope();
container
	.bind<UpdateUserProfile>(TYPES.UpdateUserProfile)
	.to(UpdateUserProfileImpl)
	.inSingletonScope();
container
	.bind<UserSignIn>(TYPES.UserSignIn)
	.to(UserSignInImpl)
	.inSingletonScope();
container
	.bind<UserSignUp>(TYPES.UserSignUp)
	.to(UserSignUpImpl)
	.inSingletonScope();
//Repositories
//Sequelize
container
	.bind<AddressRepository>(TYPES.AddressRepository)
	.to(AddressRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<CategoryRepository>(TYPES.CategoryRepository)
	.to(CategoryRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<DiscountCouponRepository>(TYPES.DiscountCouponRepository)
	.to(DiscountCouponRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<OrderRepository>(TYPES.OrderRepository)
	.to(OrderRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<PermissionRepository>(TYPES.PermissionRepository)
	.to(PermissionRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<ProductRepository>(TYPES.ProductRepository)
	.to(ProductRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<PromotionRepository>(TYPES.PromotionRepository)
	.to(PromotionRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<RoleRepository>(TYPES.RoleRepository)
	.to(RoleRepositoryWithSequelizeAndMySql)
	.inSingletonScope();
container
	.bind<UserRepository>(TYPES.UserRepository)
	.to(UserRepositoryWithSequelizeAndMysql)
	.inSingletonScope();
//Services
container
	.bind<CalculateOrderShippingCostService>(
		TYPES.CalculateOrderShippingCostService
	)
	.to(CalculateOrderShippingCostServiceImpl)
	.inSingletonScope();
container
	.bind<CalculateRouteShippingCostService>(
		TYPES.CalculateRouteShippingCostService
	)
	.to(CalculateRouteShippingCostServiceImpl)
	.inSingletonScope();
container
	.bind<CalculateRouteShippingTimeService>(
		TYPES.CalculateRouteShippingTimeService
	)
	.to(CalculateRouteShippingTimeServiceImpl)
	.inSingletonScope();
container
	.bind<EmailService>(TYPES.EmailService)
	.to(EmailServiceWithNodemailer)
	.inSingletonScope()
container
	.bind<PaymentService>(TYPES.PaymentService)
	.to(PaymentServiceWithMercadoPago);
container
	.bind<VerifyAccessTokenService>(TYPES.VerifyAccessTokenService)
	.to(VerifyAccessTokenServiceWithJWT).inSingletonScope;
container
	.bind<CompareUserPasswordsService>(TYPES.CompareUserPasswordsService)
	.to(CompareUserPasswordsServiceWithBcrypt)
	.inSingletonScope();
container
	.bind<GenerateAccessTokenService>(TYPES.GenerateAccessTokenService)
	.to(GenerateAccessTokenServiceWithJWT)
	.inSingletonScope();
container
	.bind<HashUserPasswordService>(TYPES.HashUserPasswordService)
	.to(HashUserPasswordServiceWithBcrypt)
	.inSingletonScope();
container
	.bind<WebSocketEventService>(TYPES.WebSocketEventService)
	.to(WebSocketEventServiceWithExpressAndSocketIO)
	.inSingletonScope();
//Validators
container
	.bind<EmailValidator>(TYPES.EmailValidator)
	.to(EmailValidatorWithJoi)
	.inSingletonScope();
container
	.bind<PasswordValidator>(TYPES.PasswordValidator)
	.to(PasswordValidatorWithJoi)
	.inSingletonScope();
container
	.bind<PostalCodeValidator>(TYPES.PostalCodeValidator)
	.to(BrazillianPostalCodeValidatorWithJoi)
	.inSingletonScope();
container
	.bind<ProductQuestionValidator>(TYPES.ProductQuestionValidator)
	.to(ProductQuestionValidatorWithJoi)
	.inSingletonScope();
container
	.bind<ProductReviewValidator>(TYPES.ProductReviewValidator)
	.to(ProductReviewValidatorWithJoi)
	.inSingletonScope();
container
	.bind<UsernameValidator>(TYPES.UsernameValidator)
	.to(UsernameValidatorWithJoi)
	.inSingletonScope();
//Middlewares
container
	.bind<AuthHandler>(AuthHandler).toSelf()
export { container };
