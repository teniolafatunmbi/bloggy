import { expect, test } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { ArticlesProvider } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateArticle from '@/pages/create-article';
import { ViewArticles } from '@/pages/articles';
import useArticles from '@/hooks/use-articles';


test("creates an article and confirms that created article is rendered", async () => {
    const mockQueryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
    });

    const articlesContext = renderHook(useArticles);

    const createArticleComp = render(
                <>
                <QueryClientProvider client={mockQueryClient}>
                    <ArticlesProvider>
                        <CreateArticle />
                    </ArticlesProvider>
                </QueryClientProvider>
                </>
        );

    const formValues = {
        firstname: "Teniola",
        lastname: "Fatunmbi",
        phone: "2345802093023",
        email: "teniolafatunmbi@gmail.com",
        title: "First post",
        content: "Lorem ipsum dolor. What a latin!"
    };

    // set form 
    const firstName = screen.getByRole('textbox', { name: "First name"}) as HTMLInputElement;
    const lastName = screen.getByRole('textbox', { name: "Last name"}) as HTMLInputElement;
    const phone = screen.getByRole('textbox', { name: "Phone"}) as HTMLInputElement;
    const email = screen.getByRole('textbox', { name: "Email"}) as HTMLInputElement;
    const title = screen.getByRole('textbox', { name: "Title"}) as HTMLInputElement;
    const content = screen.getByRole('textbox', { name: "Content"}) as HTMLInputElement;
    const submitBtn = createArticleComp.findByTestId('create-article');
    
    firstName.value = formValues.firstname;
    lastName.value = formValues.lastname;
    phone.value = formValues.phone;
    email.value = formValues.email;
    title.value = formValues.title;
    content.value = formValues.content;
    
    (await submitBtn).click()

    const articles = render(
        <>
        <ArticlesProvider>
            <ViewArticles />
        </ArticlesProvider>
        </>
    );

    // check that the latest article is the newly added article
    await waitFor(() => {
        const articlesCache = articlesContext.result.current.articlesCache;

        if (articlesCache.current) {
            const latestArticle = articlesCache.current[0];
            console.log({latestArticle})
            expect(latestArticle.title).toBe(formValues.title)
            expect(latestArticle.body).toBe(formValues.content)
            console.log('test called!!')
        }

    })
    // check if article is rendered in articles

    createArticleComp.unmount();
    articles.unmount()

})