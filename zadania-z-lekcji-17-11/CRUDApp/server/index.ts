import express from 'express';
import homeRoute from './Routes/homeRoute';

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
