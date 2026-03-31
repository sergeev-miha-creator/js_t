export class CommentPage {
    constructor(page) {
        this.page = page;
        //create comment
        this.writeComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postComment = page.getByRole('button', { name: 'Post Comment' });
        //delete comment
        this.deleteCommentButton = page.locator('.btn.btn-sm.btn-outline-secondary.pull-xs-right');
    }
    // бизнесовые действия со страницой
    

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