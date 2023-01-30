import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  
  // Close the popup
  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
