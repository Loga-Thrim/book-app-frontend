import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { env } from 'src/environments/environment';

interface Book {
  number: number;
  content: SafeHtml;
}

@Component({
  selector: 'app-root',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  public pages: Book[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    fetch(env.apiUrl + '/book')
      .then((res: any) => res.json())
      .then((res: any) => {
        let pages = res.book.map(
          (e: any): Book => ({ number: e.number, content: this.sanitizer.bypassSecurityTrustHtml(e.content) })
        );
        console.log(pages)
        if (pages.length % 2 === 1) {
          pages.push({ number: pages.length - 4 + 1, content: '' });
          pages = pages.sort((a: Book, b: Book) => a.number - b.number);
        }
        this.pages = pages;
        this.loadBook();
      });
  }

  loadBook() {
    interface CustomHTMLElement extends HTMLElement {
      pageNum: number;
    }

    const eqPages = setInterval(() => {
      var pages = Array.from(
        document.getElementsByClassName(
          'page'
        ) as HTMLCollectionOf<CustomHTMLElement>
      );

      if (pages.length === this.pages.length) {
        addBookEvent(pages);
        clearInterval(eqPages);
      }
    }, 10);

    function addBookEvent(pages: any) {
      for (let i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i % 2 === 0) {
          page.style.zIndex = pages.length - i + '';
        }
      }

      for (var i = 0; i < pages.length; i++) {
        let page = pages[i];
        page.pageNum = i + 1;
        page.onclick = function () {
          if (page.pageNum % 2 === 0) {
            page.classList.remove('flipped');
            const previousSibling =
              page.previousElementSibling as Element | null;
            if (previousSibling) {
              previousSibling.classList.remove('flipped');
            }
          } else {
            page.classList.add('flipped');
            const nextSibling = page.nextElementSibling as Element | null;
            if (nextSibling) {
              nextSibling.classList.add('flipped');
            }
          }
        };
      }
    }
  }
}
