import axios from 'axios';
import { Endereco } from '../types/endereco';

const cepCasaPaulo = '32235230';
const cepRaroLabs = '30315010';

const getCep = (cep: string) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
};

const listasDeCeps = (): Promise<void> => {
  let casaPaulo: Endereco;
  let casaRaro: Endereco;
  return getCep(cepCasaPaulo)
    .then(response => {
      casaPaulo = response.data;
      console.log(`o Paulo mora na ${casaPaulo.logradouro}`);
      return getCep(cepRaroLabs);
    })
    .then(response => {
      casaRaro = response.data;
      console.log(`o Paulo trabalha na rua ${casaRaro.logradouro}.`);
      console.log(
        `o Paulo leva 40 minutos para voltar da ${casaPaulo.logradouro} para a ${casaRaro.logradouro}`,
      );
    });
};

listasDeCeps();
// axios
//   .get(`https://viacep.com.br/ws/${cepCasaPaulo}/json/`)
//   .then(response => {
//     const endereco: Endereco = response.data;
//     console.log(`o Paulo mora na rua ${endereco.logradouro}`);
//   })
//   .catch(erro => {
//     console.error('deu erro', erro);
//   });

// o Paulo mora na rua "França Campos".
// o Paulo trabalha na rua "Paul Bouthilier".
// o Paulo leva 40 minutos para voltar da "Rua Paul Bouthilier" para a "Rua França Campos".
