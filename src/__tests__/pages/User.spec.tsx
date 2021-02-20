import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import User from '../../pages/User'
import { render } from '../../utils/tests'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}))

jest.mock('../../contexts/users', () => ({
  useUsers: () => ({
    createUser: jest.fn()
  })
}))

describe('Users page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear()
  })

  it('should render correctly', () => {
    const component = render(<User />)

    expect(component).toMatchSnapshot()
  })

  it('should be able to add new user', async () => {
    const { getByTestId } = render(<User />)

    const input = getByTestId('user-input')
    const button = getByTestId('user-button')

    fireEvent.changeText(input, 'marcosabb')

    fireEvent.press(button)

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Users')
    })
  })

  it('should not be able to add new user if name was not provided', async () => {
    const { getByTestId } = render(<User />)

    const input = getByTestId('user-input')
    const button = getByTestId('user-button')

    fireEvent.changeText(input, '')

    fireEvent.press(button)

    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalledWith('Users')
    })
  })
})