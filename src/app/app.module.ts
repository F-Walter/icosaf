import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GridListUCComponent } from './components/di-pre-treat-grid-list/grid-list-uc.component';
import { UseCaseDetailsComponent } from './components/di-pre-treat-UCDetails/use-case-details.component';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProblemModalComponent } from './components/di-pre-treat-UCDetails/modal/problem-modal.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DipretreatToolbarComponent } from './components/di-pre-treat-toolbar/dipretreat-toolbar.component';


@NgModule({
  declarations: [
    GridListUCComponent,
    UseCaseDetailsComponent,
    DipretreatToolbarComponent,
    ProblemModalComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
