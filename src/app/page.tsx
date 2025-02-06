

import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/actions";

export default async function Home() {



  const user = await getCurrent();

  if (user) redirect("/dashboard");

  return (
    <main className="flex flex-col items-center  h-screen">
      <span className="text-2xl p-3">Pagina Principal</span>

      <Button>
        <Link href="/sign-in">Entrar</Link>
      </Button>

      <Button>
        <Link href="/sign-up">Cadastrar</Link>
      </Button>
    </main>
  );
}
