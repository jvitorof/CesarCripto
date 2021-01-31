const fetch = require('node-fetch');
var fs = require('fs');
const crypto = require('crypto')
var FormData = require('form-data');
const request = require('request')

const table = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
}

function deCripto (cripto, pace) {
  const CriptedNum = [...cripto].map((char) => (table[char]) ? ( table[char] - pace ): char);
  const deCriptedNum = CriptedNum.map((num) => (num < 0) ? (num + 26) : num);
  const deCriptedArr = deCriptedNum.map((num) => (Number.isInteger(num)) ? Object.keys(table)[Object.values(table).indexOf(num)] : num);
  const deCripted = deCriptedArr.join('');
  return deCripted;
}

function file (argument) {
  fs.appendFile('answer.json'/*Aqui é o nome do arquivo*/, JSON.stringify(argument)/*Aqui é o conteudo do arquivo*/, function (err) {
    if (err) throw err;
    console.log('Arquivo Salvo!');
  });
}

const cesarCripto = async () => {
  token = 'ff697b3eb294669721f2213f80530edbd7616b55';
  const URL = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`
  const finalAnswer = await fetch(URL)
    .then((response) => response.json())
    .then((answer) => {
      const casas = answer.numero_casas;
      const cifrado = answer.cifrado;
      answer.decifrado = deCripto(cifrado, casas);
      let resumo = crypto.createHash('sha1');
      resumo.update(answer.decifrado);
      answer.resumo_criptografico = resumo.digest('hex');
      console.log(answer);
      file(answer);
      return answer;  
    })
}

cesarCripto();

// request()
