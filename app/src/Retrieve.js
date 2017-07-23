import {Programme} from './Programme'

export class Retrieve {
  constructor (path) {
    this.path = path
    this.data = ''
  }

  filter (term, data) {
    let programmes = []

    for (let i = 0; i < data.length; i++) {
      const titles = data[i]['programme']['title']
      const synopsis = data[i]['programme']['short_synopsis']

      if (titles.toLowerCase().search(term) >= 0) {
        $('#noResults').hide()
        if (data[i]['programme']['image'] !== undefined &&
            data[i]['programme']['image']['pid'] !== undefined) {
          const imageID = data[i]['programme']['image']['pid']
          let programme = new Programme(titles, synopsis, imageID)
          programmes.push(programme.structure())
        } else {
          let programme = new Programme(titles, synopsis)
          programmes.push(programme.structure())
        }
      }
    }

    $('#results').empty().append(programmes).show()
  }

  search (searchTerm) {
    // let result
    if (this.constructor.data !== undefined) {
      result = this.filter(searchTerm, this.constructor.data)
    } else {
      fetch(this.path).then(response => {
        if (response.ok) {
          return response
        }
        return Promise.reject(Error('error'))
      }).catch(error => {
        return Promise.reject(Error(error.message))
      })

        .then(response => {
          return response.json()
        }).then(data => {
          this.constructor.data = data
          result = this.filter(searchTerm, this.constructor.data)
        })
    }
  }
}
