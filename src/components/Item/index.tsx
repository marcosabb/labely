import React from 'react'

import {
  Container,
  Details,
  Avatar,
  Data,
  TitleWrapper,
  Title,
  Description,
  ArrowIcon,
  DeleteButton,
  TrashIcon,
  Tags,
  TagItem,
  TagText,
  TagIcon
} from './styles'

interface Tag {
  id: number | string
  icon: string
  value: number | string
}

interface Props {
  title: string
  description: string
  avatar?: string
  tags: Tag[]
  onRemove: () => void
}

export default function Item({
  title,
  description,
  avatar,
  tags,
  onRemove
}: Props) {
  return (
    <Container>
      <Details>
        {avatar && <Avatar source={{ uri: avatar }} />}

        <Data>
          <TitleWrapper>
            <Title>{title}</Title>
            <ArrowIcon />
          </TitleWrapper>
          <Description>{description}</Description>
        </Data>

        {onRemove && (
          <DeleteButton>
            <TrashIcon />
          </DeleteButton>
        )}
      </Details>

      {!!tags && tags.length > 0 && (
        <Tags>
          {tags.map(({ id, icon, value }) => (
            <TagItem key={id}>
              <TagIcon name={icon} />
              <TagText>{value}</TagText>
            </TagItem>
          ))}
        </Tags>
      )}
    </Container>
  )
}
