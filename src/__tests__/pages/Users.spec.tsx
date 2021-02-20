import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import { render } from '../../utils/tests'

import Users from '../../pages/Users'

const mockedNavigate = jest.fn()
const mockedDeleteUser = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: () => ({
      headerRight: () => {}
    })
  })
}))

jest.mock('../../contexts/users', () => ({
  useUsers: () => ({
    users: [
      {
        id: 56012991,
        name: 'Marcos Borges',
        avatar_url: 'https://avatars.githubusercontent.com/u/56012991?v=4',
        login: 'marcosabb',
        company: 'Incentivar.io',
        location: 'Brasília, Brazil',
        starred: 30
      }
    ],
    deleteUser: mockedDeleteUser,
    loading: {}
  })
}))

describe('Users page', () => {
  it('should match snapshot', () => {
    const component = render(<Users />)

    expect(component).toMatchSnapshot()
  })

  it('should render items if has users', () => {
    const { getByTestId } = render(<Users />)

    const title = getByTestId('item-title')

    expect(title).toBeTruthy()
  })

  it('should be able to remove user', () => {
    const { getByTestId } = render(<Users />)

    const button = getByTestId('delete-button')

    fireEvent.press(button)

    expect(mockedDeleteUser).toHaveBeenCalledWith(56012991)
  })

  it('should be able to navigate to repos page when click item', () => {
    const { getByTestId } = render(<Users />)

    const item = getByTestId('item-container')

    fireEvent.press(item)

    expect(mockedNavigate).toHaveBeenCalledWith('Repos')
  })
})
