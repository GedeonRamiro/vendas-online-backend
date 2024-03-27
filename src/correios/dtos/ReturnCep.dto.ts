import { ReturnCepExternal } from './ReturnCepExternal.dto';

export class ReturnCepDTO {
  cep: string;
  publicPlace: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  ddd: string;
  cityId?: string;
  stateId?: string;

  constructor(returnCep: ReturnCepExternal, cityId?: string, stateId?: string) {
    this.cep = returnCep.cep;
    this.publicPlace = returnCep.logradouro;
    this.complement = returnCep.complemento;
    this.neighborhood = returnCep.bairro;
    this.city = returnCep.localidade;
    this.uf = returnCep.uf;
    this.ddd = returnCep.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}
