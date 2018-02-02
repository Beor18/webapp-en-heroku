import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
//import { MapaDetallePage } from '../mapa-detalle/mapa-detalle';
//import { TodoMapaPage } from '../todo-mapa/todo-mapa';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage{
  museumList = [];
  loader: Loading;
  filteredMuseum = [];
  isfiltered: boolean ;

  constructor(private http:Http, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.isfiltered = false;
    this.presentLoading();
    this.http.get('https://demo-fernando.herokuapp.com/todos')
    .map(res => res.json())
    .subscribe(data => {
        this.museumList = data
        this.loader.dismiss();
      },
      err => console.log("error is "+err), // error
      () => console.log('data de telos completa'+ this.museumList) // complete
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

  itemTapped(museum) {
     this.navCtrl.push(MapaDetallePage, {
       museum: museum
     });
  }

  allMuseumMap(){
    this.navCtrl.push(TodoMapaPage, {
       museumList: this.museumList
    });
  }

  doRefresh(refresher) {
    this.http.get('https://demo-fernando.herokuapp.com/todos')
    .map(res => res.json())
    .subscribe(data => {
        this.museumList = data
        this.loader.dismiss();
      },
      err => console.log("error is "+err), // error
      () => console.log('data de telos completa'+ this.museumList) // complete
    );

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

