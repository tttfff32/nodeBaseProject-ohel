const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./controllers/user.controller');
const businessController = require('./controllers/business.controller');
const serviceController = require('./controllers/service.controller');
const meetingController = require('./controllers/meeting.controller');

const authMiddleware = require('./middleware/middleware');
const PORT = process.env.PORT || 3000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/user', userController);
app.use('/business', authMiddleware, businessController);
app.use('/meeting', authMiddleware, meetingController);
app.use('/service', authMiddleware, serviceController);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})