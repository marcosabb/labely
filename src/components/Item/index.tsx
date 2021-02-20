import React from 'react'

import {
  Container,
  Details,
  Avatar,
  Data,
  Title,
  TitleText,
  Description,
  ArrowIcon,
  DeleteButton,
  TrashIcon,
  Tags,
  TagItem,
  TagText,
  TagIcon,
  Loading
} from './styles'

interface Tag {
  id: number | string
  icon: string
  value?: number | string
}

interface Props {
  title: string
  description: string
  avatar?: string
  tags: Tag[]
  loading: boolean
  onPress: () => void
  onRemove: () => void
}

export default function Item({
  title,
  description,
  avatar,
  tags,
  loading,
  onPress,
  onRemove
}: Props) {
  return (
    <Container onPress={onPress} testID='item-container'>
      <Details>
        {avatar && <Avatar source={{ uri: avatar }} />}

        <Data>
          <Title>
            <TitleText numberOfLines={1} testID='item-title'>
              {title ?? '-'}
            </TitleText>
            <ArrowIcon />

            {onRemove && (
              <DeleteButton onPress={onRemove} testID='delete-button'>
                {loading ? <Loading size='small' /> : <TrashIcon />}
              </DeleteButton>
            )}
          </Title>
          <Description>{description ?? '-'}</Description>
        </Data>
      </Details>

      {!!tags && tags.length > 0 && (
        <Tags>
          {tags.map(({ id, icon, value }) => (
            <TagItem key={id}>
              <TagIcon name={icon} />
              <TagText>{value ?? '-'}</TagText>
            </TagItem>
          ))}
        </Tags>
      )}
    </Container>
  )
}
