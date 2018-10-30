import { NotFoundComponentModule } from './../components/not-found/not-found.module';
import { ItemModule } from './../components/item/item.module';
import { BoxModule } from './../components/box/box.module';
import { BandeijaIconModule } from './../components/bandeija-icon/bandeija-icon.module';
import { FooterModule } from './../components/footer/footer.module';
import { HeaderModule } from './../components/header/header.module';

import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        HeaderModule,
        FooterModule,
        BandeijaIconModule,
        BoxModule,
        ItemModule,
        NotFoundComponentModule
    ],
    entryComponents: [],
    providers: []
})
export class LayoutModule { }