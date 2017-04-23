import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css'],
})
export class ThemeSelectorComponent {
  toggleTheme$: Subject<string> = new Subject<string>();

  @Output() onSelect: Observable<string> = this.toggleTheme$
    .scan(state => !state, true)
    .startWith(true)
    .map(state => state ? 'default' : 'primary');
}
