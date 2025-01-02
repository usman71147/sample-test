This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

## Features Implemented
## 1. Dynamic Company Pages
Implemented dynamic routing for each company using the app/[company]/page.js route.
The company name is detected dynamically via params and used to render:
Company-specific orders.
A dynamically loaded company logo.
## 2. Dynamic Logo Integration
Logos for each company are stored in the public/logos/ directory.
Example structure:
arduino
Copy code
public/logos/
├── daraz.png
├── amazon.png
├── foodpanda.png
The logo URL is constructed dynamically based on the company name:
javascript
Copy code
const logoUrl = `../../../public/logos/${companyName}.png`;
If a logo is missing, the application gracefully handles the error and doesn't render the logo.
## 3. Orders Table
Data Source: Mock data for orders is stored in utils/sampleOrders.js.
Sorting: Users can click on table headers to sort columns (Order ID, Customer Name, Amount, Status) in ascending or descending order.
Pagination:
Displays 10 orders per page.
Includes "Previous" and "Next" buttons for navigation.
Buttons are disabled when at the first or last page.
## 4. UI Design
Designed using Tailwind CSS for a clean and responsive layout.
Table design includes:
Hover effects on rows.
Alternating borders for better readability.
Colored status text:
Delivered: Green.
Cancelled: Red.
Default: Gray.
Pagination controls are styled with hover and disabled states.
## 5. How the Task Was Accomplished
Dynamic Routing:

A dynamic route app/[company]/page.js was created.
The params object is used to extract the company name from the URL and render relevant data.
Orders Integration:

Orders are fetched dynamically from utils/sampleOrders.js.
Based on the company name, the relevant order data is displayed in the table.
Logo Integration:

Logos are stored in public/logos/ for easy access.
The path is dynamically constructed using:
javascript
Copy code
const logoUrl = `public/logos/${companyName}.png`;
Sorting and Pagination:

Sorting is implemented using a sortConfig state.
Pagination limits the displayed orders to 10 per page and handles navigation seamlessly.
Local Development:

Local subdomains (daraz.localhost:3000) were simulated using query parameters:
ruby
Copy code
http://localhost:3000/?company=daraz
This approach simplifies testing and avoids DNS configuration issues.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
