// create simple nextjs api that retuns a thing
// use API handler

import { NextApiResponse, NextApiRequest } from 'next';
function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        message: 'bruh this api exists for no reason',
    });
}
