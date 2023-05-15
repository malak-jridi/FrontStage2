import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() format!: String;
  @Input() image = '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
  @Input() video = ''

  @Output() fileUpload: EventEmitter<string> = new EventEmitter();

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview: String = '';

  imageInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.preview = this.format === 'image' ? this.image : this.video;
    this.imageInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {  
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;

        // if(file.type.indexOf('image')> -1) {
        //   this.format = 'image';
        // } else if(file.type.indexOf('video')> -1){
        //   this.format = 'video';
        // }
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileUpload.emit(event.body.message);
              this.imageInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
  
            this.currentFile = undefined;
          },
        });
      }
  
      this.selectedFiles = undefined;
    }
  }
}
