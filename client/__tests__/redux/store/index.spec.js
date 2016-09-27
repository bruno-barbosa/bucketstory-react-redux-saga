import { default as createStore } from 'redux/store'

describe('(Store), CreateStore', () => {
  let _store

  before(() => {
    _store = createStore()
  })

  it('should have an empty asyncReducers object', () => {
    expect(_store.asyncReducers).to.be.an('object')
    expect(_store.asyncReducers).to.be.empty
  })

  it('should have an empty asyncSagas object', () => {
    expect(_store.asyncSagas).to.be.an('object')
    expect(_store.asyncSagas).to.be.empty
  })
})
