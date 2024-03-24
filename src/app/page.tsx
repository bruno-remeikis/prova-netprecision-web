'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, url } from "@/services/api";
import { itens } from "@/utils/utils";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {

  const [codigo, setCodigo] = useState<string>('');
  const [valor, setValor] = useState<string>('');

  const [codigoPago, setCodigoPago] = useState<string>('');
  const [total, setTotal] = useState<number | null>(null);

  function handleSubmit(e: any) {
    e.preventDefault();

    const body = itens.map(i => ({
      codigoProduto: i.produto.codigo,
      quantidade: i.quantidade
    }));

    /*const config: RequestInit = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify(body)
    }

    fetch(`${url}/pedido/52`, config)*/
      /*.then(res => res.text())
      .then(data => console.log(data))*/

    setCodigoPago(codigo);

    api.post(`/pedido/${codigo}`, body)
      .then(res =>
      {
        if(typeof res.data === 'number')
          setTotal(res.data);
      })
      .catch(err => {
        const msg = err.response?.data ? err.response.data : 'Ops. Houve um erro inesperado e não conseguimos identificar sua causa.';
        toast(msg, { style: { backgroundColor: 'rgba(255, 0, 0, 0.2)' } });
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Prova da&nbsp;
          <a
            className="font-bold hover:text-blue-400 transition"
            href="https://netprecision.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            netprecision
          </a>
          &nbsp;para desenvolvedor Java
          {/* <code className="font-mono font-bold">src/app/page.tsx</code> */}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="flex place-items-center gap-2 p-8 lg:p-0"
            href="https://portifolio-remeikis.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By
            <h1 className="text-lg hover:text-purple-500 transition">Bruno Remeikis</h1>
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="border rounded-md relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Table>
            <TableCaption>Lista com todos os itens do seu pedido.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.map(i => (
                  <TableRow key={i.produto.codigo}>
                    <TableCell className="font-medium">{ i.produto.codigo }</TableCell>
                    <TableCell>{ i.produto.nome }</TableCell>
                    <TableCell className="text-right">R$ { i.produto.preco }</TableCell>
                    <TableCell className="text-right">{ i.quantidade }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input type="number" placeholder="Cód. do pedido" value={codigo} onChange={e => setCodigo(e.target.value)} />
            <Input type="number" placeholder="R$ Pagamento" value={valor} onChange={e => setValor(e.target.value)} />
            <Button type="submit">Pagar</Button>
          </div>
        </form>

        <div className="transition" style={{ opacity: total !== null ? '1' : '0' }}>
            <p>Troco para pagamento: R$ { total !== null ? (Number(valor) - total) : '' }</p>
        </div>

        <div className="transition" style={{ opacity: codigoPago ? '1' : '0' }}>
          <h2 className="text-blue-500">O que aconteceu?</h2>
          <p className="text-wrap max-w-[30rem] text-sm font-light text-justify">
            O sistema acessou o pedido de código { codigoPago } (que pode já ter itens),
            adicionou os itens da tabela, somou o valor total e te mostrou o troco ou o
            quanto falta no valor.
          </p>
        </div>
      </div>

      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}

      {/* <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

    </main>
  );
}
