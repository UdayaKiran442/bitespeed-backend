import { Hono } from 'hono'

import identifyRoute from './routes/identify.route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/identify', identifyRoute)

export default app
