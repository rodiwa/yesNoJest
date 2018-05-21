import React from 'react';
import { shallow } from 'enzyme'

import App from './App';
import ask from './api'

jest.mock('./api')

describe('snapshots', () => {
  it('should render the app correctly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('app UI should display correctly', () => {

  it('should display text input for asking question', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('input[type="text"]').length).toBe(1)
  })

  it('should display button input to ask question', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('button').length).toBe(1)
  })

  it('should display answer with text and image', () => {
    const wrapper = shallow(<App />)
    wrapper.find('button').simulate('click')

    return Promise.resolve()
      .then(() => {
        wrapper.update()
    
        const answer = wrapper.find('.answer')
        expect(answer.find('h1').text()).toBe('no')
        expect(answer.find('img').prop('src')).toBe('https://yesno.wtf/assets/no/0-b6d3e555af2c09094def76cf2fbddf46.gif')
      })
  })

  it('should not display any answer by default', () => {
    const wrapper = shallow(<App />)
    const answer = wrapper.find('.answer')
    expect(answer.length).toBe(0)
  })
})

describe('api tests', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  
  it.skip('should call yesNo api', () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => {}
      }))

    return ask()
      .then(() => {
        expect(fetchSpy).toHaveBeenCalledWith('https://yesno.wtf/api/')
      })
  })

  it('should return yesNo response in JSON format', () => {
    return ask()
      .then(response => {
        expect(response).toHaveProperty('answer')
        expect(response).toHaveProperty('image')
      })
  })
  
})
