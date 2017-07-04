import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    HttpModule, 
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
