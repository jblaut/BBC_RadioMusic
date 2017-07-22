# BBC Radio & Music Task

## Prerequisites

* Node
* Docker

## Installation

1. `npm install`
2. `docker build -t bbc_rmtask .`

## Usage
1. `docker run -d --rm -p 8080:80 -v /$(pwd)/app:/var/www/html bbc_rmtask`
