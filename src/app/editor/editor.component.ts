import { Component } from '@angular/core';
import { env } from '../../environments/environment';

interface Book {
  value: number;
  viewValue: string;
}

@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  public dataModel = '';
  public book: Book[] = [];
  public page: number = -2;

  ngOnInit() {
    this.fetchPage();
  }

  fetchPage() {
    fetch(env.apiUrl + '/book')
      .then((res: any) => res.json())
      .then((res: any) => {
        this.book = res.book
          .map(
            (e: any): Book => ({ value: e.number, viewValue: e.view_number })
          )
          .sort((a: Book, b: Book) => a.value - b.value);
      });
  }

  selectPage(page: any) {
    fetch(env.apiUrl + `/book/${page}`)
      .then((res: any) => res.json())
      .then((res: any) => {
        this.dataModel = res.content;
      });
  }

  addPage() {
    fetch(env.apiUrl + '/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: this.book.length - 4 + 1 }),
    }).then(() => this.fetchPage());
  }

  deletePage() {
    fetch(env.apiUrl + `/book/${this.page}`, {
      method: 'DELETE',
    }).then(() => {
      this.fetchPage();
      this.page = this.page === 1 ? -1 : this.page - 1;
    });
  }

  isDisabled() {
    const page = this.page;
    const cond = [-2, -1, 999, 1000];
    return cond.indexOf(page) >= 0 || page < this.book.length - 4;
  }

  submit() {
    fetch(env.apiUrl + '/book', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: this.page,
        content: this.dataModel,
      }),
    });
  }
}
