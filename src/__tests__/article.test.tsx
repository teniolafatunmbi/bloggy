import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import ArticleCard from '@/components/article/article';

const article = {
    title: 'Test article',
    body: "Test article body",
    userId: 1,
    id: 1,
}

test("displays the article card with title and body", async () => {
    const articleCard = render(<ArticleCard article={article} />);

    const articleTitle = await articleCard.findByTestId('article-title');
    const articleContent = await articleCard.findByTestId('article-content');
    // const articleCard = articleCard.findByTestId('article-card');

    expect(articleTitle.innerText).toBe(article.title)
    expect(article.body).toContain(articleContent.innerText);

    articleCard.unmount();
})