require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fse = require('fse');

// load environment letiables
const {
  PORT: port,
  SELLER_ID,
  MWS_AUTH_TOKEN,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

// create app for koa
const app = new Koa();
const cors = require('@koa/cors');
app.use(cors());
app.use(bodyParser());

// listen
app.listen(port, async () => {
  console.log(`MWS API is listening to port ${port}`);
});

let amazonMws = require('amazon-mws')(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY);

(async function runAPI() {
  let FeedContent = fse.readFileSync('./AmazonSheet.csv', 'UTF-8');
  console.log('FeedContent ', FeedContent);

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dateTime = date + ' ' + time;

  amazonMws.feeds.submit({
    'Version': dateTime,
    'Action': 'SubmitFeed',
    'FeedType': '_POST_PRODUCT_DATA_',
    'FeedContent': FeedContent,
    'SellerId': SELLER_ID,
    'MWSAuthToken': MWS_AUTH_TOKEN
  }, function (error, response) {
    if (error) {
      console.log('error ', error);
      return;
    }
    console.log('response', response);
  });    
})();
