import { Component } from '@angular/core';

@Component({
  selector: 'notFound-app',
  styles: [
    `
      .page404 {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        max-width: 400px;
        margin: 0 auto;
      }
    `,
  ],
  template: `
    <div class="page404">
        <div class="content">
          <h1 class="font-size-36 mb-2">Page not found</h1>
          <p class="mb-3">
            The page is deprecated, deleted, or does not exist at all
          </p>
          <h1 class="font-size-80 mb-4 font-weight-bold">404 —</h1>
          <a href routerLink="/all-courses" class="btn btn-success">
            &larr; Go back to the home page
          </a>
        </div>
      </div>
  `,
})
export class NotFoundComponent {}
