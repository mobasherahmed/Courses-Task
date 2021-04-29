import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { HeaderComponent } from "./header/header.component";
import { CoursesComponent } from "./courses/courses.component";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CoursesService } from "src/services/courses.service";
// import { NzToolTipModule } from "ng-zorro-antd/tooltip";
// import { NzPaginationModule } from "ng-zorro-antd/pagination";
// import { NzPaginationModule } from "ng-zorro-antd";
// import {NzEmptyModule} from "ng-zorro-antd/empty"
// import { NgZorroAntdModule } from "ng-zorro-antd";

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, HeaderComponent, CoursesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCheckboxModule,
    NzInputModule,
    NzIconModule ,
    // NzToolTipModule
    // NzPaginationModule
    // NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
