import { Funcoes } from './../../providers/funcoes';
import { FinalizarPedido } from './../finalizar-pedido/finalizar-pedido';
import { CadastroService } from './cadastro.service';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, Segment, LoadingController } from 'ionic-angular';
//import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})

export class Cadastro implements OnInit {

  @ViewChild(Segment)

  @ViewChild('nomeInput') nomeInput;
  @ViewChild('sobrenomeInput') sobrenomeInput;
  @ViewChild('emailInput') emailInput;
  @ViewChild('dddInput') dddInput;
  @ViewChild('telefoneInput') telefoneInput;
  @ViewChild('cpfInput') cpfInput;
  @ViewChild('enderecoInput') enderecoInput;
  @ViewChild('numeroInput') numeroInput;
  @ViewChild('complementoInput') complementoInput;
  @ViewChild('cepInput') cepInput;
  @ViewChild('bairroInput') bairroInput;
  @ViewChild('estadoInput') estadoInput;
  @ViewChild('cidadeInput') cidadeInput;

  segment: Segment;
  autenticacao = 'login';
  estados: any[];
  cidades: any[];
  pessoas: any[];
  nome: any;
  click: boolean;
  loader: any;
  idEstado: string;
  alterar: boolean;

  //ngModel
  pessoa = {
    id: '',
    nome: '',
    sobrenome: '',
    email: '',
    ddd: '',
    telefone: '',
    cpf: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    bairro: '',
    estado: '',
    cidade: '',
    dispositivo: ''
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cadastroService: CadastroService,
    private loadingCtrl: LoadingController,
    private funcoes: Funcoes) {
  }

  getEstados(): void {
    this.cadastroService.getEstados().then(estados => this.estados = estados);
  }

  getCidades(pkEstadoId) {
    this.cadastroService.getCidades(pkEstadoId).then(cidades => this.cidades = cidades);
  }

  getPessoas(): void {
    this.cadastroService.getPessoas().then(pessoas => this.pessoas = pessoas).then(response => this.loader.dismiss());
  }

  setPessoa(): Promise<any> {

    this.loader = this.presentLoading();

    if (!this.alterar) {
      return this.cadastroService.setPessoa(this.pessoa)
        .then(response => this.verificaCamposForm(response));
    } else {
      return this.cadastroService.updatePessoa(this.pessoa)
        .then(response => this.verificaCamposForm(response));
    }

  }

  verificaCamposForm(response) {
    if (response.status == 'fieldError') {
      this.loader.dismiss();
      if (response.id == 'nome') {
        this.nomeInput.setFocus();
      }
      if (response.id == 'sobrenome') {
        this.sobrenomeInput.setFocus();
      }
      if (response.id == 'email') {
        this.emailInput.setFocus();
      }
      if (response.id == 'ddd') {
        this.dddInput.setFocus();
      }
      if (response.id == 'telefone') {
        this.telefoneInput.setFocus();
      }
      if (response.id == 'cpf') {
        this.cpfInput.setFocus();
      }
      if (response.id == 'endereco') {
        this.enderecoInput.setFocus();
      }
      if (response.id == 'numero') {
        this.numeroInput.setFocus();
      }
      if (response.id == 'bairro') {
        this.bairroInput.setFocus();
      }
      if (response.id == 'cep') {
        this.cepInput.setFocus();
      }
      if (response.id == 'cidade') {
        this.cidadeInput.setFocus();
      }
    } else {
      this.loader.dismiss();
      sessionStorage.setItem('pessoa', JSON.stringify(this.pessoa));
      this.pushToFinalizarPedido();
    }
  }

  onSubmit = function () {
    this.setPessoa();
    this.click = true;
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cadastrando ..."
    });

    loader.present();
    return loader;
  }

  pushToFinalizarPedido() {
    this.navCtrl.push(FinalizarPedido, {
      id: sessionStorage.getItem('idAutenticacao')
    })
  }

  goToCadastroSegment(pessoa) {
    this.alterar = true;
    this.autenticacao = 'cadastro';

    this.getCidades(pessoa.pessoa_estado);

    this.pessoa.id = pessoa.pk_pessoa_id;
    this.pessoa.nome = pessoa.pessoa_nome;
    this.pessoa.sobrenome = pessoa.pessoa_sobrenome;
    this.pessoa.email = pessoa.pessoa_email;
    this.pessoa.ddd = pessoa.pessoa_ddd;
    this.pessoa.telefone = pessoa.pessoa_telefone;
    this.pessoa.cpf = pessoa.pessoa_cpf;
    this.pessoa.endereco = pessoa.pessoa_endereco;
    this.pessoa.numero = pessoa.pessoa_endereco_numero;
    this.pessoa.complemento = pessoa.pessoa_endereco_complemento;
    this.pessoa.cep = pessoa.pessoa_cep;
    this.pessoa.bairro = pessoa.pessoa_bairro;
    this.pessoa.estado = pessoa.pessoa_estado;
    this.pessoa.cidade = pessoa.fk_cidade_id;
    this.pessoa.dispositivo = pessoa.pessoa_dispositivo;

    this.idEstado = this.pessoa.estado;
  }

  limparCampos(): void {
    this.pessoa.nome = '';
    this.pessoa.sobrenome = '';
    this.pessoa.email = '';
    this.pessoa.ddd = '';
    this.pessoa.telefone = '';
    this.pessoa.cpf = '';
    this.pessoa.endereco = '';
    this.pessoa.numero = '';
    this.pessoa.complemento = '';
    this.pessoa.cep = '';
    this.pessoa.bairro = '';
    this.pessoa.estado = '';
    this.pessoa.cidade = '';
    this.pessoa.dispositivo = '';
  }

  selecionarPessoa(pessoa): void {
    sessionStorage.setItem("pessoa", JSON.stringify(pessoa));
    this.pushToFinalizarPedido();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loader = this.funcoes.mostraLoading('');

    this.getEstados();
    this.getPessoas();
    this.click = false;
  }

}
