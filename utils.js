export function reduceDuplo(item, proriedade) {
  return item.reduce(
    (acc, el) =>
      acc + el[proriedade].reduce((acc, it) => acc + it.quantidade, 0),
    0
  );
}

export function reduceSimples(item, propriedade) {
  return item[propriedade].reduce((acc, it) => acc + it.quantidade, 0);
}

export function verificaInputs (inputs) {
  return Object.values(inputs).every(inp => inp)  
}