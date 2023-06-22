import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {
  EditorModule as EtModule,
  TINYMCE_SCRIPT_SRC,
} from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    EtModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [EditorComponent],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class EditorModule {}
