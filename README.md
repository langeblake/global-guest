# Global Guest 🌍

Welcome to Global Guest, a contemporary hospitatlity site inspired by Airbnb. Dive deep into a world where hospitality meets simplicity, and find the perfect space or share your own, no matter where you are.

[Visit Global Guest here!](https://global-guest.vercel.app/)

## Features 🛠

- **User Authentication**:
  - Register and sign in using your email.
  - Quick access using Google or Github for authentication.

- **Make Reservations & Trips**:
  - Search available listings to find the perfect spot.
  - Reserve with confidence with our intuitive booking system.
  - Keep track of all your upcoming and past trips.

- **Favorites**:
  - Keep an eye on listings you love.
  - Add or remove listings from your favorites with just one click.

- **Be a Host**:
  - Share your space with travelers from around the world.
  - Create, manage, and optimize your listings for the best guest experience.

## Tech Stack 🖥️
  - React
  - Next.js
  - MongoDB
  - Tailwind CSS

## Challenges & Solutions 🚀

- **Listing Creation with Mapping and Location Selection**:
  - Challenge: Implementing a listing creation feature with mapping and location selection can be complex due to the integration of maps and ensuring accurate geolocation.
  - Solution: Leveraged the Leaflet and World-Countries libraries, facilitating the integration of interactive maps. This enables users to visually select locations and countries for search filters and listing creation.

- **Calendar Components with react-date-range**:
  - Challenge: Integrating calendar components for booking dates can be challenging, especially to ensure a user-friendly interface and handling date range selections.
  - Solution: Utilized the react-date-range library to implement intuitive and responsive date range pickers. Configured the components to manage date selection and validate booking availability based on stored data.

- **Setting up MongoDB with Prisma to Store Listings and Booked Trips**:
  - Challenge: Setting up MongoDB with Prisma to store listings and booked trips requires configuring database schemas, managing data relationships, and implementing CRUD operations.
  - Solution: Leveraged Prisma's ORM capabilities to define database models and relationships. Utilized MongoDB as the data store for listings and booked trips, enabling efficient data storage and retrieval. Implemented Prisma Client to interact with the database, enabling seamless integration with the Next.js application.


---

Happy hosting and traveling with Global Guest! 🏡✈️
