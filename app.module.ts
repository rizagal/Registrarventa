import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), provideRemoteConfig(() => getRemoteConfig()), provideStorage(() => getStorage())],
  providers: [InAppBrowser, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}
