import { Hono } from "hono";

const identifyRoute = new Hono()

identifyRoute.get('/', (c) => {
    return c.text('Hello Identify!')
})

export default identifyRoute