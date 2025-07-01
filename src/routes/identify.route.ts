import { Hono } from "hono";

import { identifyContact } from "../controller/identify.controller";

const identifyRoute = new Hono()

identifyRoute.post('/', async (c) => {
    try {
        const payload = await c.req.json();
        const contact = await identifyContact(payload);
        return c.json({message: "Contact identified successfully", contact})
    } catch (error) {
        return c.json({message: "Contact identification failed", error}, 500)
    }
})

export default identifyRoute