import express from 'express';
import routers from './apis';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use('/', routers);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
