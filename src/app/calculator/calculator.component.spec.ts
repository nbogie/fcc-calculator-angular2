/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('Component: Calculator', () => {
  it('should create an instance', () => {
    let component = new CalculatorComponent();
    expect(component).toBeTruthy();
  });
});
