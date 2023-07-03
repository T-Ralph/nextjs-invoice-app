# Invoice App

## Work Steps
- Day 1 -> Read and understood the requirements, researched online invoice apps, drew mockups: 1 hour
- Day 2 -> Developed the app: 3 hours
- Day 3 -> Additional cleanups, wrote documentation, and implemented hosting: 1 hour

## Tech Stack
- [NextJS](https://nextjs.org/) Framework based on [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/) CSS framework
- [NextJS API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) API endpoint
- LocalStorage for data persistence
- Hosted on [Vercel](https://vercel.com/)

## Architecture
- `components/` contains the reusable components
- `data/store.ts` contains the logic for parsing, storing, and retrieving data in `localStorage`
- `pages/` contains frontend routes and pages
- `pages/api` contains API/backend routes and endpoints
- `types/` contains TypeScript types

## Routes and API
- `/` page displays the lists of invoices
- `/invoice/create` page holds form to create an invoice
- `invoice/[id]` page displays an invoice
- [GET] `/api/invoices/` returns a JSON response of invoices
- [POST] `/api/invoice/create` [BODY] `Invoice` adds an invoice to the store

## Features
- Create a new invoice
- Add line items to the invoice
- Add notes to the invoice
- View invoices including status (paid, outstanding, and late)
- Add due date to an invoice
- View late invoices
- Polish and UX
- Highly reusable components
- Hosted on Vercel

## Limitations
- No unit tests
- No database (`LocalStorage` is used to mimmick a database but only stores data on the frontend, but, not on the backend API)
- API endpoints only mocks and mimmicks what a typical backend would do
- Can not send invoice emails due to limited free email services

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install, then, run the development server:

```bash
npm install
# then
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx` or `pages/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
