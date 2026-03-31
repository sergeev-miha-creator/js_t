export class MainPage {
    constructor (page)
    {
        this.page = page;

        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.messageText = page.getByText('Articles not available.');
    }
    async gotoRegister() {
        await this.signupLink.click();
    }
    async open ()
    {
       await this.page.goto('https://realworld.qa.guru/');
    }
    async isArticlesListEmpty() {
        return this.messageText.isVisible();
    }
}