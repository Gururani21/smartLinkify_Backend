import routes from '../routes/index';
//import swaggerUi from 'swagger-ui-express';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '../utils/httpException';
//import   doc  from '../docs/swagger';
import bodyParser from 'body-parser';
import ResponseData, { ErrorResponse } from '../utils/RequestResponse';
import appConfig from '../utils/appConfig';

const server = express()

//server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes);

// Serves images
server.use(express.static('public'));


//server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));

server.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {


   // @ts-ignore
  if (err && err.message&& err.status) {
    // @ts-ignore
    res.status(err.status).json(new ErrorResponse(appConfig.statusError, err.message));
  } else if (err) {
    res.status(500).json(err.message);
  }
});


export default server