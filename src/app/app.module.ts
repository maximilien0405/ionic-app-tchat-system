import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { DesignSystemComponent } from './design-system/design-system.component';
import { SenderComponent } from './sender/sender.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CreateReminderComponent } from './sender/modals/create-reminder/create-reminder.component';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localeDe);
registerLocaleData(localeEn);
registerLocaleData(localeEs);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localePt);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DesignSystemComponent,
    SenderComponent,
    CreateReminderComponent,
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: LOCALE_ID, useValue: getLocale() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
