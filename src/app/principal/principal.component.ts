import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  //Objeto tipo Cliente
  cliente = new Cliente();


  btnCadastro: boolean = true;

  //Variável para visibilidade da tabela
  tabela: boolean = true;


  //JSON de clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService) { }

  //Métodos de seleção
  selecionar(): void{
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

  //Método de cadastro
  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {
      //Cadastrar cliente no vetor
      this.clientes.push(retorno);
    
      //Limpar formulário
      this.cliente = new Cliente();

      //Mensagem
      alert("Cliente cadastrado com sucesso!");
    });
  }

  //Metodo para selecionar um cliente
  selecionarCliente(posicao:number):void{

    //selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    //Visibilidade dos botões
    this.btnCadastro = false;

    //Visibilidade da tabela
    this.tabela = false;

  }

  //Método para editar clientes
  editar():void{
    this.servico.editar(this.cliente)
    .subscribe(retorno =>{

      //Obter posição do vetor cliente
      let posicao = this.clientes.findIndex(obj =>{
        return obj.codigo == retorno.codigo;
      });

      //Alterar os dados clientes
      this.clientes[posicao] = retorno;

      //Limpar formulário
      this.cliente = new Cliente();

      // Visbilidade dos botoes
      this.btnCadastro = true;

      //visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Cliente alterado com sucesso!')
    });
  }

  //Método para remover clientes
  remover():void{


    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno =>{

      //Obter posição do vetor cliente
      let posicao = this.clientes.findIndex(obj =>{
        return obj.codigo == this.cliente.codigo;
      });

      //Remover cliente do vetor
      this.clientes.splice(posicao, 1);

      //Limpar formulário
      this.cliente = new Cliente();

      // Visbilidade dos botoes
      this.btnCadastro = true;

      //visibilidade da tabela
      this.tabela = true;

      //Mensagem
      alert('Cliente removido com sucesso!')
    });
  }

  //Método para cancelar 
  cancelar():void{
    
    //Limpar formulário
    this.cliente = new Cliente;

    //Visibilidade dos botões
    this.btnCadastro = true;

    //Visibilidade da tabela
    this.tabela = true;
  }

  //Método de inicialização  
  ngOnInit() {
    this.selecionar();

}

}
