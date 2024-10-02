//@ts-check

/*
   тесты выполняются параллельно, не последовательно

   0. Пользователь может зарегистрироваться
   1. Пользователь может авторизоваться
   2. Пользователь может разлогиниться

*/

const { test, expect } = require('@playwright/test');
import { MainPage, RegisterPage, NavigationMenu, LoginPage } from '../src/pages/';
import { createTestUser } from '../src/utilites/create.user';

test.describe('Модуль авторизации и регистрации', async () => {
   let testUser;

   test.beforeEach('Предусловия', async ({ page }) => {
      testUser = createTestUser();
      const mainPage = new MainPage(page);
      const registerPage = new RegisterPage(page);
      const navBar = new NavigationMenu(page);
      await mainPage.open('/');
      await navBar.gotoRegister();
      await registerPage.registerUser(testUser.firstName, testUser.email, testUser.password);
   });

   test('Пользователь может зарегистрироваться', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      await expect(navBar.userMenu).toBeVisible();
   });

   test('Пользователь может выйти из профиля', async ({ page }) => {
      const navBar = new NavigationMenu(page);

      await navBar.logout();
      await expect(navBar.loginButton).toBeVisible();
   });

   test('Пользователь не может зарегистрироваться повторно', async ({ page }) => {
      const mainPage = new MainPage(page);
      const registerPage = new RegisterPage(page);
      const navBar = new NavigationMenu(page);

      await navBar.logout();
      await navBar.gotoRegister();
      await registerPage.registerUser(testUser.firstName, testUser.email, testUser.password);

      await expect(navBar.userMenu).not.toBeVisible();
   });

   test('Пользователь может авторизоваться', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const navBar = new NavigationMenu(page);

      await navBar.logout();
      await navBar.gotoLogin();
      await loginPage.login(testUser.email, testUser.password);

      await expect(navBar.userMenu).toBeVisible();

   });

});