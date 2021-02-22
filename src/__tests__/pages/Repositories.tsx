import React from 'react'
import { fireEvent } from '@testing-library/react-native'

import Repositories from 'pages/Repositories'
import { render } from 'utils/tests'

const mockedNavigate = jest.fn()
const mockedRepositories = [
  {
    id: 76504246,
    login: 'marcosabb',
    name: 'metro',
    description: '🚇 The JavaScript bundler for React Native.',
    labels: [],
    language: 'JavaScript',
    stargazers_count: 3956,
    updated_at: '2021-02-21T11:57:39Z'
  },

  {
    id: 41523595,
    login: 'marcosabb',
    name: 'react-joyride',
    description: 'Create guided tours in your apps',
    labels: [],
    language: 'JavaScript',
    stargazers_count: 3554,
    updated_at: '2021-02-21T22:42:34Z'
  }
]

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: () => ({
      headerLeft: () => {},
      headerRight: () => {}
    })
  }),
  useRoute: () => ({
    params: {
      user: {}
    }
  })
}))

jest.mock('../../contexts/repositories', () => ({
  useRepositories: () => ({
    repositories: mockedRepositories,
    loading: {},
    setSelectedRepository: jest.fn()
  })
}))

describe('Repositories page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear()
  })

  it('should match snapshot', () => {
    const component = render(<Repositories />)

    expect(component).toMatchSnapshot()
  })

  it('should render items if has repositories', () => {
    const { getByText } = render(<Repositories />)

    const name = getByText('react-joyride')

    expect(name).toBeTruthy()
  })

  it('should be able to navigate to actions page when click item', () => {
    const { getByText } = render(<Repositories />)

    const item = getByText('metro')

    fireEvent.press(item)

    expect(mockedNavigate).toHaveBeenCalledWith('Actions')
  })
})
