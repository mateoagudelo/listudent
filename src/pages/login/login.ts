import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { EscritorioPage } from '../escritorio/escritorio';
import { AlertController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public numerodoc;
  data: Observable<any>;
  result:any = [];
  resultado:any;
  id_verificado:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  postData() {
    var url = "http://68.183.105.149/api/index.php?documento="+this.numerodoc;

    this.data = this.http.get(url);
    this.data.subscribe(data => {
      this.storage.set('id', data.id);
      this.storage.set('identificador', data.id);
      this.storage.set('documento', data.documento);
      this.storage.set('nombre', data.nombre);
      this.storage.set('correo', data.correo);
    });
  }

  actionLogin() {

    if (this.numerodoc == null) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Por favor ingrese un número de documente válido!',
        buttons: ['Ok']
      });
      alert.present();     
    } else {

    this.postData();

    const loader = this.loadingCtrl.create({
      content: "Conectando...",
      duration: 10000
    });
    loader.present();

    loader.onDidDismiss(() => {
      this.storage.get('id').then((val) => {

        if (val != null) {
          this.navCtrl.push(EscritorioPage);
          console.log(val);
        } else {
            let alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'No se han podido encontrar notas con el número de documento: '+this.numerodoc+', por favor revisalo nuevamente!',
              buttons: ['Ok']
            });
            alert.present();
        }

      });
    });

  }

  }

}
