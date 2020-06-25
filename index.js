const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// DB Setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);

const db = mongoose.connection;

db.once('open', function() {
    console.log('DB Connected');
})
db.on('error', function(err) {
    console.log('DB ERROR : ', err);
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // json 형태의 data를 받겠다
app.use(bodyParser.urlencoded({extended:true}));    // urlencoded data를 extended 알고리즘을 사용해 분석하겠다
app.use(methodOverride('_method')); // _method의 query로 들어오는 값으로 HTTP method를 변경

const port = 3000;
app.listen(port, function() {
    console.log('Server On! http://localhost'+port);
})

// Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));
