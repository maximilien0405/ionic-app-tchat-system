import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user.model';
import { ConversationService } from 'src/app/common/services/conversation.service';
import { SubscriptionService } from 'src/app/common/services/subscription.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  public hideText: boolean = true;
  public user: User;
  public subscriptionUsers: User[];
  public form: FormGroup;
  public userIds: Array<string> = [];

  constructor(
    private modalController: ModalController,
    private conversationService: ConversationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Create form
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }

  public addMember(userId: string) {
    if(this.userIds.includes(userId)) {
      // Remove from list
      for (let index = 0; index < this.userIds.length; index++) {
        const element = this.userIds[index];
        if(element == userId) {
          this.userIds.splice(index, 1);
        }
      }
    } else {
      // Add in the list
      this.userIds.push(userId);
    }
  }

  // Create a group
  public createGroup() {
    this.conversationService.createGroupConversation('group', this.userIds, this.form.get('name')?.value, 'https://icon-library.com/images/group-icon-png/group-icon-png-15.jpg').then((res: any) => {
      if(res.status == 201) {
        // Redirect
        this.modalController.dismiss(null, 'cancel');
        this.router.navigateByUrl('sender/tchat/' + res.data.conversationId);
      }
    })
  }

  // Close the popup
  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
