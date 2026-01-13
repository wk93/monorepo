import { hc } from "hono/client";

import type { AppType } from ".";

const client = hc<AppType>("http://localhost:3000");

const email = "test";
const password = "xs";
const token = "xs";
const log = await client.auth.login.$post({ json: { email, password } });
const get = await client.me.$get({
  headers: { Authorization: `Bearer ${token}` },
});

if (get.ok) {
  const json = await get.json();
} else {
  const json = await get.json();
}
