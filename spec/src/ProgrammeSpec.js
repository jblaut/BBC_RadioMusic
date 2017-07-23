import {Programme} from '../../app/src/Programme'

describe('Programme', () => {
  function newProgramme (title, synopsis, pid) {
    let programme = new Programme(title, synopsis, pid)
    let result = programme.structure()

    return result
  }

  it('should get data and return as HTML', () => {
    let result = newProgramme('title', 'synopsis', '1234567890')

    expect(result).toBe(`<div class="programme"><img src="https://ichef.bbci.co.uk/images/ic/480x270/1234567890.jpg"><div class="inner"><h1>title</h1><p>synopsis</p></div></div>`)
  })

  it('should not create image tag if no PID', () => {
    let result = newProgramme('title', 'synopsis')

    expect(result).toBe(`<div class="programme"><div class="inner"><h1>title</h1><p>synopsis</p></div></div>`)
  })
})
