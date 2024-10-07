class BasePage {
   constructor(page) {
      this.page = page;
   }

   async open(url) {
      await this.page.goto(url);
   }

   async refresh() {
      await this.page.waitForTimeout(500);
      await this.page.reload();
   }

}

export { BasePage }