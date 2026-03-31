export class NewArticlePage {
    constructor(page) {
        this.page = page;
        //create
        this.newArticle = page.getByRole('link', { name: ' New Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleAbout = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleWrite = page.getByRole('textbox', { name: 'Write your article (in' });
        this.enterTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.articlePublish = page.getByText('Publish Article');
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
}