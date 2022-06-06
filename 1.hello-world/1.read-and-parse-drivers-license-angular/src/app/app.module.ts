import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { VideoParserComponent } from './video-parser/video-parser.component';
import { ImgParserComponent } from './img-parser/img-parser.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    VideoParserComponent,
    ImgParserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
