import { BasePage } from "./base.page";

class ProfileSettingsPage extends BasePage {
   constructor(page) {
      super(page);
      this.bioField = page.getByRole('textbox', { name: 'bio' });
      this.profilePictureField = this.page.getByPlaceholder('URL of profile picture');
      this.usernameField = this.page.getByPlaceholder('Your Name');
      this.emailField = this.page.getByPlaceholder('Email');
      this.passwordField = this.page.getByPlaceholder('Password');
      this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' });
   }

   //Заполнение bio
   async fillBio(userBio) {
      await this.bioField.click();
      await this.bioField.fill(userBio);
   }

   async clearBio() {
      await this.bioField.clear();
   }

   //Заполнение аватарки
   async fillPic(userPic) {
      await this.profilePictureField.click();
      await this.profilePictureField.fill(userPic);
   }

   async clearPic() {
      await this.profilePictureField.clear();
   }


   //Заполнение имени
   async fillName(userName) {
      await this.usernameField.click();
      await this.usernameField.fill(userName);
   }

   async clearName() {
      await this.usernameField.clear();
   }

   //Заполнение email
   async fillEmail(userEmail) {
      await this.emailField.click();
      await this.emailField.fill(userEmail);
   }

   async clearEmail() {
      await this.emailField.clear();
   }

   async fillPassword(userPassword) {
      await this.passwordField.click();
      await this.passwordField.fill(userPassword);
   }

   async clearPassword() {
      await this.passwordField.clear();
   }

   async updateSettings() {
      this.updateSettingsButton.click();
   }


}
export { ProfileSettingsPage }