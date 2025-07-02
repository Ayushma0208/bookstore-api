import 'dotenv/config';
import express from 'express';
import errorMiddleware from './src/middlewares/error.js';
import logger from './src/middlewares/logger.js';
import bookRoutes from './src/routes/bookRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import setupSwaggerDocs from './src/swagger.js';

const app = express();
app.use(express.json());
app.use(logger);

app.use('/api', userRoutes);
app.use('/api/books', bookRoutes);

setupSwaggerDocs(app);


app.use('*', (req, res) => res.status(404).json({ message: 'Not Found' }));
app.use(errorMiddleware);

app.listen(3000, () => console.log('Server running on port 3000'));
