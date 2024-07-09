import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AjaxService } from '../../../services/ajax.service';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-joke',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,PopupComponent],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss'
})
export class JokeComponent {
  jokeForm: FormGroup;
  jokeData: any;
  @ViewChild('popup') popup: PopupComponent | undefined;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private dataService: DataService
  ) {
    this.jokeForm = this.fb.group({
      categorySelection: ['any', Validators.required],
      categories: this.fb.group({
        programming: [{ value: false, disabled: true }],
        misc: [{ value: false, disabled: true }],
        dark: [{ value: false, disabled: true }],
        pun: [{ value: false, disabled: true }],
        spooky: [{ value: false, disabled: true }],
        christmas: [{ value: false, disabled: true }],
      }, { validators: this.atLeastOneCategory }),
      language: ['en', Validators.required],
      blacklist: this.fb.group({
        nsfw: [false],
        religious: [false],
        political: [false],
        racist: [false],
        sexist: [false],
        explicit: [false],
      }),
      responseFormat: ['json'],
      jokeType: this.fb.group({
        single: [false, Validators.requiredTrue],
        twopart: [false, Validators.requiredTrue],
      }),
      searchString: [''],
      idRange: this.fb.group({
        from: [0, Validators.min(0)],
        to: [35, Validators.max(318)],
      }),
      amount: [5, [Validators.required, Validators.min(1)]],
    }, { validators: this.atLeastOneJokeType });
  }

  atLeastOneCategory(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const categories = formGroup.controls;
    const isAnySelected = Object.keys(categories).some(key => categories[key].value);
    return isAnySelected ? null : { atLeastOneCategory: true };
  }

  atLeastOneJokeType(formGroup: FormGroup) {
    const single = formGroup.get('jokeType.single')?.value;
    const twopart = formGroup.get('jokeType.twopart')?.value;
    return single || twopart ? null : { atLeastOneJokeType: true };
  }

  ngOnInit(): void {
    this.jokeForm.get('categorySelection')?.valueChanges.subscribe(value => {
      const categoriesControl = this.jokeForm.get('categories') as FormGroup;
      if (value === 'any') {
        categoriesControl.disable();
      } else {
        categoriesControl.enable();
      }
    });
  }

  onSubmit(): void {

    if (!this.jokeForm.valid) {
      this.jokeForm.markAllAsTouched();
    } else {
      let url = '';
      let formValue = this.jokeForm.getRawValue();
      console.log(formValue);

      //category
      if (formValue.categorySelection === 'any') {
        url = url + 'Any';
      } else {
        for (let key in formValue.categories) {
          if (formValue.categories[key]) {
            url = url + key.charAt(0).toUpperCase() + key.slice(1) + ',';
          }
        }
        url = url.endsWith(',') ? url.slice(0, -1) : url;
      }

      //language
      if (formValue.language !== 'en') {
        url = url + '?lang=' + formValue.language;
      }

      //blacklist blacklist
      let blacklist = Object.keys(formValue.blacklist)
        .filter(key => formValue.blacklist[key]) // Filter keys where the value is true
        .join(',');
      if (blacklist !== '') {
        url = url.includes('lang') ? `${url}&blacklistFlags=${blacklist}` : `${url}?blacklistFlags=${blacklist}`
      }
      let symbol = (!url.includes('lang') && !url.includes('blacklistFlags')) ? '?' : '&';

      //Format
      if (formValue.responseFormat !== 'default') {
        url = url + symbol + 'format=' + formValue.responseFormat;
      }

      //jokeType
      symbol = (!url.includes('lang') && !url.includes('blacklistFlags')&&!url.includes('format')) ? '?' : '&';
      if (!formValue.jokeType.single && formValue.jokeType.twopart) {
        url = url + symbol + 'type=twopart';

      } else if (formValue.jokeType.single && !formValue.jokeType.twopart) {
        url = url + symbol + 'type=single';
      }

      //search string
      symbol = (!url.includes('lang') && !url.includes('blacklistFlags')&&!url.includes('format')&&!url.includes('type')) ? '?' : '&';
      if(formValue.searchString.trim()!==''){
        url = url + symbol + 'contains='+formValue.searchString.trim();
      }

      //Range
      symbol = (!url.includes('lang') && !url.includes('blacklistFlags')&&!url.includes('format')&&!url.includes('type')&&!url.includes('contains')) ? '?' : '&';
      if (formValue.idRange.from !==0 && formValue.idRange.to !==318) {
        url = url + symbol + 'idRange='+formValue.idRange.from+'-'+formValue.idRange.to;

      } 

      //number of jokes
      symbol = (!url.includes('lang') && !url.includes('blacklistFlags')&&!url.includes('format')&&!url.includes('type')&&!url.includes('contains')&&!url.includes('idRange')) ? '?' : '&';
      if (formValue.amount>1) {
        url = url + symbol + 'amount='+formValue.amount;

      } 


      console.log(url)
      this.getJoke(url)
    }

    
  }




getJoke(filter: any){
  const { API_CONFIG, API_URLs } = this.apiService;
  const url = `${API_URLs.getJoke(filter)}`;
  let config = {
    url: url,
    cacheKey: false
  }
  this.ajaxService.getWithCache(config).subscribe((data: any) => {
    this.jokeData = data;
    this.openPopup();
  })
}
openPopup() {
  if (this.popup) {
    this.popup.show();
  }
}

onPopupClose() {
  console.log('Popup closed');
}
}
