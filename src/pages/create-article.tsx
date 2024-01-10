import { createArticle } from '@/adapter/create-post'
import { createUser } from '@/adapter/create-user'
// import { createUser } from '@/adapter/create-user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArticlesContext } from '@/context'
import { useToast } from '@/hooks/use-toast'
import { createArticleSchema } from '@/lib/validation'
import { User } from '@/types'
import { useFormik } from 'formik'
import { useContext } from 'react'

const CreateArticle = () => {
  const { toast } = useToast();
  const { articles, setArticles, setUsersCache } = useContext(ArticlesContext);

  const addUserToCache = (user: User) => {
    setUsersCache((prev) => {
      prev[`${user.id}`] = user;

      return prev;
    })
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
      const user = createUser({ name: `${values.firstname} ${values.lastname}`, email: values.email, phone: values.phone});

      addUserToCache(user);
      
      const article = await createArticle({title: values.title, userId: user.id, body: values.content});
      setArticles([article, ...articles!]);

      toast({
        title: "Article created",
        description: "View articles in the articles page",
      });

      return article;
    } 
  });


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
                  onBlur={formik.handleChange}
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