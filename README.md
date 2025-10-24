# Scouts Knowledge

A website project gathering knowledge and materials needed to acquire valuable scouting skills and specializations.

## Project Goal

To create a central, easily accessible place where scouts can find information, guides, and requirements for various areas of scouting craft.

## Technologies Used

*   [Next.js](https://nextjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [shadcn/ui](https://ui.shadcn.com/)
*   [PostgreSQL](https://www.postgresql.org/) - Database

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gabryssv/scouts-knowledge.git
   cd scouts-knowledge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` file with your database credentials:
   ```
   DATABASE_HOST=your_host
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=scouts_knowledge
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_HOST` | PostgreSQL server host | ✅ Yes |
| `DATABASE_USER` | Database username | ✅ Yes |
| `DATABASE_PASSWORD` | Database password | ✅ Yes |
| `DATABASE_NAME` | Database name | ✅ Yes |

**Note:** The application will not start if any required environment variables are missing. You'll get a clear error message indicating which variables need to be set.
