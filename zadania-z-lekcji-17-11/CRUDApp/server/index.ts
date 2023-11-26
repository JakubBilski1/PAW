import express from 'express';
import userRoutes from './Routes/userRoutes';

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));

app.use('/u', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
