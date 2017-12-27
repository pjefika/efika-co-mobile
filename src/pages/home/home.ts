import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HolderService } from '../../providers/holder/holderService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: any;
  errorMessage: string;


  constructor(public navCtrl: NavController,
    public rest: RestProvider,
    public holderService: HolderService) {

  }

  ionViewDidLoad() {
    // this.getCountries();
  }

  getCadastro() {
    console.log("toaqui")
    this.rest.getCadastro(this.holderService.instancia)
      .subscribe(
      cadastro => this.holderService.cadastro = cadastro,
      error => this.errorMessage = <any>error);
  }
  hasDetail(ob:any){
    if(typeof(ob.value)==="string"){
      console.log("farse")
      return false
    }
    console.log("letrue")
    return true
  }


}