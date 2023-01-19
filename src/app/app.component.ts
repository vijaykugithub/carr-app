import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-dark bg-dark">
 <div class="container-fluid">
  <div class="navbar-brand">Cars Application</div>
 </div>
</nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'carr-app';
}
