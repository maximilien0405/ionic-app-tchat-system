import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { fadeAnimation, slideRightAnimation } from 'src/app/common/animations';
import { GetUserService } from 'src/app/common/services/get-user.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['../../sender.component.scss'],
  animations: [fadeAnimation, slideRightAnimation]
})
export class ProfilePictureComponent implements OnInit {
  public paddingTop: number;
  @Input() image: Photo;
  public imageUrl: any;
  @Output() closeValue = new EventEmitter<boolean>();
  @ViewChild('cropper') cropper: ImageCropperComponent;
  isMobile = Capacitor.getPlatform() !== 'web';

  constructor(private getUserService: GetUserService, private userService: UserService) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      this.paddingTop = 0.0625 * (insets.top + 5);
    });
  }

  public ngOnInit(): void {
    this.imageUrl = `data:image/jpeg;base64,${this.image.base64String}`;
  }

  // Convert image to blob and set new profile picture
  public async imageCropped(event: ImageCroppedEvent): Promise<void> {
    fetch(event.base64 || '').then(res => res.blob()).then(res => {
      this.userService.setNewProfilePicture(res)
        .then((res) => {
          this.closeValue.emit(true);
          this.getUserService.getToken();
        });
    })
  }

  // Manually trigger the crop
  public cropImage(): void {
    this.cropper.crop();
  }
}
