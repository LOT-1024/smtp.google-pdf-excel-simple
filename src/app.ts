import express from 'express'
import reportRoute from './routes/report.route'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api', reportRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})