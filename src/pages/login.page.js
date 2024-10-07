import { BasePage } from "./base.page";

class LoginPage extends BasePage {
   constructor(page) {
      super(page);
      this.emailField = this.page.getByPlaceholder('Email');
      this.passwordField = this.page.getByPlaceholder('Password');
      this.loginButton = this.page.getByRole('button', { name: 'Login' });
      this.needAccountButton = this.page.getByRole('link', { name: 'Need an account?' });
   }

   async login(email, password) {
      await this.emailField.click();
      await this.emailField.fill(email);
      await this.passwordField.click();
      await this.passwordField.fill(password);
      await this.loginButton.click();
   }

   async needAccount() {
      await this.needAccountButton.click();
   }

}
export { LoginPage }