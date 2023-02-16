import { author } from '../../types/author'

interface ContentAuthorProps {
  authors: author[],
  date: string,
  updatedDate?: string,
  avatarSize?: string,
}

export type { ContentAuthorProps }