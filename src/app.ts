import express from 'express'
import reportRoute from './routes/report.route'

const app = express()

app.use(express.json())
app.use('/api', reportRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})