import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { NewArticlePage } from '../src/pages/new.article.page';
import { CurrentArticlePage} from '../src/pages/current.article.page';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Создание новой статьи', async ({ page }) => {

    const user = {
      username: faker.person.fullName(), 
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const articleName = faker.word.words(3);

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticlePage = new NewArticlePage(page);
    const currentArticlePage = new CurrentArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await newArticlePage.createNewArticle(articleName);
    await expect(currentArticlePage.articleCheck).toContainText(articleName);
  });


  test('Редактирование статьи', async ({page}) => {

    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const articleName = faker.word.words();

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticlePage = new NewArticlePage(page);
    const currentArticlePage = new CurrentArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await newArticlePage.createNewArticle(articleName);
    await currentArticlePage.updateArticle(articleName);
    await expect(currentArticlePage.articleCheck).toContainText(articleName);
  });

  test('Удаление статьи', async ({ page }) => {

    const user = {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    
    const articleName = faker.word.words();
    
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticlePage = new NewArticlePage(page);
    const currentArticlePage = new CurrentArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await newArticlePage.createNewArticle(articleName);
    await expect(currentArticlePage.articleHeading).toContainText(articleName);
    await currentArticlePage.deleteArticle();
    await expect(mainPage.messageText).toBeVisible();
});

test('Создание комментария', async ({page}) => {
    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const articleName = faker.word.words();
    const commentText = 'Отличная статья!';
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticlePage = new NewArticlePage(page);
    const currentArticlePage = new CurrentArticlePage(page);


    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await newArticlePage.createNewArticle(articleName);
    await currentArticlePage.newComment();
    await expect(currentArticlePage.articleCheck).toContainText(commentText);
  });

  test('Удаление комментария', async ({page}) => {
    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const articleName = faker.word.words();
    const commentText = 'Отличная статья!';
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const newArticlePage = new NewArticlePage(page);
    const currentArticlePage = new CurrentArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await newArticlePage.createNewArticle(articleName);
    await currentArticlePage.newComment();
    await expect(currentArticlePage.articleCheck).toContainText(commentText);
    await currentArticlePage.deleteComment();
    await expect(currentArticlePage.articleCheck).not.toContainText(commentText);
  });

});