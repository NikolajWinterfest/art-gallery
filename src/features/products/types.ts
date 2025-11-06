export interface Artwork {
  id: number
  title: string
  short_description: string
  thumbnail: string | null
  liked?: boolean
  artist_display: string
  date_display: string
  alt_text: string
}
