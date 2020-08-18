import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateCity } from '../../shared/validators/reactive-city-validator';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {


  formGroup: FormGroup;
  metaData: any[];

  constructor(private fb: FormBuilder) {

    this.metaData = [
      { name: 'id' },
      { name: 'from' },
      { name: 'to' },
      { name: 'date' },
      { name: 'delayed', type: 'checkbox' },

    ];

    this.formGroup = fb.group({
      id: [],
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          validateCity(['Graz', 'Hamburg', 'Zürich'])
        ]
      ],
      to: ['Hamburg'],
      date: [],
      delayed: []
    });

    this.formGroup.valueChanges.subscribe(value => {
      console.debug('form', value);
    });

    this.formGroup.controls['from'].valueChanges.subscribe(value => {
      console.debug('from', value);
    });

  }

  save() {
    const flight = this.formGroup.value;
    console.debug('save not impl.', flight);
  }

  ngOnInit(): void {
  }

}