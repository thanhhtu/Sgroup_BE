import express from 'express';
import 'dotenv/config';
import routers from './apis';
import errorHandler from './middleware/handleError.middleware';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use('/', routers);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
