import { Component } from '@angular/core';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent {

  languages = [
    {id: 1, label: 'English'}
  ];

  profiles = [
    {id: 1, label: 'Lead Generations'},
    {id: 2, label: 'Sales Excutive'},
    {id: 3, label: 'Check Up Officer'},
  ];

  state = [
    {id: 1, label: 'Uttar Pradesh'}
  ];

}
