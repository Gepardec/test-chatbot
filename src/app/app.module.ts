import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from '@angular/material/button';
import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ChatDisplayComponent,
    ChatInputComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
