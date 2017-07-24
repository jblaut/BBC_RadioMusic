export class Programme {
  constructor (title, synopsis, pid = null) {
    this.title = title
    this.synopsis = synopsis
    this.pid = pid
  }

  structure () {
    let image = ''

    if (this.pid) {
      // if pid provided add an img tag to the programme div
      image = `<img src="https://ichef.bbci.co.uk/images/ic/480x270/${this.pid}.jpg">`
    }

    return `<div class="programme">${image}<div class="inner"><h1>${this.title}</h1><p>${this.synopsis}</p></div></div>`
  }
}
