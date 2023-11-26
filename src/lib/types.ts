type Recipe = {
  id: string
  title: string
  description: string
  created_at: string
  last_updated: string
  highlights: string[]
  ingredients: string[]
  instructions: string[]
  image: string
  reviews: Review[]
}

type Review = {
  id: string
  created_at: string
  author: User
  review: string
  recipe: Recipe
  rating: string
}

type User = {
  id: string
  user_id: string
  email: string
  first_name: string
  last_name: string
  avatar: string
  role: "Authenticated" | "Moderator"
  favorites: Favorite[]
}

type Blog = {
  id: string
  created_at: string
  last_updated: string
  title: string 
  subtitle: string
  image: string
  top_content: string
  author: User
}

type Testimonial = {
  id: string
  created_at: string
  last_updated: string
  user: User
  testimonial: string
}

type Favorite = {
  id: string
  user_id: string
  recipe: Recipe
}
