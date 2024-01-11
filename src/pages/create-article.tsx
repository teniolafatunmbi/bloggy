import { createArticle } from '@/adapter/article'
import { createUser } from '@/adapter/user'
// import { createUser } from '@/adapter/create-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArticlesContext } from '@/context'
import { useToast } from '@/hooks/use-toast'
import useUserLocation from '@/hooks/use-user-location'
import { createArticleSchema } from '@/lib/validation'
import { User } from '@/types'
import { useFormik } from 'formik'
import { useContext, useEffect } from 'react'

const CreateArticle = () => {
  const { toast } = useToast();
  const { setUsersCache, updateArticles, usersCache, articlesCache } = useContext(ArticlesContext);
  const { location } = useUserLocation();

  const addUserToCache = (user: User) => {
    setUsersCache((prev) => {
      prev[`${user.id}`] = user;

      return prev;
    });
  }


  const getLastUserId = () => {
    const userIds = Object.keys(usersCache).sort((a, b) => (+a) - (+b));

    return +(userIds.slice(-1));
  }

  const getLastArticleId = () => {
    if (!articlesCache.current) {
      return 101;
    }

    const articleIds = articlesCache.current.map((article) => article.id).sort((a, b) => (+a) - (+b));

    return +(articleIds.slice(-1));
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      title: '',
      content: ''
    },
    validationSchema: createArticleSchema,
    onSubmit: async (values) => {
      if (isNaN(+values.phone)){
        formik.setFieldError('phone', 'Phone number must be a valid number')
        return;
      }
      
      const lastUserId = getLastUserId();
      const user = createUser(lastUserId, { name: `${values.firstname} ${values.lastname}`, email: values.email, phone: values.phone});

      addUserToCache(user);
      const lastArticleId = getLastArticleId();
      const article = await createArticle(lastArticleId, {title: values.title, userId: user.id, body: values.content});
      updateArticles(article)

      toast({
        title: "Article created",
        description: "View articles in the articles page",
      });

      return article;
    } 
  });

  useEffect(() => {
    let phoneCountryCode = (location['country_calling_code']);

    if (phoneCountryCode) {
      phoneCountryCode = (phoneCountryCode as string).substring(1);
    }

    formik.setFieldValue('phone', phoneCountryCode);
  }, [location])

  return (
    <div className='w-full container'>
      <Card className='w-[50%] mx-auto my-[5%]'>
        <CardHeader className='mb-2 font-bold text-xl'>Publish article</CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className='w-full mx-auto flex flex-col gap-2'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label htmlFor='firstname'>First name</Label>
                <Input 
                  type="text" 
                  name='firstname'
                  id="firstname"
                  placeholder='First name' 
                  className='p-3 border rounded-md w-[20rem]' 
                  formik={formik}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Label htmlFor='lastname'>Last name</Label>
                <Input 
                  type="text" 
                  name='lastname'
                  id="lastname"
                  placeholder='Last name' 
                  className='p-3 border rounded-md w-[20rem]' 
                  formik={formik}
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                
              </div>
            </div>
            
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label htmlFor='phone'>Phone</Label>
                <Input 
                  type="tel" 
                  name='phone'
                  id="phone"
                  placeholder='Phone number' 
                  className='p-3 border rounded-md w-[20rem]' 
                  onBlur={formik.handleBlur}
                  formik={formik}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Label htmlFor='email'>Email</Label>
                <Input 
                  type="email" 
                  name='email'
                  id="phone"
                  placeholder='Email' 
                  className='p-3 border rounded-md w-[20rem]' 
                  onBlur={formik.handleBlur}
                  formik={formik}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <hr className='my-2'/>

            <section className='flex flex-col gap-2'>
              <div>
                <Label htmlFor='email'>Title</Label> <br />
                <Input 
                  type="text" 
                  name='title'
                  id="title"
                  placeholder='Title' 
                  className='p-3 border rounded-md w-full' 
                  onBlur={formik.handleBlur}
                  formik={formik}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Label htmlFor='content'>Content</Label>
                <Textarea
                  name='content'
                  id='content'
                  placeholder='Type your content'
                  rows={6}
                  formik={formik}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                />
              </div>
              
            </section>
            
            <div className='flex flex-row justify-end'>
              <Button type='submit' variant={"secondary"} className='bg-gray-300'>
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateArticle;