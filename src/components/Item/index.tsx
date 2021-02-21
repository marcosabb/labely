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
  UpdateButton,
  PenIcon,
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
            <ArrowIcon name='keyboard-arrow-right' />

            {onRemove && (
              <DeleteButton onPress={onRemove} testID='delete-button'>
                {loading ? (
                  <Loading size='small' />
                ) : (
                  <TrashIcon name='delete' />
                )}
              </DeleteButton>
            )}

            {highlight && (
              <Star>
                <StarIcon name='star' />
              </Star>
            )}
          </Title>
          <Description numberOfLines={2}>{description ?? '-'}</Description>
        </Data>
      </Details>

      {!!labels && (
        <Labels spacing={!(labels.length > 0)}>
          {labels.length > 0 &&
            labels.map(({ id, value }) => (
              <LabelItem key={id}>
                <LabelText numberOfLines={1}>{value ?? '-'}</LabelText>
              </LabelItem>
            ))}

          <UpdateButton onPress={() => {}}>
            <PenIcon name='create' />
          </UpdateButton>
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
