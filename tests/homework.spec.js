import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { ArticlePage } from '../src/pages/article.page';
import { CommentPage} from '../src/pages/comment.page';

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
    const articlePage = new ArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await articlePage.createNewArticle(articleName);
    await expect(articlePage.articleCheck).toContainText(articleName);
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
    const articlePage = new ArticlePage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await articlePage.createNewArticle(articleName);
    await articlePage.updateArticle(articleName);
    await expect(articlePage.articleCheck).toContainText(articleName);
  });

  test('Удаление статьи', async ({ page }) => {

    const user = {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    
    const articleName = faker.word.words();

    const articlePage = new ArticlePage(page);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    
    await articlePage.createNewArticle(articleName);
    await expect(articlePage.articleHeading).toContainText(articleName);
    await articlePage.deleteArticle();
    await expect(mainPage.messageText).toBeVisible();
});

test('Создание комментария', async ({page}) => {
    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const articleName = faker.word.words();
    const commenText = 'Отличная статья!';
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const articlePage = new ArticlePage(page);
    const commentPage = new CommentPage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await articlePage.createNewArticle(articleName);
    await commentPage.newComment();
    await expect(articlePage.articleCheck).toContainText(commenText);
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
    const articlePage = new ArticlePage(page);
    const commentPage = new CommentPage(page);

    await mainPage.gotoRegister();
    await registerPage.signup(user);
    await articlePage.createNewArticle(articleName);
    await commentPage.newComment();
    await expect(articlePage.articleCheck).toContainText(commentText);
    await commentPage.deleteComment();
    await expect(articlePage.articleCheck).not.toContainText(commentText);
  });

});