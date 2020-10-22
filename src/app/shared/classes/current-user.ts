export class CurrentUser {
  email: string;
  isAdmin: boolean;

  constructor(obj) {
    this.email = obj.email;
    this.isAdmin = obj.isAdmin;
  }
}
