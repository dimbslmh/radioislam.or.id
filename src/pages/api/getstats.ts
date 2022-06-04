// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import https from "https";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const path =
    req.body.type === "ic" ? "/live/status-json.xsl" : "/stats?json=true";

  const url = req.body.url;

  return axios
    .get(`${url}${path}`, {
      timeout: 5000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(results => {
      const json = {
        title: "",
        artist: "",
        listeners: 0,
        streamstatus: 0,
        live: false,
      };
      if (req.body.type === "ic") {
        json.listeners = 0;
      } else {
        if (results.data.streamstatus === 0) {
          return res.status(results.status).json(json);
        }

        const songtitle = results.data.songtitle.split(" - ");
        json.title = songtitle[1];
        json.artist = songtitle[0].replace("LIVE", "").trim();
        json.listeners = results.data.currentlisteners;
        json.streamstatus = results.data.streamstatus;
        json.live = songtitle[0].startsWith("LIVE");
      }
      return res.status(200).json(json);
    })
    .catch(error => {
      return res.status(200).json({ error: { message: error.message } });
    });
}
