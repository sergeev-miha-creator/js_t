export class BasePage {
    constructor (page)
    {
        this.page = page;
        this.newArticle = page.getByRole('link', { name: ' New Article' });
    }


    async gotoNewArticle() {
        await this.newArticleLink.click();
    }
}