# My Dashboard

A modern, responsive dashboard application built with Next.js, React, and Clerk for authentication.

## Features

- User authentication with Clerk
- Responsive design with mobile-friendly navigation
- Dark mode toggle
- Protected routes (Dashboard, Profile, Notifications)
- User context for global state management

## Tech Stack

- Next.js
- React
- Clerk for authentication
- Tailwind CSS for styling
- Lucide React for icons
- Shadcn for UI Library 

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your Clerk account and add your API keys to `.env.local`
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open ((http://localhost:3000/)) in your browser

## Project Structure

- `app/`: Next.js app directory
  - `layout.js`: Root layout with Navbar and providers
  - `context/`: Contains UserContext for global state
  - `components/`: Reusable React components
- `public/`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
