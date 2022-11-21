import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import routes from './routes';
import errorHandler from './middlewares/error-handler.middleware';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => console.log('🚀 Server is running on port 3333...'));
