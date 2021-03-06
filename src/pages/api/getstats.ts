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

  const json = {
    title: "",
    artist: "",
    songtitle: "",
    listeners: 0,
    streamstatus: 0,
    live: false,
    onair: false,
  };

  return axios
    .get(`${url}${path}`, {
      timeout: 3000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(results => {
      if (req.body.type === "ic") {
        json.listeners = 0;
      } else {
        if (results.data.streamstatus === 0) {
          return res.status(results.status).json(json);
        }

        const songtitle = results.data.songtitle.split(" - ");
        json.title = songtitle[1];
        json.artist = songtitle[0].replace("LIVE", "").trim();
        json.songtitle = results.data.songtitle
          .replace("LIVE", "")
          .replace("ONAIR", "")
          .trim();
        json.listeners = results.data.currentlisteners || 0;
        json.streamstatus = results.data.streamstatus;
        json.live = results.data.songtitle.startsWith("LIVE");
        json.onair = results.data.songtitle.startsWith("ONAIR");
      }
      return res.status(200).json(json);
    })
    .catch(error => {
      return res
        .status(200)
        .json({ ...json, error: { message: error.message } });
    });
}
