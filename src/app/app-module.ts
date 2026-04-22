import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app';
import { ItemComponent } from './item/item';
import { Produto } from './produto/produto';

@NgModule({
  declarations: [AppComponent, ItemComponent, Produto],
  imports: [BrowserModule,
  HttpClientModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
