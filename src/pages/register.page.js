import { BasePage } from "./base.page";

class RegisterPage extends BasePage {
   constructor(page) {
      super(page);
      this.userNameField = this.page.getByPlaceholder('Your Name');
      this.userEmailField = this.page.getByPlaceholder('Email');
      this.userPasswordField = this.page.getByPlaceholder('Password');
      this.registerButton = this.page.getByRole('button', { name: 'Sign up' });
   }

   async registerUser(userName, userEmail, userPassword) {
      await this.userNameField.click();
      await this.userNameField.fill(userName);
      await this.userEmailField.click();
      await this.userEmailField.fill(userEmail);
      await this.userPasswordField.click();
      await this.userPasswordField.fill(userPassword);
      await this.registerButton.click();
   }

}
export { RegisterPage }