// @ts-check

import '../../src'

describe('global session methods', () => {
  beforeEach(() => {
    cy.dataSession({
      name: 'C',
      setup: () => 'c',
      validate: (x) => x === 'd',
    })
  })

  it('exist on Cypress object', () => {
    expect(Cypress).to.include.keys(
      'getDataSessionDetails',
      'getDataSession',
      'dataSessions',
      'setDataSession',
      'clearDataSession',
    )
  })

  it('has getDataSessionDetails', () => {
    const ds = Cypress.getDataSessionDetails('C')
    expect(ds).to.deep.include({
      data: 'c',
    })
  })

  it('has getDataSession', () => {
    const ds = Cypress.getDataSession('C')
    expect(ds).to.equal('c')
  })

  it('lists data sessions', () => {
    const sessions = Cypress.dataSessions()
    expect(sessions).to.deep.include({
      name: 'C',
      value: 'c',
    })
  })

  it('clears the data sessions', () => {
    const sessions = Cypress.dataSessions()
    expect(sessions).to.have.length.greaterThan(0)
    Cypress.clearDataSessions()
    const currentSessions = Cypress.dataSessions()
    expect(currentSessions).to.deep.equal([])
  })
})
