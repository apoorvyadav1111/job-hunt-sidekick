import express, { Application, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
const session = require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const useragent = require( 'express-useragent');
const { MONGODB_URI, PORT, SECRET_KEY } = require( './config');


const app:Application = express();
var cors = require('cors');
app.use(cors());

const store=new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions'
});

app.use(useragent.express());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000 }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 864000000 }));
app.use(
	session({
		secret: SECRET_KEY,
		rolling: true,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 3600000
		},
		store
	})
);

app.get('/health', async (req:Request, res:Response) => {
	console.log('health check');
	res.status(200).send('OK');
});
app.use('/application', require('./routes/home'));
app.use('/ddl', require('./routes/ddl'));





app.use((req:Request, res: Response, next: NextFunction) => {
	res.status(404).send('404: Not Found');
});

app.use((error:any, req: Request, res: Response, next:NextFunction ) => {
	res.status(500).send('500: Internal Server Error');
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

mongoose
.connect(MONGODB_URI)
.then(() => {
	app.listen(PORT, function () {
		console.log(`Server Started!!! at port ${PORT}`);
	});
})
.catch((err:any) => console.log(err));