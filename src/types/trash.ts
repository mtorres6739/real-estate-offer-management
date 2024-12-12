import { Property } from './properties'
import { Offer } from './offers'

export type DeletedItem = {
  type: 'property' | 'offer'
  item: Property | Offer
  deleted_at: string
}
