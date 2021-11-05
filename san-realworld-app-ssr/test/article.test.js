/**
 * @file jest demo file
 **/
import san from 'san'
import { shallowMount } from 'san-test-utils'
import article from '../src/components/article'

describe('article', () => {
  test('add likenums', done => {
    const wrapper = shallowMount(article)
    const button = wrapper.find('.like')
    button.trigger('click')
    san.nextTick(() => {
      expect(wrapper.data().likeNum).toEqual(1)
      done()
    })
  })

  test('snapshot', () => {
    const wrapper = shallowMount(article)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
