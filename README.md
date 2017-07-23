# BBC Radio & Music Task

## Prerequisites

* Node
* Docker

## Installation

1. `npm install`
2. `docker build -t bbc_rmtask .`
3. `npm run build`

## Usage
1. `docker run -d --rm -p 8080:80 -v /$(pwd)/app:/var/www/html bbc_rmtask`

### Tests
`npm run test`

### Linting
`npm run lint`
