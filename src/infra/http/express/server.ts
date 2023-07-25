import { container } from '../../configs/inversify.config'; // tem que ser o primeiro a carregar
import AuthRoutes from './routes/authRoutes';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import ExpressErrorHandler from './middlewares/expressErrorHandler';
import ProductRoutes from './routes/productRoutes';
import UserRoutes from './routes/userRoutes';
import PaymentRoutes from './routes/paymentRoutes';
import OrderRoutes from './routes/orderRoutes';
import http from 'http';
import WebSocketServer from '../../websocket/socketio/server';
import RoleRoutes from './routes/roleRoutes';


class ExpressServer {
	public app: express.Application;
	public httpServer: http.Server;
	private authRoutes = container.resolve<AuthRoutes>(AuthRoutes);
	private orderRoutes = container.resolve<OrderRoutes>(OrderRoutes);
	private paymentRoutes = container.resolve<PaymentRoutes>(PaymentRoutes);
	private productRoutes = container.resolve<ProductRoutes>(ProductRoutes);
	private roleRoutes = container.resolve<RoleRoutes>(RoleRoutes);
	private userRoutes = container.resolve<UserRoutes>(UserRoutes);


	constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.config();
	}

	private config(): void {
		this.app.use(
			cors({
				origin: '*',
			})
		);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use('/auth', this.authRoutes.router);
		this.app.use('/orders', this.orderRoutes.router);
		this.app.use('/payments', this.paymentRoutes.router);
		this.app.use('/products', this.productRoutes.router);
		this.app.use('/roles', this.roleRoutes.router);
		this.app.use('/users', this.userRoutes.router);
		this.app.use(ExpressErrorHandler.execute);
	}

	public start(): void {
		const PORT = process.env.PORT || 3000;
		this.httpServer.listen(PORT, () => {
			console.log(`Server started at http://localhost:${PORT}`);
		});
	}
}


const expressServer = new ExpressServer();
expressServer.start();
const webSocketServer = new WebSocketServer(expressServer.httpServer);
webSocketServer.start();
export { expressServer, webSocketServer }