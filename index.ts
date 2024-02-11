import server from "./server/index"
import dotenv from 'dotenv';
//used to config env
dotenv.config();


const port = process.env.PORT|| 5000
server.listen(port, () => {
    console.log(` Server listening on port ${port}`)
  })