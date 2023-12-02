import express from 'express';
import userRoutes from './Routes/userRoutes';
import postRoutes from './Routes/postRoutes';
import categoryRoutes from './Routes/categoryRoutes';
import photoRoutes from './Routes/photoRoutes';
import homeRoute from './Routes/homeRoute';
import userProfileRoutes from './Routes/userProfileRoutes';
import apiRoute from './Routes/apiRoute';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

app.use('/', homeRoute)
app.use('/u', userRoutes);
app.use('/p', postRoutes);
app.use('/c', categoryRoutes);
app.use('/pr', photoRoutes);
app.use('/up', userProfileRoutes);
app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
