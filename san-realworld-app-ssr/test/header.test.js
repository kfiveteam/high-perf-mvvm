/**
 * @file jest demo file
 **/
import { shallowMount } from 'san-test-utils'
import header from '../src/components/header'

describe('header', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(header, {
      data: { title: 'jest' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
