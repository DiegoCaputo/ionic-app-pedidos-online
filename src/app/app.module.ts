import { PedidoConfirmadoPageModule } from './../pages/pedido-confirmado/pedido-confirmado.module';
import { ListaEnderecosComponentModule } from './../components/lista-enderecos/lista-enderecos.module';
import { CadastroEnderecoComponentModule } from './../components/cadastro-endereco/cadastro-endereco.module';
import { ScanearQrPage } from './../pages/scanear-qr/scanear-qr';

//Módulos
import { ComandasEmAbertoPageModule } from './../pages/comandas-em-aberto/comandas-em-aberto.module';
import { ComandaDescricaoPageModule } from './../pages/comanda-descricao/comanda-descricao.module';
import { ComandasPageModule } from './../pages/comandas/comandas.module';
import { CadastroModule } from './../pages/cadastro/cadastro.module';
import { ListaCartoesComponentModule } from './../components/lista-cartoes/lista-cartoes.module';
import { CartaoModule } from './../pages/cartao/cartao.module';
import { FinalizarPedidoModule } from './../pages/finalizar-pedido/finalizar-pedido.module';
import { ItemModule } from './../components/item/item.module';
import { BandeijaModule } from './../pages/bandeija/bandeija.module';
import { CardapioItemDescricaoModule } from './../pages/cardapio-item-descricao/cardapio-item-descricao.module';
import { BandeijaIconModule } from './../components/bandeija-icon/bandeija-icon.module';
import { FooterModule } from './../components/footer/footer.module';
import { HeaderModule } from './../components/header/header.module';
import { BoxModule } from './../components/box/box.module';
import { CardapioItemModule } from './../pages/cardapio-item/cardapio-item.module';
import { CardapioModule } from './../pages/cardapio/cardapio.module';
import { ComprovantePageModule } from './../pages/comprovante/comprovante.module';
import { NotFoundComponentModule } from './../components/not-found/not-found.module';
import { LayoutModule } from './layout.module';
import { PedidoDescricaoPageModule } from './../pages/pedido-descricao/pedido-descricao.module';
import { ItemComprovanteComponentModule } from './../components/item-comprovante/item-comprovante.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CacheModule } from "ionic-cache";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Directive } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { OpcoesCheckoutPage } from '../pages/opcoes-checkout/opcoes-checkout';
import { ScanearQrPageModule } from '../pages/scanear-qr/scanear-qr.module';
import { OpcoesCheckoutPageModule } from '../pages/opcoes-checkout/opcoes-checkout.module';
import { EnderecoPage } from '../pages/endereco/endereco';
import { EnderecoPageModule } from '../pages/endereco/endereco.module';

//Services utilizados em todas as páginas
import { PedidosService } from './../pages/pedidos/pedidos.service';
import { ComandaService } from './../pages/comanda/comanda.service';
import { BandeijaService } from './../pages/bandeija/bandeija.service';
import { CartaoService } from './../pages/cartao/cartao.service';

//Plugins
import { File } from '@ionic-native/file';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


//Providers
import { Funcoes } from './../providers/funcoes';

//Paginas acessadas de qualquer pagina
import { Estabelecimento } from './../pages/estabelecimento/estabelecimento';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { Pedidos } from './../pages/pedidos/pedidos';
import { Bandeija } from './../pages/bandeija/bandeija';
import { Cartao } from './../pages/cartao/cartao';
import { Comanda } from './../pages/comanda/comanda';

//Componentes
import { CadastroCartao } from '../components/cadastro-cartao/cadastro-cartao';
import { ListaCartoesComponent } from '../components/lista-cartoes/lista-cartoes';
import { NotFoundComponent } from '..\components\not-found/not-found';
import { EnderecosPage } from '../pages/enderecos/enderecos';
import { EnderecosPageModule } from '../pages/enderecos/enderecos.module';
import { ListaEnderecosComponent } from '..\components\lista-enderecos/lista-enderecos';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Estabelecimento,
    Comanda,
    Cartao,
    CadastroCartao,
    Pedidos,
    ScanearQrPage,
    EnderecosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    CardapioModule,
    CardapioItemModule,
    CardapioItemDescricaoModule,
    BandeijaModule,
    ComprovantePageModule,
    BoxModule,
    ItemModule,
    FinalizarPedidoModule,
    PedidoDescricaoPageModule,
    ListaCartoesComponentModule,
    ListaEnderecosComponentModule,
    NotFoundComponentModule,
    CadastroModule,
    LayoutModule,
    ItemComprovanteComponentModule,
    ComandasPageModule,
    ComandaDescricaoPageModule,
    ComandasEmAbertoPageModule,
    EnderecoPageModule,
    EnderecosPageModule,
    OpcoesCheckoutPageModule,
    CadastroEnderecoComponentModule,
    PedidoConfirmadoPageModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Estabelecimento,
    Comanda,
    Cartao,
    Pedidos,
    ScanearQrPage,
    OpcoesCheckoutPage,
    EnderecosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    BandeijaService,
    Funcoes,
    File,
    ComandaService,
    PedidosService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
