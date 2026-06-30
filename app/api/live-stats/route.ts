import { NextResponse } from "next/server"

export const revalidate = 300 // Cache for 5 minutes

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (clientId && clientSecret && refreshToken) {
    try {
      const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken
        }),
        cache: "no-store"
      })

      if (res.ok) {
        const data = await res.json()
        if (data.access_token) {
          return data.access_token
        }
      }
    } catch (e) {
      console.error("Failed to refresh Spotify access token:", e)
    }
  }

  return process.env.SPOTIFY_ACCESS_TOKEN
}

export async function GET() {
  const githubUser = "Neel7780"
  const cfUser = "neel212006"
  const leetcodeUser = "aZ80rLixoz"

  // Parallel execution of all API fetches to optimize response times
  const [githubData, cfData, leetcodeData, spotifyData] = await Promise.allSettled([
    // 1. Fetch GitHub Profile & Repositories
    (async () => {
      const profileRes = await fetch(`https://api.github.com/users/${githubUser}`, {
        headers: { "User-Agent": "NeelPortfolio" },
        next: { revalidate: 300 }
      })
      if (!profileRes.ok) throw new Error("GitHub profile fetch failed")
      const profile = await profileRes.json()

      const reposRes = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, {
        headers: { "User-Agent": "NeelPortfolio" },
        next: { revalidate: 300 }
      })
      let stars = 0
      if (reposRes.ok) {
        const repos = await reposRes.json()
        if (Array.isArray(repos)) {
          stars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
        }
      }

      return {
        repos: profile.public_repos || 24,
        stars: stars || 0,
        followers: profile.followers || 12,
        commits: 1420 + (profile.public_repos * 6) // Dynamic estimate based on repos
      }
    })(),

    // 2. Fetch Codeforces Rating & Solved Count
    (async () => {
      const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${cfUser}`, {
        next: { revalidate: 300 }
      })
      if (!infoRes.ok) throw new Error("Codeforces info fetch failed")
      const infoData = await infoRes.json()
      if (infoData.status !== "OK" || !infoData.result?.[0]) throw new Error("Codeforces user not found")
      
      const user = infoData.result[0]

      // Fetch status/submissions to count unique solved problems
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${cfUser}`, {
        next: { revalidate: 300 }
      })
      let solvedCount = 0
      if (statusRes.ok) {
        const statusData = await statusRes.json()
        if (statusData.status === "OK" && Array.isArray(statusData.result)) {
          const solvedSet = new Set()
          statusData.result.forEach((sub: any) => {
            if (sub.verdict === "OK" && sub.problem) {
              solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`)
            }
          });
          solvedCount = solvedSet.size
        }
      }

      return {
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || "newbie",
        solved: solvedCount || 0
      }
    })(),

    // 3. Fetch LeetCode Problems Solved & Rank
    (async () => {
      try {
        const proxyRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUser}`, {
          next: { revalidate: 300 }
        })
        if (proxyRes.ok) {
          const lcData = await proxyRes.json()
          return {
            solved: lcData.totalSolved || 0,
            easy: lcData.easySolved || 0,
            medium: lcData.mediumSolved || 0,
            hard: lcData.hardSolved || 0,
            ranking: lcData.ranking || 0
          }
        }
      } catch (e) {
        console.warn("LeetCode proxy failed, attempting direct GraphQL...")
      }

      // Direct GraphQL Fallback
      const query = `
        query userProblemsSolved($username: String!) {
          allQuestionsCount { difficulty count }
          matchedUser(username: $username) {
            submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
            profile { ranking }
          }
        }
      `
      const gqlRes = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: JSON.stringify({ query, variables: { username: leetcodeUser } }),
        next: { revalidate: 300 }
      })
      if (!gqlRes.ok) throw new Error("LeetCode GraphQL fetch failed")
      const gqlData = await gqlRes.json()
      if (!gqlData.data?.matchedUser) throw new Error("LeetCode user not found")

      const user = gqlData.data.matchedUser
      const subs = user.submitStatsGlobal.acSubmissionNum
      
      return {
        solved: subs.find((s: any) => s.difficulty === "All")?.count || 0,
        easy: subs.find((s: any) => s.difficulty === "Easy")?.count || 0,
        medium: subs.find((s: any) => s.difficulty === "Medium")?.count || 0,
        hard: subs.find((s: any) => s.difficulty === "Hard")?.count || 0,
        ranking: user.profile?.ranking || 0
      }
    })(),

    // 4. Fetch Spotify Real-Time Top Tracks & Top Artists
    (async () => {
      const spotifyToken = await getSpotifyAccessToken()
      if (!spotifyToken) throw new Error("No Spotify token configured")

      const [tracksRes, artistsRes] = await Promise.all([
        fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5", {
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          },
          next: { revalidate: 300 }
        }),
        fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5", {
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          },
          next: { revalidate: 300 }
        })
      ])

      let tracks = null
      if (tracksRes.ok) {
        const data = await tracksRes.json()
        if (data.items && Array.isArray(data.items)) {
          tracks = data.items.map((item: any, idx: number) => ({
            rank: idx + 1,
            name: item.name,
            artist: item.artists.map((a: any) => a.name).join(", "),
            album: item.album.name,
            poster: item.album.images[0]?.url || "/spotify_album_art.jpg",
            progress: 100 - idx * 12,
            playUrl: item.external_urls?.spotify || "https://open.spotify.com"
          }))
        }
      }

      let artists = null
      if (artistsRes.ok) {
        const data = await artistsRes.json()
        if (data.items && Array.isArray(data.items)) {
          artists = data.items.map((item: any, idx: number) => ({
            rank: idx + 1,
            name: item.name,
            genres: item.genres?.slice(0, 2).join(" / ") || "Artist",
            popularity: `${item.popularity}% Popularity`,
            progress: item.popularity || (100 - idx * 12),
            poster: item.images[0]?.url || "/spotify_album_art.jpg",
            playUrl: item.external_urls?.spotify || "https://open.spotify.com"
          }))
        }
      }

      return { tracks, artists }
    })()
  ])

  // Aggregate results and provide robust fallback defaults in case any network requests fail
  const response = {
    github: githubData.status === "fulfilled" ? githubData.value : {
      repos: 24,
      stars: 5,
      followers: 12,
      commits: 1420
    },
    codeforces: cfData.status === "fulfilled" ? cfData.value : {
      rating: 971,
      maxRating: 1049,
      rank: "newbie",
      solved: 32
    },
    leetcode: leetcodeData.status === "fulfilled" ? leetcodeData.value : {
      solved: 250,
      easy: 120,
      medium: 100,
      hard: 30,
      ranking: 142000
    },
    spotify: spotifyData.status === "fulfilled" ? spotifyData.value : { tracks: null, artists: null }
  }

  return NextResponse.json(response)
}
