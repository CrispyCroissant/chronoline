# Chronoline

A multiplayer game of chronological events. Inspired by the board game [Timeline](https://boardgamegeek.com/boardgame/128664/timeline).

## Getting Started

### Dependencies

- [Node v.16 or higher](https://nodejs.org/en/)

### Installing

- Clone the repo.

- Install the npm packages in both folders.

- Set the environment variables listed below.

#### Frontend environment variables

| **Key**               | **Description**              |
| --------------------- | ---------------------------- |
| `VUE_APP_URL`         | The URL used by the frontend |
| `VUE_APP_BACKEND_URL` | The URL used by the backend  |

#### Backend environment variables

| **Key**        | **Description**                                         |
| -------------- | ------------------------------------------------------- |
| `NODE_ENV`     | Either _production_ or _dev_                            |
| `PORT`         | the port the server listens to for connections          |
| `FRONTEND_URL` | the URL used by the frontend                            |
| `DEBUG`        | used to enable debug printing (set to _backend:server_) |

### Usage

The game is separated into a backend and frontend. There's two different set of commands for them.

- **Frontend**

  - Starting the development server

    `npm run serve`

  - Building the project files for production

    `npm run build`

  - Running unit tests

    `npm run test:unit`

  - Running the linter

    `npm run lint`

- **Backend**

  - Starting the development server

    `npm run dev`

  - Running unit tests

    `npm run test`

  - _Starting the production server_

    `npm run start`

## Authors

[@CrispyCroissant](https://github.com/crispycroissant)

## Version History

- **v0.1.0**
  - Initial release
  - [Full changelog](https://github.com/CrispyCroissant/chronoline/milestone/1?closed=1)

## License

License not yet chosen.

## Acknowledgments

To be provided...
