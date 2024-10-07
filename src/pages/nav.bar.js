class NavigationMenu {
   constructor(page) {
      this.page = page;
      this.loginButton = this.page.getByRole('link', { name: "Login" });
      this.logoutButton = this.page.getByRole('link', { name: "Logout" });
      this.newArticleButton = this.page.getByRole('link', { name: "New Article" });
      this.userMenu = this.page.locator('.dropdown-toggle');
      this.signupButton = this.page.getByRole('link', { name: "Sign up" });
   }
   async gotoNewArticle() {
      await this.newArticleButton.click();
   }

   async gotoProfile() {
      await this.userMenu.click();
      await this.page.getByRole('link', { name: 'Profile' }).click();
   }

   async gotoProfileSettings() {
      await this.userMenu.click();
      await this.page.getByRole('link', { name: 'Settings' }).click();
   }

   async gotoUserMenu() {
      await this.userMenu.click();
   }

   async logout() {
      await this.userMenu.click();
      await this.logoutButton.click();
   }

   async gotoLogin() {
      await this.loginButton.click();
   }

   async gotoRegister() {
      await this.signupButton.click();
   }

}

export { NavigationMenu }