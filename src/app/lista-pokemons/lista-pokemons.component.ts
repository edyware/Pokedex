import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css']
})
export class ListaPokemonsComponent implements OnInit {

  aux: Array<any> = [];
  pokemons: object = {}; //necessário declarar a variável que irá receber os arquivos da API
  len: number = 0;
  uniqPokemon: Array<any> = [];
  favoriteList: Array<any> = [];

  constructor(private listaPokemonService: ListaPokemonService) { } //chamo no construtor o serviço responsável por fazer a requisição http

  ngOnInit(): void {
    this.getPokemons(); //é bom utilizar o ponto e vírgula quando eu estiver separando funções
  }


  getPokemons() {
    this.listaPokemonService.getPokemons.subscribe((res:any) => { //o que é subscribe? oq ele tá fazendo?; o "=>" é uma arrow function, que devolve pro res a instrução dentro das chaves
      this.pokemons = res.results; //esse "res.results" é o ar  ray da API, se colocar só res volta um array com duas posições (uma delas é o results)
      this.aux = Object.entries(this.pokemons); //Usei essa variável como auxiliar para receber o retorno da função *entries* no array da API
      const len = Object.keys(this.pokemons).length; //Maneira que encontrei de receber o tamanho do array de objetos
      for (let i = 1; i < len; i++) { //Esse "for" vai percorrer todo o array auxiliar que criei, comecei do 1 pq no 0 dá um erro de undefined
        let var1: string = this.aux[i - 1][1].national_number; //variável para receber o valor contido no national_number
        let var2: string = this.aux[i][1].national_number; //como "i" começa em 1, utilizei o "i-1" para percorrer o índice 0
        if (var1 == var2) { //"if" para verificar se o valor anterior e o valor atual são iguais
          this.aux.splice(i, 0) //se forem iguais, então remover da lista auxiliar
        } else {
          this.uniqPokemon.push(this.aux[i - 1][1]) //se forem diferentes, acrescenta o objeto em "uniqPokemon"
        }                                              //usar o [1] dá o mesmo efeito que fazer "res.results", pois se trata de um 
      }                                                //Array com um array dentro e dentro do array de dentro tem um objeto
      if (this.aux[len - 2][1].national_number != this.aux[len - 1][1].national_number) { //Gambiarra para adicionar o último elemento da API
        this.uniqPokemon.push(this.aux[len - 1][1])                                  //Se o último elemento não for igual ao penúltimo
      } else {                                                                       //ele é acrescentado ao Array
        this.aux.splice(len - 1, 0)                                                  //Se for igual, o último elemento é removido
      }
    })
  }

}
