import { getReviews } from '../actions/reviews'
import ReviewPage from './ReviewsPage'
import sanitise from '@/utils/sanitise'

export default async function page () {
   const reviews = await getReviews();

   return <ReviewPage reviews={sanitise(reviews)} />
}
