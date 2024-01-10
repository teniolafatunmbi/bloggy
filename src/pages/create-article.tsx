import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const CreateArticle = () => {
  return (
    <div className='w-full h-full container'>
      <Card className='w-[50%] mx-auto my-[5%]'>
        <CardHeader className='mb-2'>Publish article</CardHeader>
        <CardContent>
          <form className='w-full mx-auto'>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <Label htmlFor='firstname'>First name</Label>
                <Input 
                  type="text" 
                  name='firstname'
                  id="firstname"
                  placeholder='First name' 
                  className='p-3 border rounded-md my-2 w-[20rem]' 
                />
              </div>

              <div>
                <Label htmlFor='lastname'>Last name</Label>
                <Input 
                  type="text" 
                  name='lastname'
                  id="lastname"
                  placeholder='Last name' 
                  className='p-3 border rounded-md my-2 w-[20rem]' 
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
                  className='p-3 border rounded-md my-2 w-[20rem]' 
                />
              </div>

              <div>
                <Label htmlFor='email'>Email</Label>
                <Input 
                  type="email" 
                  name='email'
                  id="phone"
                  placeholder='Email' 
                  className='p-3 border rounded-md my-2 w-[20rem]' 
                />
              </div>
            </div>

            <div>
              <Label htmlFor='content'>Content</Label>
              <Textarea
                name='content'
                id='content'
                placeholder='Type your content'
                rows={6}
              />
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateArticle