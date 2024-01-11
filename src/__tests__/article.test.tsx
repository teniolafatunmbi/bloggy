import { expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import ArticleCard from '@/components/article/article';
import { ArticlesProvider } from '@/context';
import { getUser } from '@/adapter/user';


test("displays the article card with title, body, and author information", async () => {

    const article = {
        title: 'Test article',
        body: "Test article body",
        userId: 1,
        id: 1,
    }

    const mockUser = await getUser(article.userId);

    const articleCard = render(
                <>
                    <ArticlesProvider>
                        <ArticleCard article={article} />
                    </ArticlesProvider>
                </>
        );

    const articleTitle = await articleCard.findByTestId('article-title');
    const articleContent = await articleCard.findByTestId('article-content');
    const articleAuthorName = await articleCard.findByTestId('article-author-name');
    const articleAuthorEmail = await articleCard.findByTestId('article-author-email');

    expect(articleTitle.innerText).toBe(article.title)
    expect(articleContent.innerHTML).toContain(article.body);

    await waitFor(() => {
        expect(articleAuthorName.innerText).toBe(mockUser.name);
        expect(articleAuthorEmail.innerText).toBe(mockUser.email)
    });

    articleCard.unmount();

})