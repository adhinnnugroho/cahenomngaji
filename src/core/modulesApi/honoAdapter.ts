import { NextApiRequest, NextApiResponse } from 'next';
import { Hono } from 'hono';

const app = new Hono();
export function createHonoHandler() {
    return async function handler(req: NextApiRequest, res: NextApiResponse) {
        const request = new Request(`http://${req.headers.host}${req.url}`, {
            method: req.method,
            headers: req.headers as HeadersInit,
            body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        });

        const response = await app.fetch(request);
        res.status(response.status);
        response.headers.forEach((value, key) => res.setHeader(key, value));
        const body = await response.text();
        res.send(body);
    };
}

export { app };