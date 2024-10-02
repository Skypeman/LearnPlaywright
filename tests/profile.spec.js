// @ts-check
import { MainPage, RegisterPage, NavigationMenu, ProfileSettingsPage, LoginPage } from '../src/pages/index';
import { createTestUser } from '../src/utilites/create.user';
const { test, expect } = require('@playwright/test');

test.describe('Модуль Профиль пользователя', async () => {
   let testUser;

   test.beforeEach('Регистрируем тестового пользователя', async ({ page }) => {
      const mainPage = new MainPage(page);
      const registerPage = new RegisterPage(page);
      const navBar = new NavigationMenu(page);
      testUser = createTestUser();

      await mainPage.open('/');
      await navBar.gotoRegister();
      await registerPage.registerUser(testUser.firstName, testUser.email, testUser.password);
   });

   test('Пользователь может заполнить своё BIO', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);

      await navBar.gotoProfileSettings();
      await settingsPage.fillBio(testUser.bio);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.bioField).toHaveValue(testUser.bio);
   });

   test('Пользователь может очистить своё BIO', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);

      await navBar.gotoProfileSettings();
      await settingsPage.fillBio(testUser.bio);
      await settingsPage.updateSettings();
      await settingsPage.refresh();
      await settingsPage.clearBio();
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.bioField).toHaveValue('');
   });

   test('Пользователь может заменить своё BIO', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);
      const newBio = createTestUser().bio;

      await navBar.gotoProfileSettings();
      await settingsPage.fillBio(testUser.bio);
      await settingsPage.updateSettings();
      await settingsPage.refresh();
      await settingsPage.clearBio();
      await settingsPage.fillBio(newBio);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.bioField).toHaveValue(newBio);
   });

   test('Пользователь может Установить аватарку', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);

      await navBar.gotoProfileSettings();
      await settingsPage.fillPic(testUser.avatar);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.profilePictureField).toHaveValue(testUser.avatar);
   });

   test('Пользователь может Удалить аватарку', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);

      await navBar.gotoProfileSettings();
      await settingsPage.fillPic(testUser.avatar);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await settingsPage.clearPic();
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.profilePictureField).toHaveValue('');
   });

   test('Пользователь может Сменить имя', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);
      const newUserName = createTestUser().firstName;

      await navBar.gotoProfileSettings();
      await settingsPage.clearName();
      await settingsPage.fillName(newUserName);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.usernameField).toHaveValue(newUserName);
   });

   test('Пользователь может Сменить Email', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);
      const newUserEmail = createTestUser().email;

      await navBar.gotoProfileSettings();
      await settingsPage.clearEmail();
      await settingsPage.fillEmail(newUserEmail);
      await settingsPage.updateSettings();
      await settingsPage.refresh();

      await expect(settingsPage.emailField).toHaveValue(newUserEmail);
   });

   test('Пользователь может Сменить Пароль', async ({ page }) => {
      const navBar = new NavigationMenu(page);
      const settingsPage = new ProfileSettingsPage(page);
      const loginPage = new LoginPage(page);

      const newUserPassword = createTestUser().password;

      await navBar.gotoProfileSettings();
      await settingsPage.clearPassword();
      await settingsPage.fillPassword(newUserPassword);
      await settingsPage.updateSettings();
      await settingsPage.refresh();
      await navBar.logout();
      await navBar.gotoLogin();
      await loginPage.login(testUser.email, newUserPassword);

      await expect(navBar.userMenu).toBeVisible();
   });

});