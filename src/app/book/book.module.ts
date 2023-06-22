import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';

import { NgFor } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NgFor,
  ],
  declarations: [BookComponent],
})
export class BookModule {}
