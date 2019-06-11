import { Component, OnInit, Input } from '@angular/core';

import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AprovisionamentoService } from './aprovisionamento.service';
import { Device } from '../../view-model/aprovisionamento/device';

@Component({
    selector: 'aprovisionamento-component',
    templateUrl: 'aprovisionamento.component.html',
    providers: [AprovisionamentoService]
})

export class AprovisionamentoComponent extends SuperComponentService implements OnInit {

    public ss: string = "8-";

    public jafoiss: boolean = false

    public devices: Device[];

    public leDevice: Device;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        public navCtrl: NavController,
        public aprvService: AprovisionamentoService
    ) {
        super(alertCtrl, loadingCtrl, holderService)
    }

    public ngOnInit() {
    }

    public chooseDevice(device: Device) {
        this.leDevice = device
    }

    public leHg: Device = null;
    public setLeHg() {
        this.devices.forEach(x => {
            if (x.tipo == "HG") {
                this.leHg = x;
            }
        })
    }

    private count: number = 0;
    public aprovisionamento() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Aprovisionando " + this.leDevice.serial);
        if (this.leDevice.tipo != "HG") {
            this.setLeHg();
        }
        this.aprvService.aprovisionar(this.ss, this.holderService.cadastro, this.leDevice, this.leHg).then(response => {
            if (response) {
                this.startTimer();
                let rqSi = setInterval(() => {
                    if (this.count < this.holderService.rcount) {
                        this.count++;
                        this.aprvService
                            .gettask(response.id)
                            .then(resposta => {
                                if (resposta.state === "EXECUTED") {
                                    if (super.validState(resposta.output, this.holderService.instancia)) {
                                        this.devices = resposta.output.devices
                                        this.leDevice = null
                                        this.leHg = null
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    } else {
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                }
                            }, error => {
                                qntErro++;
                                if (qntErro > 3) {
                                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                    this.loading(false);
                                    clearInterval(rqSi);
                                }
                            });
                        if (this.count === this.holderService.rcount && this.holderService.certification) {
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    } else {
                        this.loading(false);
                        this.tempobuscaexcedido();
                        clearInterval(rqSi);
                    }
                }, this.holderService.rtimeout);
            } else {
                this.loading(false);
                super.showAlert(super.makeexceptionmessageTitle("Erro ao buscar slots", true), super.makeexceptionmessage(response.exceptionMessage, this.holderService.instancia));
            }
        }, error => {
            this.loading(false);
            super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
            console.log("Deu erro!!! AMD p(o.o)q");
        });
    }
    public getSlots() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Buscando Slots");
        this.aprvService.listSlots(this.ss, this.holderService.cadastro).then(response => {
            if (response) {
                this.startTimer();
                let rqSi = setInterval(() => {
                    if (this.count < this.holderService.rcount) {
                        this.count++;
                        this.aprvService
                            .gettask(response.id)
                            .then(resposta => {
                                if (resposta.state === "EXECUTED") {
                                    if (super.validState(resposta.output, this.holderService.instancia)) {
                                        this.devices = resposta.output.devices
                                        this.jafoiss = true
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    } else {
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                }
                            }, error => {
                                qntErro++;
                                if (qntErro > 3) {
                                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                    this.loading(false);
                                    clearInterval(rqSi);
                                }
                            });
                        if (this.count === this.holderService.rcount && this.holderService.certification) {
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    } else {
                        this.loading(false);
                        this.tempobuscaexcedido();
                        clearInterval(rqSi);
                    }
                }, this.holderService.rtimeout);
            } else {
                this.loading(false);
                super.showAlert(super.makeexceptionmessageTitle("Erro ao buscar slots", true), super.makeexceptionmessage(response.exceptionMessage, this.holderService.instancia));
            }
        }, error => {
            this.loading(false);
            super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
            console.log("Deu erro!!! AMD p(o.o)q");
        });
    }


    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }




}