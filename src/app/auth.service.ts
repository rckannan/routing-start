export class authService {
  loggedIn: boolean = false;

  isAuthanticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      });
    });
    return promise;
  }

  doLogin() {
    this.loggedIn = true;
  }

  doLogoff() {
    this.loggedIn = false;
  }
}
