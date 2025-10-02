// GitHub API
export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    topics: string[];
    homepage?: string;
    created_at: string;
    updated_at: string;
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub repos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
};

// LeetCode API (using public endpoints)
export interface LeetCodeStats {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    contributionPoints: number;
    reputation: number;
}

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats | null> => {
    try {
        // Using a public LeetCode API endpoint
        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch LeetCode stats');
        }
        const data = await response.json();

        return {
            totalSolved: data.totalSolved || 0,
            totalQuestions: data.totalQuestions || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            ranking: data.ranking || 0,
            contributionPoints: data.contributionPoints || 0,
            reputation: data.reputation || 0,
        };
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        return null;
    }
};

// Analytics tracking
export const trackEvent = async (eventType: string, page: string) => {
    try {
        const { supabase } = await import('./supabase');
        await supabase.from('analytics').insert({
            event_type: eventType,
            page: page,
            user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
        });
    } catch (error) {
        console.error('Analytics tracking error:', error);
    }
};
