import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AUTH_STATE, AuthEffects, authReducer } from './store';

@NgModule({
  imports: [
    AngularFireAuthModule,
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE, authReducer)
  ]
})
export class AuthModule {}

console.log('here');
