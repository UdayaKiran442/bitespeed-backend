import { Hono } from 'hono'

import identifyRoute from './routes/identify.route'
import { fetchContacts } from './repository/identify.repository'

const app = new Hono()

app.get('/', async (c) => {
  const contacts = await fetchContacts({email: "kk@gmail.com", phone: "12345"})
  return c.json(contacts)
})

app.route('/identify', identifyRoute)

export default app
