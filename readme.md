FreelancePilot



A comprehensive freelance management application designed for Swedish freelancers to manage time tracking, invoicing, and tax compliance.



🚀 Features



✅ Implemented Features











📊 Dashboard: Overview of business metrics, recent activities, and quick actions







⏱️ Time Tracking:











Manual time entry with customer association







Visual calendar with work indicators (🔴 under 8h, 🟢 8h+, 🏖️ weekends/holidays)







Swedish national holidays automatically marked







Monthly statistics and productivity tracking







👥 Customer Management:











Add, edit, and delete customers







Track hourly rates per customer







View customer statistics (time entries, invoices)







💰 Swedish Tax Calculator:











F-skatt compliant salary calculations







Municipality-specific tax rates







Employer contributions (31.42%)







Pension calculations with special payroll tax (24.26%)







Target net salary calculator







Required invoice amount calculator



🔧 Coming Soon











📄 Invoice Generation: PDF invoices with Swedish tax compliance







🏦 Business Account Management: Track income, expenses, and balance







📈 Reports \& Analytics: Detailed business insights







⚙️ Settings: Company configuration and preferences



🛠️ Tech Stack











Frontend: Next.js 14 with App Router, TypeScript, React







Styling: Tailwind CSS







Database: PostgreSQL with Prisma ORM







Date Handling: date-fns







Icons: Lucide React







PDF Generation: jsPDF (ready for implementation)



📦 Installation











Clone the repository:



git clone https://github.com/yourusername/freelance-pilot.git

cd freelance-pilot













Install dependencies:



npm install













Set up the database:

**Note**: You need PostgreSQL running. See the [Deployment to Vercel](#-deployment-to-vercel) section for setup options.

cp .env.example .env

# Edit .env and set your DATABASE_URL

npx prisma generate

npx prisma db push













Run the development server:



npm run dev













Open http://localhost:3000 in your browser



## 🚀 Deployment to Vercel

This application uses PostgreSQL and is ready to be deployed on Vercel.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mericstam/freelance-pilot)

### Prerequisites

**Database Setup**: This application requires a PostgreSQL database. We recommend using Vercel Postgres for seamless integration.

**Recommended Database Options**:
- **Vercel Postgres** (easiest for Vercel): https://vercel.com/docs/storage/vercel-postgres
- **Supabase** (free tier available): https://supabase.com
- **Neon** (serverless PostgreSQL): https://neon.tech
- **Railway** (easy setup): https://railway.app

### Deployment Steps

1. **Set up Vercel Postgres** (recommended):
   - Go to your Vercel project dashboard
   - Navigate to the "Storage" tab
   - Click "Create Database" and select "Postgres"
   - Vercel will automatically set the `DATABASE_URL` environment variable

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI if needed
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Run Database Migrations**:
   After first deployment:
   ```bash
   # Pull environment variables from Vercel
   vercel env pull .env.local
   
   # Push database schema
   npx prisma db push
   ```

### Environment Variables

The application requires the following environment variable:
- `DATABASE_URL`: PostgreSQL connection string (automatically set by Vercel Postgres)

For local development with PostgreSQL:
```bash
cp .env.example .env
# Edit .env and set your local PostgreSQL connection string
```

### Local Development with PostgreSQL

1. Install PostgreSQL locally or use Docker:
   ```bash
   docker run --name freelance-pilot-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL in .env
   ```

3. Run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

🗂️ Project Structure



freelance-pilot/

├── app/                    # Next.js app directory

│   ├── api/               # API routes

│   ├── components/        # React components

│   ├── lib/              # Utilities and helpers

│   ├── \[pages]/          # Route pages

│   └── layout.tsx        # Root layout

├── prisma/

│   └── schema.prisma     # Database schema

└── public/               # Static assets





🇸🇪 Swedish Tax Compliance



The application includes comprehensive Swedish tax calculations:











Municipality Tax Rates: All major Swedish municipalities







Employer Contributions: 31.42% arbetsgivaravgift







Pension Tax: 24.26% särskild löneskatt







State Income Tax: 20% on income above 598,500 SEK/year







Basic Deduction: Grundavdrag calculations







F-skatt: Designed for freelancers with F-skatt status



🎯 Key Features in Detail



Time Tracking











Visual calendar with daily hour indicators







Automatic detection of Swedish holidays







Workday vs. weekend differentiation







Monthly statistics and averages



Tax Calculator











Gross to net salary conversion







Target net salary to required invoice amount







Municipality-specific calculations







Comprehensive breakdown of all taxes and fees



Customer Management











Store customer details and hourly rates







Track time entries per customer







Generate invoices based on tracked time



🔐 Database Schema



The application uses SQLite with the following main models:











Customer: Client information and hourly rates







TimeEntry: Tracked working hours







Invoice: Generated invoices







Account: Business account tracking







Transaction: Financial transactions







SalaryPayout: Salary payment records







Holiday: Swedish national holidays







Settings: Application configuration



📝 License



MIT License



👨‍💻 Contributing



Contributions are welcome! Please feel free to submit a Pull Request.



🐛 Known Issues











Invoice PDF generation is not yet implemented







Business account management needs completion







Reports and analytics are placeholder pages



📧 Contact



For questions or support, please open an issue in the GitHub repository.







Built with ❤️ for Swedish freelancers

