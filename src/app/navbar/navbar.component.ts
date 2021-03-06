import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
   <nav>
      <div class="nav-wrapper grey lighten-4">

        <div id="navbar-mobile hide-on-med-and-up">

          <a routerLink="/" exact class="left brand brand-mobile hide-on-med-and-up">Pave</a>

          <a href="#" data-target="nav-mobile"
          class="sidenav-trigger right hide-on-med-and-up"
          ><i class="material-icons">menu</i></a>

        </div>

        <ul id="nav-desktop" class="hide-on-small-only">
          <li><a routerLink="/" exact class="left brand"
          [class.activated]="currentUrl == '/'">Pave</a></li>
          <li><a routerLink="/about" exact
          [class.activated]="currentUrl == '/about'">About</a></li>
          <li><a routerLink="/contact" exact
          [class.activated]="currentUrl == '/contact'">Contact</a></li>
        <!-- search box -->
        <li class="right"><form>
          <ul>
          <li><div class="input-field">
            <input type="search" id="search" required/>
            <i class="prefix label-icon material-icons green-text">search</i>
            <label id="search-label" for="search" class="">Search jobs...
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <i class="material-icons">close</i>
          </div></li>
          <li class="right"><button class="btn waves-effect waves-light">search</button></li>
          </ul>
        </form></li>
        </ul>

      </div>
   </nav>

  <ul id="nav-mobile" class="sidenav">
    <li><a routerLink="/" exact class="brand brand-logo">Pave</a></li>
    <li><a routerLink="/about" exact>About</a></li>
    <li><a routerLink="/contact" exact>Contact</a></li>
  </ul>

     `,
  styles: [
    `
      ul {
        list-style-type: none;
        text-align: center;
        /* margin: 0; */
      }

      .sidenav li {
        display: block;
      }
      a:not(.btn):not(.activated) {
        font-family: 'Raleway';
        color: #27ae60;
        text-decoration: none;
        /* padding: 6px 8px; */
        /* border-radius: 10px; */
      }
      .activated {
        background: #3c8d44;
        color: #e7e7e7;
      }
      .brand {
        font-size: 32px;
        font-family: 'Raleway';
      }
      nav {
        background: #eee;
        /* padding: 14px 0; */
        /* margin-bottom: 40px; */
      }
      input#search {
        height: 64px;
        margin-bottom: 0;
      }
      #search-label {
        margin: -12px 0 0 50px;
        font-size: 16px;
        text-decoration: underline;
        /* color: #27AE60; */
      }
      #search-label.active {
        margin: -2px 0 0 50px;
      }
      form button {
        margin: -5px 12px 0px 12px;
      }
      .brand-mobile {
        margin-left: 12px;
      }
      @media only screen and (max-width: 672px) {
        .input-field {
          width: 0px;
          opacity: 0;
          pointer-events: none;
        }
      }
    `
  ]
})
export class NavbarComponent implements OnInit {
  currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {}
}
