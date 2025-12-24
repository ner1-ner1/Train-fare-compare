# Train Fare Comparison App (MVP)

A web application to calculate and compare fares for Shinkansen and Express trains, focusing on the **Tokaido Shinkansen** for the MVP.

## Features

- **Fare Calculation**: Calculates base fare (ticket) and express fees (reserved/unreserved).
- **Route Comparison**: Visually compares total costs of different routes/seat types.
- **Pure Calculation**: Logic is separated as pure functions for reliability.

## Tech Stack

- **Frontend**: Next.js, Recharts, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma, SQLite
- **Testing**: Vitest

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   ```bash
   npx prisma db push
   npm run seed
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Scope (MVP)

- **Route**: Tokaido Shinkansen (Tokyo - Shin-Osaka)
- **Ticket Types**: Base Fare, Shinkansen Express Fee (Reserved/Unreserved)
- **Exclusions**: Schedules, Timetables, Round-trip discounts, IC fares.
