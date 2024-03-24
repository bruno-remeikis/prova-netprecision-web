export type Produto = {
    codigo: number;
    nome: string;
    preco: number;
}

export type ItemPedido = {
    produto: Produto;
    quantidade: number;
}

export const itens: ItemPedido[] = [
    { produto: { codigo: 1147, nome: 'Cachorro quente', preco: 3   }, quantidade: 3 },
    { produto: { codigo: 1154, nome: 'Bauru',           preco: 2.5 }, quantidade: 1 },
    { produto: { codigo: 1164, nome: 'Misto quente',    preco: 2   }, quantidade: 5 },
    { produto: { codigo: 1155, nome: 'X-Burger',        preco: 6   }, quantidade: 6 }
];