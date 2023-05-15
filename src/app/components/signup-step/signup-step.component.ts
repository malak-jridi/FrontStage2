import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup-step',
  templateUrl: './signup-step.component.html',
  styleUrls: ['./signup-step.component.css']
})
export class SignupStepComponent implements OnInit {
  @Input() step!: number;
  steps = [
    { index: 1, title: 'About' },
    { index: 2, title: 'Photo' },
    { index: 3, title: 'Certification' },
    { index: 4, title: 'Rate' },
    { index: 5, title: 'Description' },
    { index: 6, title: 'Video' },
  ]
  ngOnInit(): void {
    
  }
}
