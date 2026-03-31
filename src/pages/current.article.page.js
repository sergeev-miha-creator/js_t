export class CurrentArticlePage {
    constructor(page) {
        this.page = page;
        //edit article
        this.articleCheck = page.getByRole('main');
        this.editArticle = page.getByRole('link', { name: ' Edit Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleUpdate = page.getByRole('button', { name: 'Update Article' });
        //delete article
        this.deleteArticleButton = page.getByRole('button').filter({hasText : 'Delete Article'}).first();
        this.articleHeading = page.getByRole('heading', { level: 1 });
        //create comment
        this.writeComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postComment = page.getByRole('button', { name: 'Post Comment' });
        //delete comment
        this.deleteCommentButton = page.locator('.btn.btn-sm.btn-outline-secondary.pull-xs-right');
    }
    // бизнесовые действия со страницой

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
    async newComment() {
        await this.writeComment.click();
        await this.writeComment.fill('Отличная статья!');
        await this.postComment.click();
    }

    async deleteComment() {

        this.page.once('dialog', dialog => {
        dialog.accept();
        });

        await this.deleteCommentButton.click();
        
    }
}