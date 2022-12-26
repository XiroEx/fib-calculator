import * as functions from "firebase-functions";
import fibs from "./main";

export const fib = functions.https.onRequest(
    async (request, response) => {
      const params = request.params[0].split("/");
      const asset = params[0];
      const timeframe = params[1];
      const lines = await fibs(asset.slice(-3) == "USD" ?
        asset.replace("-", "/") : asset, timeframe);
      response.send(lines);
    });
