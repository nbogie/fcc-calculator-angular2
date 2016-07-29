import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [CalculatorComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
}
