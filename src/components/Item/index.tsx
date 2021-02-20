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
  Star,
  StarIcon,
  Labels,
  LabelItem,
  LabelText,
  Tags,
  TagItem,
  TagText,
  TagIcon,
  Loading
} from './styles'

interface Label {
  id: number | string
  value?: number | string
}

interface Tag {
  id: number | string
  icon: string
  value?: number | string
}

interface Props {
  title: string
  description: string
  avatar?: string
  labels?: Label[]
  tags: Tag[]
  highlight?: boolean
  loading?: boolean
  onPress?: () => void
  onRemove?: () => void
}

export default function Item({
  title,
  description,
  avatar,
  labels,
  tags,
  loading,
  highlight,
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

            {highlight && (
              <Star>
                <StarIcon />
              </Star>
            )}
          </Title>
          <Description numberOfLines={2}>{description ?? '-'}</Description>
        </Data>
      </Details>

      {!!labels && labels.length > 0 && (
        <Labels>
          {tags.map(({ id, value }) => (
            <LabelItem key={id}>
              <LabelText>{value ?? '-'}</LabelText>
            </LabelItem>
          ))}
        </Labels>
      )}

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
