import { hc } from "hono/client";

import type { AppType } from "@/app/api/[[...route]]/route";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
