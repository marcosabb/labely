import React from 'react'

import { render } from '../../utils/tests'

import Users from '../../pages/Users'

const mockedNavigate = jest.fn()

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
    ]
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
})
