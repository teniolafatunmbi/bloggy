import { Article } from '@/types'
import { Card, CardContent, CardHeader } from '../ui/card'
import { truncateText } from '@/lib'

const ArticleCard = ({ article }: {article: Article}) => {
  return (
        <Card>
            <CardHeader className='font-medium text-xl mb-3'>{article.title}</CardHeader>
            <CardContent>{truncateText(article.body, 100)}</CardContent>
        </Card>
        )
}

export default ArticleCard