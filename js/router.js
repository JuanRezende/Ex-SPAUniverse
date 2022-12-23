export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    if (window.location.pathname == "/exploration") {
      document.body.style.backgroundImage =
        "url(../assets/img/mountains-universe-3.png)";

      document.querySelector("#exploration").classList.add("active");
      document.querySelector("#universe").classList.remove("active");
      document.querySelector("#home").classList.remove("active");
    } else if (window.location.pathname == "/universe") {
      document.body.style.backgroundImage =
        "url(../assets/img/mountains-universe02.png)";

      document.querySelector("#universe").classList.add("active");
      document.querySelector("#home").classList.remove("active");
      document.querySelector("#exploration").classList.remove("active");
    } else {
      document.body.style.backgroundImage =
        "url(../assets/img/mountains-universe-1.png)";

      document.querySelector("#home").classList.add("active");
      document.querySelector("#universe").classList.remove("active");
      document.querySelector("#exploration").classList.remove("active");
    }

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
