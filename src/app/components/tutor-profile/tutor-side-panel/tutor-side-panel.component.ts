import { Component, Input } from '@angular/core';
import { ITutor } from 'src/app/shared/models/tutor.model';
@Component({
  selector: 'app-tutor-side-panel',
  templateUrl: './tutor-side-panel.component.html',
  styleUrls: ['./tutor-side-panel.component.css']
})
export class TutorSidePanelComponent {
  @Input() tutor!: ITutor;
}
