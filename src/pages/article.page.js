export class ArticlePage {
    constructor(page) {
        this.page = page;
        //create
        this.newArticle = page.getByRole('link', { name: ' New Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleAbout = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleWrite = page.getByRole('textbox', { name: 'Write your article (in' });
        this.enterTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.articlePublish = page.getByText('Publish Article');
        this.articleCheck = page.getByRole('main');
        //edit
        this.editArticle = page.getByRole('link', { name: ' Edit Article' });
        this.articleUpdate = page.getByRole('button', { name: 'Update Article' });
        //delete
        this.deleteArticleButton = page.getByRole('button').filter({hasText : 'Delete Article'}).first();
        this.articleHeading = page.getByRole('heading', { level: 1 });
    }
    // бизнесовые действия со страницой
    async createNewArticle(articleName) {
        await this.newArticle.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(articleName);
        await this.articleAbout.click();
        await this.articleAbout.fill('Новая статья');
        await this.articleWrite.click();
        await this.articleWrite.fill('Информация о статье');
        await this.enterTags.click();
        await this.enterTags.fill('Статья');
        await this.articlePublish.click();

    }
    
     async updateArticle(articleName) {
        await this.editArticle.nth(1).click();
        await this.articleTitle.click();
        await this.articleTitle.clear();
        await this.articleTitle.fill(articleName);
        await this.articleUpdate.click();
    }

    async deleteArticle() {

        this.page.once('dialog', dialog => {
        dialog.accept();
        });

        await this.deleteArticleButton.click();
    }
}