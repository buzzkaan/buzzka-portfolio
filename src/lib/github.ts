import { profile } from "@/data/resume-data";

const GITHUB_USER = profile.githubUsername;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

const graphqlHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

// ---------- Types ----------

export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// ---------- GraphQL API (contribution calendar) ----------

const CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime, $to: DateTime) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

interface FetchContributionsOptions {
  from?: string;
  to?: string;
}

export async function fetchContributions({
  from,
  to,
}: FetchContributionsOptions = {}): Promise<ContributionCalendar | null> {
  if (!GITHUB_TOKEN) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login: GITHUB_USER, from, to } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}

export const GITHUB_USERNAME = GITHUB_USER;
