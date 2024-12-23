import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/api';

const PORT = 3000;
const HOST = 'localhost';

const app = express();
app.use(bodyParser.json()); // receive a json req

// middleware
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
