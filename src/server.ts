import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import morggan from 'morgan'
import routes from './routes/index_routes';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
app.use(morggan('dev'))

app.use(bodyParser.json())
app.use('/api',routes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app;

