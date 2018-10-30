import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the EscritorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escritorio',
  templateUrl: 'escritorio.html',
})
export class EscritorioPage {

  public nombre:any;
  public notas_consulta:any;
  public notas:any;
  public id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,  public http: HttpClient,  public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.storage.get('id').then((val) => {
      this.id = val;
    });

    this.storage.get('nombre').then((val) => {
      this.nombre = val;
    });

    const loader = this.loadingCtrl.create({
      content: "Estamos buscando tus notas, por favor espera...",
      duration: 5000
    });
    loader.present();

    loader.onDidDismiss(() => {
      this.cargarDatos();
    });

  }

  cargarDatos() {
    var url = "http://68.183.105.149/api/index.php?id="+this.id+"";

    this.notas_consulta = this.http.get(url);
    this.notas_consulta.subscribe(data => {
      this.notas = data;
    });
  }

  irPerfil() {
    this.navCtrl.push(PerfilPage);
  }

}
