import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutPage } from './pages/about/about.page';
import { MainPage } from './pages/main/main.page';
import { SettingsPage } from './pages/settings/settings.page';
import { FilesizePipe } from './pipes/filesize.pipe';
import { ToHmsPipe } from './pipes/to-hms.pipe';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [
    AboutPage,
    AppComponent,
    AudioPlayerComponent,
    FilesizePipe,
    HeaderComponent,
    MainPage,
    SettingsPage,
    ToHmsPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
    RouterModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, deps: [ SettingsService ], multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useFactory: (settings: SettingsService) => settings.deviceCulture, deps: [ SettingsService ] },
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}

/**
 * Load settings and set languages before app start
 */
function appInitializer(settings: SettingsService) {
  return async () => {
    // initialize settings
    return await settings.initialize();
  }
}

