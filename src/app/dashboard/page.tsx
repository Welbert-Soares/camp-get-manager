
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

export default async function Dashboard() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      Esta é a página do dashboard
    </div >
  );
}
