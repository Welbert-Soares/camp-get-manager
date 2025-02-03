

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const SignUpCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Cadastre-se
        </CardTitle>
        <CardDescription>
          ao se inscrever, você concorda com nossas{" "}
          <Link href="/privacy">
            <span className="text-blue-700">Politicas de Privacidade</span>
          </Link>{" e "}
          <Link href="/terms">
            <span className="text-blue-700">Termos de Serviços</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="email"
            value={""}
            onChange={() => { }}
            placeholder="Insira seu e-mail"
            disabled={false}
          />

          <Input
            required
            type="password"
            value={""}
            onChange={() => { }}
            placeholder="Insira sua senha"
            disabled={false}
            min={8}
            max={256}
          />
          <Button disabled={false} size={"lg"} className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Entrar com o Google
        </Button>
      </CardContent>
    </Card>
  )
}
