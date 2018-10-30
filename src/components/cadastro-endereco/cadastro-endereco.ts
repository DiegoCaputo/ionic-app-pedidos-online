import { CadastroService } from './../../pages/cadastro/cadastro.service';
import { EnderecosService } from './../../pages/enderecos/enderecos.service';
import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Funcoes } from '../../providers/funcoes';
import { EnderecosPage } from '../../pages/enderecos/enderecos';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { EnderecoPage } from '../../pages/endereco/endereco';

@Component({
  selector: 'cadastro-endereco',
  templateUrl: 'cadastro-endereco.html'
})



export class CadastroEnderecoComponent implements OnInit {

  @Input() opc: boolean;

  @ViewChild('logradouroInput') logradouroInput;
  @ViewChild('numeroInput') numeroInput;
  @ViewChild('bairroInput') bairroInput;
  @ViewChild('cidadeInput') cidadeInput;
  @ViewChild('estadoInput') estadoInput;

  loader: any;
  endereco: any;
  estados: any[];
  cidades: any[];
  pagamento: boolean;

  constructor(private enderecosService: EnderecosService,
    private cadastroService: CadastroService,
    private funcoes: Funcoes,
    private enderecos: EnderecosPage,
    private navCtrl: NavController) {

    this.endereco = {
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    }

    this.cadastroService.getEstados().then(estados => this.estados = estados);
  }

  ngOnInit() {
    this.pagamento = this.opc;
  }

  inserir() {
    this.loader = this.funcoes.mostraLoading("");
    this.enderecosService.inserir(this.endereco).then(
      response => {
        if (response.status == 'fieldError') {
          this.verificaCamposForm(response);
        } else {
          if (!this.pagamento) {
            this.enderecos.setarOpcao("cadastrados");
          } else {
            this.navCtrl.push(EnderecoPage);
          }
        }
        this.loader.dismiss();
      }
    );
  }

  getCidades(pkEstadoId) {
    this.cadastroService.getCidades(pkEstadoId)
      .then(cidades => this.cidades = cidades);
  }

  onSubmit = function () {
    this.inserir();
    this.click = true;
  }

  limparCampos() {
    this.endereco.logradouro = '';
    this.endereco.numero = '';
    this.endereco.bairro = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
  }

  verificaCamposForm(response) {

    if (response.id == 'nome') {
      this.logradouroInput.setFocus();
    }
    if (response.id == 'numero') {
      this.numeroInput.setFocus();
    }
    if (response.id == 'bairro') {
      this.bairroInput.setFocus();
    }
    if (response.id == 'cidade') {
      this.cidadeInput.setFocus();
    }
  }
}