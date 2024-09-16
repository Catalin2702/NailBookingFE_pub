# ServiceBooking - Frontend

English | [Italiano](README_IT.md)

## Description

ServiceBooking is a front-end built using Vue 3. This project provides an interface for managing bookings for various types of services, allowing users to easily navigate through different services, make appointments, and manage their accounts. It is designed to be adaptable to different business needs, including beauty services, consultations, or other appointments.

## Features

- User authentication
- Role-based views (admin, staff, customer)
- Service browsing
- Booking management
- Real-time updates via WebSocket
- Mobile-friendly design

## Installation

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Catalin2702/ServiceBooking_FE.git
cd ServiceBooking_FE
```

Install the dependencies:

```bash
npm install
```

### Development

Run the following command to start the project:

```bash
npm run serve
```

### Production

Run the following command to build the project for production:

```bash
npm run build
```

### Linting

Lint and fix files:

```bash
npm run lint
```

### Configuration

The project uses environment variables to configure the WebSocket connection. Create a `.env` file in the root directory and add the following variables:

```bash
VUE_APP_API_PROTOCOL=http # or https for secure connections
VUE_APP_WS_PROTOCOL=ws # or wss for secure connections
VUE_APP_API_URL=localhost # or the IP address of the server
VUE_APP_API_PORT=8000 # or the port used by the backend
```

## Usage

Once the project is running, you can use the application to:

- Browse services
- Manage bookings
- Administer services and user roles (for admin users)

## License

This project is open source and available under the MIT License.

## Acknowledgements

This project was inspired by the need for a simple booking management system for various types of services. It was built to help some acquaintances manage their bookings more efficiently and is available for anyone to use and modify.

## Support

If you would like to contribute to the project, feel free to submit a pull request or report any issues through the [Issues](https://github.com/Catalin2702/ServiceBooking_FE/issues) section.
