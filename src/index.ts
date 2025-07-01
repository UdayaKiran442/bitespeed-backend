import { Hono } from 'hono'

import identifyRoute from './routes/identify.route'

const app = new Hono()

app.get("/health-check", (c) => {
  return c.json({ message: "Service is running" })
})

app.route('/identify', identifyRoute)

export default app
