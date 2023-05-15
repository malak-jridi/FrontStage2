import { Component, Input } from '@angular/core';
import { ITutor } from 'src/app/shared/models/tutor.model';

@Component({
  selector: 'app-tutor-about',
  templateUrl: './tutor-about.component.html',
  styleUrls: ['./tutor-about.component.css']
})
export class TutorAboutComponent {
  @Input() tutor!: ITutor;
}
