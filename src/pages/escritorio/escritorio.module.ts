import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscritorioPage } from './escritorio';

@NgModule({
  declarations: [
    EscritorioPage,
  ],
  imports: [
    IonicPageModule.forChild(EscritorioPage),
  ],
})
export class EscritorioPageModule {}
