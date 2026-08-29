/**
 * 5-Star Placement Mastery & Profile Intelligence Platform
 * Multi-Platform Profile Aggregator (LeetCode, Codeforces, CodeChef, HackerRank, GitHub, HackTheBox)
 * Time-Horizon Performance Analytics (Daily, Weekly, Monthly, 365-Day Heatmap)
 * Senior Staff SDE Architecture with REST Cloud Backend & IndexedDB
 */

// Global State
let appState = {
    cloudSyncKey: '',
    completed: {},
    bookmarks: {},
    revisions: {},
    notes: {},
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    theme: 'dark',
    activeDomainId: 'dsa',
    activeFilter: 'all',
    searchQuery: '',
    currentMainView: 'curriculum', // 'curriculum' | 'analytics'
    currentTimeframe: 'daily',     // 'daily' | 'weekly' | 'monthly' | 'yearly'
    activityLog: {},               // { 'YYYY-MM-DD': count }
    profiles: {
        leetcode: { handle: 'chandanmanne_06', name: '', avatar: '', solved: 0, easy: 0, medium: 0, hard: 0, ranking: 0, acceptance: 0 },
        codeforces: { handle: '', name: '', avatar: '', rating: 0, maxRating: 0, rank: 'Unrated' },
        codechef: { handle: '', stars: 0, rating: 0 },
        hackerrank: { handle: '', badges: 0 },
        github: { handle: 'LAXMICHANDRA-MANNE', name: '', avatar: '', repos: 0 },
        tryhackme: { handle: '', rank: 'Novice' }
    },
    githubToken: '',
    githubGistId: '',
    lastCloudSync: null
};

let currentModalSubtopicId = null;
let allSubtopicIdList = [];
let cloudSyncDebounceTimer = null;

// Domain Icons
const DOMAIN_ICONS = {
    'dsa': 'fa-brain',
    'dbms': 'fa-database',
    'os': 'fa-microchip',
    'networks': 'fa-network-wired',
    'aiml': 'fa-robot',
    'programming': 'fa-code',
    'cloud': 'fa-cloud',
    'security': 'fa-shield-halved',
    'web3': 'fa-link',
    'datascience': 'fa-chart-pie',
    'backend': 'fa-server'
};

// Handle & URL Cleaner
function cleanHandle(input) {
    if (!input) return '';
    let clean = input.trim();
    clean = clean.replace(/\/+$/, '');
    
    if (clean.includes('/')) {
        const parts = clean.split('/').filter(p => p && p !== 'u' && p !== 'profile' && p !== 'users' && p !== 'p');
        clean = parts[parts.length - 1];
    }
    clean = clean.split('?')[0].split('#')[0];
    return clean.trim();
}

// ==========================================
// 🚀 APP STARTUP & MULTI-TIER HYDRATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    buildSubtopicIndex();
    await initializeMultiTierStorage();
    setupTheme();
    updateStreak();
    renderDomainTabs();
    renderCurriculum();
    updateGlobalMetrics();
    renderProfileCardsFromState();
    renderAnalyticsDashboard();
    requestPersistentStorage();
    setupKeyboardShortcuts();
    updateSyncUIFields();
    updateCloudHUDText();

    // Auto-sync active profiles on startup (LeetCode & GitHub)
    if (appState.profiles.leetcode.handle || appState.profiles.github.handle) {
        setTimeout(() => {
            syncAllConnectedProfiles(true);
        }, 300);
    }
});

// View Navigation Switcher
function switchMainView(viewName) {
    appState.currentMainView = viewName;
    const curriculumSec = document.getElementById('view-section-curriculum');
    const analyticsSec = document.getElementById('view-section-analytics');
    const tabCurriculum = document.getElementById('view-tab-curriculum');
    const tabAnalytics = document.getElementById('view-tab-analytics');

    if (viewName === 'curriculum') {
        curriculumSec.classList.remove('hidden');
        analyticsSec.classList.add('hidden');

        tabCurriculum.className = 'px-3.5 py-1.5 rounded-lg bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm transition-all flex items-center space-x-1.5';
        tabAnalytics.className = 'px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center space-x-1.5';
    } else {
        curriculumSec.classList.add('hidden');
        analyticsSec.classList.remove('hidden');

        tabAnalytics.className = 'px-3.5 py-1.5 rounded-lg bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-sm transition-all flex items-center space-x-1.5';
        tabCurriculum.className = 'px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center space-x-1.5';

        renderProfileCardsFromState();
        renderAnalyticsDashboard();
    }
}

// ====================================================
// 📊 CODING & HACKING PROFILE INTELLIGENCE (LIVE APIs)
// ====================================================
function saveProfileHandle(platform, rawValue) {
    const value = cleanHandle(rawValue);
    if (!appState.profiles[platform]) appState.profiles[platform] = {};
    appState.profiles[platform].handle = value;
    saveState();

    if (platform === 'codechef') {
        const btn = document.getElementById('cc-link-btn');
        if (btn) btn.href = `https://www.codechef.com/users/${value}`;
    }
    if (platform === 'hackerrank') {
        const btn = document.getElementById('hr-link-btn');
        if (btn) btn.href = `https://www.hackerrank.com/${value}`;
    }
    if (platform === 'tryhackme') {
        const btn = document.getElementById('thm-link-btn');
        if (btn) btn.href = `https://tryhackme.com/p/${value}`;
    }
}

// 🟡 LeetCode Live Sync (Multi-Provider Resilient Fetch)
async function fetchLeetCodeProfile(silent = false) {
    let inputEl = document.getElementById('profile-input-leetcode');
    let rawHandle = inputEl && inputEl.value ? inputEl.value : (appState.profiles.leetcode.handle || 'chandanmanne_06');
    let handle = cleanHandle(rawHandle);

    if (!handle) {
        if (!silent) showToast("Please enter a LeetCode username or profile URL.", "error");
        return;
    }

    if (inputEl) inputEl.value = handle;
    appState.profiles.leetcode.handle = handle;

    const statusEl = document.getElementById('lc-status');
    if (statusEl) statusEl.textContent = 'Syncing...';

    let success = false;

    // Strategy 1: Alfa LeetCode API (Render)
    try {
        const [solvedRes, profileRes] = await Promise.allSettled([
            fetch(`https://alfa-leetcode-api.onrender.com/${handle}/solved`),
            fetch(`https://alfa-leetcode-api.onrender.com/${handle}`)
        ]);

        let solvedData = solvedRes.status === 'fulfilled' && solvedRes.value.ok ? await solvedRes.value.json() : null;
        let profileData = profileRes.status === 'fulfilled' && profileRes.value.ok ? await profileRes.value.json() : null;

        if (solvedData && (solvedData.solvedProblem !== undefined || solvedData.totalSolved !== undefined)) {
            appState.profiles.leetcode = {
                handle,
                name: profileData?.name || handle,
                avatar: profileData?.avatar || '',
                school: profileData?.school || '',
                solved: solvedData.solvedProblem ?? solvedData.totalSolved ?? 0,
                easy: solvedData.easySolved || 0,
                medium: solvedData.mediumSolved || 0,
                hard: solvedData.hardSolved || 0,
                ranking: profileData?.ranking || 0,
                acceptance: 0
            };
            success = true;
        }
    } catch (e) {
        console.warn("Alfa API error, trying backup proxy...", e);
    }

    // Strategy 2: Backup LeetCode Proxy
    if (!success) {
        try {
            const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
            if (res.ok) {
                const data = await res.json();
                if (data.status === 'success' || data.totalSolved !== undefined) {
                    appState.profiles.leetcode = {
                        handle,
                        name: handle,
                        avatar: '',
                        school: '',
                        solved: data.totalSolved || 0,
                        easy: data.easySolved || 0,
                        medium: data.mediumSolved || 0,
                        hard: data.hardSolved || 0,
                        ranking: data.ranking || 0,
                        acceptance: data.acceptanceRate || 0
                    };
                    success = true;
                }
            }
        } catch (e) {
            console.warn("Backup proxy error:", e);
        }
    }

    if (success) {
        saveState();
        renderProfileCardsFromState();
        renderAnalyticsDashboard();
        if (!silent) showToast(`LeetCode synced: ${appState.profiles.leetcode.solved} Problems Solved! 🟡`, "success");
    } else {
        if (statusEl) statusEl.textContent = 'Sync failed';
        if (!silent) showToast("Could not fetch LeetCode profile. Check username.", "error");
    }
}

// 🔵 Codeforces Live Sync
async function fetchCodeforcesProfile(silent = false) {
    let inputEl = document.getElementById('profile-input-codeforces');
    let rawHandle = inputEl && inputEl.value ? inputEl.value : (appState.profiles.codeforces.handle || '');
    let handle = cleanHandle(rawHandle);

    if (!handle) {
        if (!silent) showToast("Please enter a Codeforces handle.", "error");
        return;
    }

    if (inputEl) inputEl.value = handle;
    appState.profiles.codeforces.handle = handle;

    const statusEl = document.getElementById('cf-status');
    if (statusEl) statusEl.textContent = 'Syncing...';

    try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await res.json();

        if (data.status === 'OK' && data.result.length > 0) {
            const user = data.result[0];
            appState.profiles.codeforces = {
                handle,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || handle,
                avatar: user.titlePhoto || user.avatar || '',
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || 'Unrated'
            };
            saveState();
            renderProfileCardsFromState();
            renderAnalyticsDashboard();
            if (!silent) showToast(`Codeforces synced: ${user.rating || 'Unrated'} (${user.rank || ''})! 🔵`, "success");
        } else {
            throw new Error("User not found");
        }
    } catch (e) {
        console.warn("Codeforces fetch error:", e);
        if (statusEl) statusEl.textContent = 'Sync failed';
        if (!silent) showToast("Could not fetch Codeforces profile.", "error");
    }
}

// 🐙 GitHub Live Sync
async function fetchGitHubProfile(silent = false) {
    let inputEl = document.getElementById('profile-input-github');
    let rawHandle = inputEl && inputEl.value ? inputEl.value : (appState.profiles.github.handle || 'LAXMICHANDRA-MANNE');
    let handle = cleanHandle(rawHandle);

    if (!handle) {
        if (!silent) showToast("Please enter a GitHub username.", "error");
        return;
    }

    if (inputEl) inputEl.value = handle;
    appState.profiles.github.handle = handle;

    const statusEl = document.getElementById('gh-status');
    if (statusEl) statusEl.textContent = 'Syncing...';

    try {
        const res = await fetch(`https://api.github.com/users/${handle}`);
        if (!res.ok) throw new Error("GitHub User Error");

        const data = await res.json();
        appState.profiles.github = {
            handle,
            name: data.name || handle,
            avatar: data.avatar_url || '',
            repos: data.public_repos || 0
        };
        saveState();
        renderProfileCardsFromState();
        if (!silent) showToast(`GitHub synced: ${data.public_repos} Repos! 🐙`, "success");
    } catch (e) {
        console.warn("GitHub fetch error:", e);
        if (statusEl) statusEl.textContent = 'Sync failed';
        if (!silent) showToast("Could not fetch GitHub profile.", "error");
    }
}

async function syncAllConnectedProfiles(silent = false) {
    const icon = document.getElementById('profile-sync-icon');
    if (icon) icon.className = 'fas fa-rotate animate-spin';

    const promises = [];
    if (appState.profiles.leetcode.handle) promises.push(fetchLeetCodeProfile(silent));
    if (appState.profiles.codeforces.handle) promises.push(fetchCodeforcesProfile(silent));
    if (appState.profiles.github.handle) promises.push(fetchGitHubProfile(silent));

    await Promise.allSettled(promises);

    if (icon) icon.className = 'fas fa-rotate';
    if (!silent) showToast("All coding profiles synchronized! 🚀", "success");
}

function renderProfileCardsFromState() {
    // LeetCode
    const lc = appState.profiles.leetcode;
    const lcInput = document.getElementById('profile-input-leetcode');
    if (lcInput && lc.handle) lcInput.value = lc.handle;

    const lcLink = document.getElementById('lc-profile-link');
    if (lcLink && lc.handle) lcLink.href = `https://leetcode.com/u/${lc.handle}/`;

    if (lc.solved > 0 || lc.name) {
        const box = document.getElementById('lc-stats-box');
        const status = document.getElementById('lc-status');
        const rankBadge = document.getElementById('lc-rank-badge');
        const avatarImg = document.getElementById('lc-avatar-img');
        const fullNameEl = document.getElementById('lc-full-name');
        const rankingEl = document.getElementById('lc-ranking');

        if (box) box.classList.remove('hidden');
        if (status) status.textContent = `@${lc.handle}`;
        if (fullNameEl) fullNameEl.textContent = lc.name || lc.handle;
        if (rankingEl) rankingEl.textContent = lc.ranking ? `Rank #${lc.ranking.toLocaleString()}` : '';
        if (avatarImg && lc.avatar) avatarImg.src = lc.avatar;

        if (rankBadge) {
            rankBadge.textContent = `${lc.solved} Solved`;
            rankBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
        }

        const easyEl = document.getElementById('lc-easy-count');
        const medEl = document.getElementById('lc-med-count');
        const hardEl = document.getElementById('lc-hard-count');
        if (easyEl) easyEl.textContent = lc.easy || 0;
        if (medEl) medEl.textContent = lc.medium || 0;
        if (hardEl) hardEl.textContent = lc.hard || 0;
    }

    // Codeforces
    const cf = appState.profiles.codeforces;
    const cfInput = document.getElementById('profile-input-codeforces');
    if (cfInput && cf.handle) cfInput.value = cf.handle;

    const cfLink = document.getElementById('cf-profile-link');
    if (cfLink && cf.handle) cfLink.href = `https://codeforces.com/profile/${cf.handle}`;

    if (cf.rating > 0 || cf.rank !== 'Unrated') {
        const box = document.getElementById('cf-stats-box');
        const status = document.getElementById('cf-status');
        const rankBadge = document.getElementById('cf-rank-badge');
        const avatarImg = document.getElementById('cf-avatar-img');

        if (box) box.classList.remove('hidden');
        if (status) status.textContent = `@${cf.handle}`;
        if (avatarImg && cf.avatar) avatarImg.src = cf.avatar;
        if (rankBadge) {
            rankBadge.textContent = cf.rank.toUpperCase();
            rankBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
        }
        document.getElementById('cf-rating').textContent = cf.rating;
        document.getElementById('cf-max-rating').textContent = cf.maxRating;
        document.getElementById('cf-rank-title').textContent = cf.rank;
    }

    // GitHub
    const gh = appState.profiles.github;
    const ghInput = document.getElementById('profile-input-github');
    if (ghInput && gh.handle) ghInput.value = gh.handle;

    const ghLink = document.getElementById('gh-profile-link');
    if (ghLink && gh.handle) ghLink.href = `https://github.com/${gh.handle}`;

    if (gh.repos > 0 || gh.name) {
        const badge = document.getElementById('gh-repos-badge');
        const status = document.getElementById('gh-status');
        const avatarImg = document.getElementById('gh-avatar-img');

        if (badge) badge.textContent = `${gh.repos} Repos`;
        if (status) status.textContent = `@${gh.handle}`;
        if (avatarImg && gh.avatar) avatarImg.src = gh.avatar;
    }

    // CodeChef & HackerRank & TryHackMe inputs
    const ccInput = document.getElementById('profile-input-codechef');
    if (ccInput && appState.profiles.codechef.handle) {
        ccInput.value = appState.profiles.codechef.handle;
        const btn = document.getElementById('cc-link-btn');
        if (btn) btn.href = `https://www.codechef.com/users/${appState.profiles.codechef.handle}`;
    }

    const hrInput = document.getElementById('profile-input-hackerrank');
    if (hrInput && appState.profiles.hackerrank.handle) {
        hrInput.value = appState.profiles.hackerrank.handle;
        const btn = document.getElementById('hr-link-btn');
        if (btn) btn.href = `https://www.hackerrank.com/${appState.profiles.hackerrank.handle}`;
    }

    const thmInput = document.getElementById('profile-input-tryhackme');
    if (thmInput && appState.profiles.tryhackme.handle) {
        thmInput.value = appState.profiles.tryhackme.handle;
        const btn = document.getElementById('thm-link-btn');
        if (btn) btn.href = `https://tryhackme.com/p/${appState.profiles.tryhackme.handle}`;
    }
}

// ====================================================
// 📈 MULTI-TIMEFRAME ANALYTICS (DAILY/WEEKLY/MONTHLY/YEARLY)
// ====================================================
function setTimeframeView(timeframe) {
    appState.currentTimeframe = timeframe;
    
    document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.className = 'tf-btn px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all';
    });
    const activeBtn = document.getElementById(`tf-btn-${timeframe}`);
    if (activeBtn) {
        activeBtn.className = 'tf-btn px-3 py-1.5 rounded-lg bg-white dark:bg-dark-800 text-slate-900 dark:text-white shadow-sm transition-all';
    }

    document.getElementById('analytics-section-daily').classList.toggle('hidden', timeframe !== 'daily');
    document.getElementById('analytics-section-weekly').classList.toggle('hidden', timeframe !== 'weekly');
    document.getElementById('analytics-section-monthly').classList.toggle('hidden', timeframe !== 'monthly');
    document.getElementById('analytics-section-yearly').classList.toggle('hidden', timeframe !== 'yearly');

    renderAnalyticsDashboard();
}

function renderAnalyticsDashboard() {
    calculatePlacementReadiness();
    renderDailyAnalytics();
    renderWeeklyVelocityChart();
    renderMonthlyTrajectory();
    renderYearlyHeatmap();
}

function calculatePlacementReadiness() {
    let dsaTotal = 0, dsaDone = 0;
    let coreTotal = 0, coreDone = 0;
    let sysTotal = 0, sysDone = 0;
    let totalCurriculumSolved = 0;

    curriculumData.domains.forEach(domain => {
        domain.levels.forEach(lvl => {
            lvl.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    const isCompleted = !!appState.completed[s.id];
                    if (isCompleted) totalCurriculumSolved++;

                    if (domain.id === 'dsa') {
                        dsaTotal++;
                        if (isCompleted) dsaDone++;
                    } else if (['dbms', 'os', 'networks'].includes(domain.id)) {
                        coreTotal++;
                        if (isCompleted) coreDone++;
                    } else {
                        sysTotal++;
                        if (isCompleted) sysDone++;
                    }
                });
            });
        });
    });

    const dsaPct = dsaTotal === 0 ? 0 : Math.round((dsaDone / dsaTotal) * 100);
    const corePct = coreTotal === 0 ? 0 : Math.round((coreDone / coreTotal) * 100);
    const sysPct = sysTotal === 0 ? 0 : Math.round((sysDone / sysTotal) * 100);

    const dsaEl = document.getElementById('score-dsa-pct');
    const coreEl = document.getElementById('score-core-pct');
    const sysEl = document.getElementById('score-sys-pct');
    if (dsaEl) dsaEl.textContent = `${dsaPct}%`;
    if (coreEl) coreEl.textContent = `${corePct}%`;
    if (sysEl) sysEl.textContent = `${sysPct}%`;

    const lcSolved = appState.profiles.leetcode.solved || 0;
    const cfRating = appState.profiles.codeforces.rating || 0;
    const profileBonus = Math.min(30, Math.round((lcSolved / 3) + (cfRating / 100)));

    const readinessScore = Math.min(100, Math.round((dsaPct * 0.35) + (corePct * 0.25) + (sysPct * 0.20) + profileBonus));
    const scoreEl = document.getElementById('readiness-score');
    if (scoreEl) scoreEl.textContent = readinessScore;

    const tierBadge = document.getElementById('readiness-tier-badge');
    if (tierBadge) {
        if (readinessScore >= 80) tierBadge.textContent = "🏆 Staff / Principal Track";
        else if (readinessScore >= 60) tierBadge.textContent = "🎯 FAANG Ready Track";
        else if (readinessScore >= 35) tierBadge.textContent = "🚀 SDE Product Track";
        else tierBadge.textContent = "🌱 Foundation Builder";
    }

    const aggregateSolved = totalCurriculumSolved + lcSolved;
    const aggCountEl = document.getElementById('total-aggregate-solved-count');
    if (aggCountEl) aggCountEl.textContent = aggregateSolved;

    const easySolved = Math.round(totalCurriculumSolved * 0.35) + (appState.profiles.leetcode.easy || 0);
    const medSolved = Math.round(totalCurriculumSolved * 0.45) + (appState.profiles.leetcode.medium || 0);
    const hardSolved = Math.round(totalCurriculumSolved * 0.20) + (appState.profiles.leetcode.hard || 0);

    const easyStatEl = document.getElementById('stat-easy-solved');
    const medStatEl = document.getElementById('stat-med-solved');
    const hardStatEl = document.getElementById('stat-hard-solved');
    if (easyStatEl) easyStatEl.textContent = easySolved;
    if (medStatEl) medStatEl.textContent = medSolved;
    if (hardStatEl) hardStatEl.textContent = hardSolved;

    const streakValEl = document.getElementById('analytics-streak-val');
    if (streakValEl) streakValEl.textContent = `${appState.streak || 1} Day${appState.streak > 1 ? 's' : ''}`;
}

// 1. Daily View
function renderDailyAnalytics() {
    const today = new Date().toISOString().split('T')[0];
    const todayCount = appState.activityLog[today] || 0;

    const solvedEl = document.getElementById('daily-solved-count');
    if (solvedEl) solvedEl.textContent = `${todayCount} / 5 Topics`;

    const progBar = document.getElementById('daily-progress-bar');
    if (progBar) {
        const pct = Math.min(100, Math.round((todayCount / 5) * 100));
        progBar.style.width = `${pct}%`;
    }

    const breakdownEl = document.getElementById('daily-domains-breakdown');
    if (breakdownEl) {
        if (todayCount > 0) {
            breakdownEl.innerHTML = `
                <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <i class="fas fa-check-circle"></i>
                    <span>${todayCount} subtopics mastered today! Great momentum!</span>
                </div>
            `;
        } else {
            breakdownEl.innerHTML = `<p class="text-slate-500">No problems solved yet today. Open the Syllabus view to practice!</p>`;
        }
    }
}

// 2. Weekly View (7-Day Bar Chart)
function renderWeeklyVelocityChart() {
    const chartContainer = document.getElementById('weekly-bar-chart');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const currentDayIndex = (now.getDay() + 6) % 7;

    days.forEach((dayName, idx) => {
        const dateObj = new Date();
        dateObj.setDate(now.getDate() - (currentDayIndex - idx));
        const dateStr = dateObj.toISOString().split('T')[0];
        const count = appState.activityLog[dateStr] || 0;
        const heightPct = Math.min(100, Math.max(12, count * 20));

        const col = document.createElement('div');
        col.className = 'flex flex-col items-center space-y-1 h-full justify-end group';
        col.innerHTML = `
            <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">${count}</span>
            <div class="w-full rounded-t-lg bg-gradient-to-t ${count > 0 ? 'from-emerald-600 to-teal-400' : 'from-slate-200 to-slate-300 dark:from-dark-800 dark:to-dark-700'} transition-all duration-500 shadow-sm" style="height: ${heightPct}%"></div>
            <span class="text-[10px] font-bold ${idx === currentDayIndex ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}">${dayName}</span>
        `;
        chartContainer.appendChild(col);
    });
}

// 3. Monthly View (Domain Mastery Bars)
function renderMonthlyTrajectory() {
    const container = document.getElementById('monthly-domain-bars');
    if (!container) return;

    container.innerHTML = '';
    curriculumData.domains.slice(0, 6).forEach(domain => {
        let total = 0, done = 0;
        domain.levels.forEach(l => {
            l.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    total++;
                    if (appState.completed[s.id]) done++;
                });
            });
        });
        const pct = total === 0 ? 0 : Math.round((done / total) * 100);

        const item = document.createElement('div');
        item.className = 'space-y-1';
        item.innerHTML = `
            <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>${domain.name}</span>
                <span>${done} / ${total} (${pct}%)</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-dark-800 h-2 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
            </div>
        `;
        container.appendChild(item);
    });
}

// 4. Yearly View (365-Day Activity Heatmap Grid)
function renderYearlyHeatmap() {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const today = new Date();
    
    for (let w = 51; w >= 0; w--) {
        const weekCol = document.createElement('div');
        weekCol.className = 'flex flex-col gap-1';

        for (let d = 0; d < 7; d++) {
            const dayOffset = (w * 7) + (6 - d);
            const dateObj = new Date(today);
            dateObj.setDate(today.getDate() - dayOffset);
            const dateStr = dateObj.toISOString().split('T')[0];

            const count = appState.activityLog[dateStr] || 0;
            let colorClass = 'bg-slate-200 dark:bg-dark-800';

            if (count >= 5) colorClass = 'bg-emerald-600 dark:bg-emerald-400';
            else if (count >= 3) colorClass = 'bg-emerald-500 dark:bg-emerald-600';
            else if (count >= 1) colorClass = 'bg-emerald-300 dark:bg-emerald-900';

            const cell = document.createElement('div');
            cell.className = `heatmap-cell ${colorClass}`;
            cell.title = `${dateStr}: ${count} problems solved`;
            weekCol.appendChild(cell);
        }
        grid.appendChild(weekCol);
    }
}

function logTodayActivity(increment = true) {
    const today = new Date().toISOString().split('T')[0];
    if (!appState.activityLog) appState.activityLog = {};
    const current = appState.activityLog[today] || 0;
    appState.activityLog[today] = Math.max(0, current + (increment ? 1 : -1));
}

// ====================================================
// ☁️ BACKEND REST CLOUD SERVICE
// ====================================================
const CLOUD_API_BASE = 'https://kvdb.io/4y9bM3TfCqJ44K2k9sK9Vz';

async function pushToBackendCloud(showToastFeedback = false) {
    if (!appState.cloudSyncKey) return;

    try {
        const syncDot = document.getElementById('sync-status-dot');
        const hudIcon = document.getElementById('cloud-sync-icon');
        if (syncDot) syncDot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-ping';
        if (hudIcon) hudIcon.className = 'fas fa-rotate text-amber-500 animate-spin';

        const payload = {
            cloudSyncKey: appState.cloudSyncKey,
            completed: appState.completed,
            bookmarks: appState.bookmarks,
            revisions: appState.revisions,
            notes: appState.notes,
            streak: appState.streak,
            activityLog: appState.activityLog,
            profiles: appState.profiles,
            lastActiveDate: appState.lastActiveDate,
            updatedAt: Date.now()
        };

        await fetch(`${CLOUD_API_BASE}/placement_prep_${appState.cloudSyncKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        appState.lastCloudSync = new Date().toLocaleTimeString();
        saveToLocalAndIndexedDB();

        if (syncDot) syncDot.className = 'w-2 h-2 rounded-full bg-emerald-500';
        if (hudIcon) hudIcon.className = 'fas fa-cloud-bolt text-emerald-500';

        const tsEl = document.getElementById('backend-sync-timestamp');
        if (tsEl) tsEl.textContent = `Last backed up to Cloud DB at ${appState.lastCloudSync}`;

        if (showToastFeedback) showToast(`Saved to Backend Cloud DB (${appState.cloudSyncKey}) ☁️`, 'success');
    } catch (e) {
        console.warn('Cloud API Push warning:', e);
    }
}

async function pullFromBackendCloud(key, showToastFeedback = false) {
    if (!key) return false;

    try {
        const res = await fetch(`${CLOUD_API_BASE}/placement_prep_${key}`);
        if (!res.ok) return false;

        const data = await res.json();
        if (data && (data.completed || data.bookmarks || data.notes || data.profiles)) {
            appState.completed = { ...appState.completed, ...(data.completed || {}) };
            appState.bookmarks = { ...appState.bookmarks, ...(data.bookmarks || {}) };
            appState.revisions = { ...appState.revisions, ...(data.revisions || {}) };
            appState.notes = { ...appState.notes, ...(data.notes || {}) };
            if (data.profiles) appState.profiles = { ...appState.profiles, ...data.profiles };
            if (data.activityLog) appState.activityLog = { ...appState.activityLog, ...data.activityLog };
            if (data.streak) appState.streak = Math.max(appState.streak || 1, data.streak);

            appState.cloudSyncKey = key;
            appState.lastCloudSync = new Date().toLocaleTimeString();
            saveToLocalAndIndexedDB();

            if (showToastFeedback) {
                showToast(`Connected to Cloud DB (${key}) & synced state! 🎉`, 'success');
            }
            return true;
        }
    } catch (e) {
        console.warn('Cloud API Pull warning:', e);
    }
    return false;
}

function triggerDebouncedBackendSync() {
    clearTimeout(cloudSyncDebounceTimer);
    cloudSyncDebounceTimer = setTimeout(() => {
        pushToBackendCloud(false);
    }, 1500);
}

function generateNewCloudSyncKey() {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const newKey = `SDE-PREP-${randomHex}`;
    const input = document.getElementById('backend-sync-key-input');
    if (input) input.value = newKey;
    applyCloudSyncKey();
}

async function applyCloudSyncKey() {
    const input = document.getElementById('backend-sync-key-input');
    if (!input || !input.value.trim()) {
        showToast("Please enter a valid Sync Key.", "error");
        return;
    }
    const key = input.value.trim().toUpperCase();
    appState.cloudSyncKey = key;
    saveToLocalAndIndexedDB();

    const pulled = await pullFromBackendCloud(key, true);
    if (!pulled) {
        await pushToBackendCloud(true);
        showToast(`Created new Cloud DB slot: ${key} ☁️`, 'info');
    }

    updateCloudHUDText();
    renderDomainTabs();
    renderCurriculum();
    updateGlobalMetrics();
    renderProfileCardsFromState();
    renderAnalyticsDashboard();
}

function forceCloudBackup() {
    if (!appState.cloudSyncKey) {
        generateNewCloudSyncKey();
    }
    pushToBackendCloud(true);
}

function updateCloudHUDText() {
    const hudText = document.getElementById('cloud-sync-hud-text');
    if (hudText && appState.cloudSyncKey) {
        hudText.textContent = `Cloud: ${appState.cloudSyncKey}`;
    }
}

// ==========================================
// 🛡️ LAYER 2: INDEXEDDB PERSISTENCE
// ==========================================
const DB_NAME = 'PlacementMasteryDB_v6';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';

function openIndexedDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) {
            resolve(null);
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
}

async function saveToIndexedDB(stateObj) {
    try {
        const db = await openIndexedDB();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ id: 'current_state', data: stateObj, updatedAt: Date.now() });
    } catch (e) {
        console.warn('IndexedDB write error:', e);
    }
}

async function loadFromIndexedDB() {
    try {
        const db = await openIndexedDB();
        if (!db) return null;
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get('current_state');
            req.onsuccess = () => resolve(req.result ? req.result.data : null);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        console.warn('IndexedDB read error:', e);
        return null;
    }
}

async function requestPersistentStorage() {
    if (navigator.storage && navigator.storage.persist) {
        try {
            const isPersisted = await navigator.storage.persist();
            const statusEl = document.getElementById('persistent-storage-status');
            if (statusEl) {
                statusEl.textContent = isPersisted ? 'Persistent (Guaranteed)' : 'Standard';
            }
        } catch (e) {
            console.log('Persistence API check');
        }
    }
}

// ====================================================
// 🔗 LAYER 3: DETERMINISTIC BITSET URL STATE ENCODER
// ====================================================
function buildSubtopicIndex() {
    allSubtopicIdList = [];
    curriculumData.domains.forEach(d => {
        d.levels.forEach(l => {
            l.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    allSubtopicIdList.push(s.id);
                });
            });
        });
    });
}

function encodeStateToHash() {
    if (allSubtopicIdList.length === 0) buildSubtopicIndex();
    
    let compBits = '';
    let starBits = '';
    let revBits = '';

    allSubtopicIdList.forEach(id => {
        compBits += appState.completed[id] ? '1' : '0';
        starBits += appState.bookmarks[id] ? '1' : '0';
        revBits += appState.revisions[id] ? '1' : '0';
    });

    const payload = {
        k: appState.cloudSyncKey || '',
        c: bitStringToHex(compBits),
        b: bitStringToHex(starBits),
        r: bitStringToHex(revBits),
        s: appState.streak || 1,
        p: appState.profiles || {},
        n: appState.notes || {}
    };

    const jsonStr = JSON.stringify(payload);
    return btoa(encodeURIComponent(jsonStr));
}

function decodeStateFromHash(base64Hash) {
    try {
        if (allSubtopicIdList.length === 0) buildSubtopicIndex();
        const jsonStr = decodeURIComponent(atob(base64Hash));
        const payload = JSON.parse(jsonStr);

        if (!payload.c) return false;

        const compBits = hexToBitString(payload.c, allSubtopicIdList.length);
        const starBits = hexToBitString(payload.b, allSubtopicIdList.length);
        const revBits = hexToBitString(payload.r, allSubtopicIdList.length);

        const newCompleted = {};
        const newBookmarks = {};
        const newRevisions = {};

        allSubtopicIdList.forEach((id, idx) => {
            if (compBits[idx] === '1') newCompleted[id] = true;
            if (starBits[idx] === '1') newBookmarks[id] = true;
            if (revBits[idx] === '1') newRevisions[id] = true;
        });

        appState.completed = newCompleted;
        appState.bookmarks = newBookmarks;
        appState.revisions = newRevisions;
        if (payload.k) appState.cloudSyncKey = payload.k;
        if (payload.s) appState.streak = payload.s;
        if (payload.p) appState.profiles = payload.p;
        if (payload.n) appState.notes = payload.n;

        return true;
    } catch (e) {
        console.error('Failed to decode URL hash', e);
        return false;
    }
}

function bitStringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i += 4) {
        const chunk = str.substr(i, 4).padEnd(4, '0');
        hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
}

function hexToBitString(hex, length) {
    let bitStr = '';
    for (let i = 0; i < hex.length; i++) {
        bitStr += parseInt(hex[i], 16).toString(2).padStart(4, '0');
    }
    return bitStr.substring(0, length);
}

function getShareablePermalink() {
    const hash = encodeStateToHash();
    const url = new URL(window.location.href);
    url.hash = `sync=${hash}`;
    return url.toString();
}

function copyShareablePermalink() {
    const url = getShareablePermalink();
    navigator.clipboard.writeText(url).then(() => {
        showToast("Permanent Cloud Sync Link copied! 🔗", "success");
    });
}

// Multi-Tier Storage Initializer
async function initializeMultiTierStorage() {
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get('key');
    if (keyFromUrl) {
        appState.cloudSyncKey = keyFromUrl.toUpperCase();
        await pullFromBackendCloud(appState.cloudSyncKey, true);
    }

    const hash = window.location.hash;
    if (hash && hash.includes('sync=')) {
        const syncPayload = hash.split('sync=')[1];
        if (decodeStateFromHash(syncPayload)) {
            saveToLocalAndIndexedDB();
            showToast("Restored progress from Permanent Sync URL! 🔗", "success");
            return;
        }
    }

    let loadedFromLocal = false;
    try {
        const saved = localStorage.getItem('placement_mastery_state_v6');
        if (saved) {
            const parsed = JSON.parse(saved);
            appState = { ...appState, ...parsed };
            loadedFromLocal = true;
        }
    } catch (e) {
        console.error("LocalStorage load error", e);
    }

    if (!loadedFromLocal || Object.keys(appState.completed).length === 0) {
        const idbState = await loadFromIndexedDB();
        if (idbState && idbState.completed && Object.keys(idbState.completed).length > 0) {
            appState = { ...appState, ...idbState };
            saveToLocalAndIndexedDB();
            showToast("Restored progress from IndexedDB storage! 🛡️", "info");
        }
    }

    if (appState.cloudSyncKey) {
        pullFromBackendCloud(appState.cloudSyncKey, false);
    } else {
        const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
        appState.cloudSyncKey = `SDE-${randomHex}`;
        saveToLocalAndIndexedDB();
        pushToBackendCloud(false);
    }
}

function saveState() {
    saveToLocalAndIndexedDB();
    triggerDebouncedBackendSync();
}

function saveToLocalAndIndexedDB() {
    try {
        localStorage.setItem('placement_mastery_state_v6', JSON.stringify(appState));
        saveToIndexedDB(appState);
        updateSyncUIFields();
    } catch (e) {
        console.error("Failed to save state", e);
    }
}

function updateSyncUIFields() {
    const urlInput = document.getElementById('permanent-sync-url-input');
    if (urlInput) urlInput.value = getShareablePermalink();

    const keyInput = document.getElementById('backend-sync-key-input');
    if (keyInput && appState.cloudSyncKey) keyInput.value = appState.cloudSyncKey;

    const tsEl = document.getElementById('backend-sync-timestamp');
    if (tsEl && appState.lastCloudSync) {
        tsEl.textContent = `Last backed up to Cloud DB at ${appState.lastCloudSync}`;
    }
}

function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = appState.lastActiveDate;

    if (lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastDate === yesterday) {
            appState.streak = (appState.streak || 0) + 1;
        } else {
            appState.streak = 1;
        }
        appState.lastActiveDate = today;
        saveState();
    }

    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.textContent = `${appState.streak} Day${appState.streak > 1 ? 's' : ''}`;
}

// Theme
function setupTheme() {
    const isDark = appState.theme === 'dark' || (!appState.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(isDark);
}

function toggleTheme() {
    const isDark = !document.documentElement.classList.contains('dark');
    applyTheme(isDark);
    appState.theme = isDark ? 'dark' : 'light';
    saveState();
    showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
}

function applyTheme(isDark) {
    const icon = document.getElementById('theme-toggle-icon');
    if (isDark) {
        document.documentElement.classList.add('dark');
        if (icon) icon.className = 'fas fa-sun text-amber-400 text-sm';
    } else {
        document.documentElement.classList.remove('dark');
        if (icon) icon.className = 'fas fa-moon text-slate-600 text-sm';
    }
}

// Domain Tabs
function renderDomainTabs() {
    const container = document.getElementById('domains-tabs-container');
    if (!container) return;

    container.innerHTML = '';
    curriculumData.domains.forEach(domain => {
        const iconClass = DOMAIN_ICONS[domain.id] || 'fa-folder';
        const isActive = domain.id === appState.activeDomainId;

        let total = 0;
        let done = 0;
        domain.levels.forEach(lvl => {
            lvl.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    total++;
                    if (appState.completed[s.id]) done++;
                });
            });
        });
        const pct = total === 0 ? 0 : Math.round((done / total) * 100);

        const tab = document.createElement('button');
        tab.className = `flex items-center space-x-2.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all border ${
            isActive 
                ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-dark-950 border-transparent shadow-sm' 
                : 'bg-transparent hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-slate-400 border-transparent'
        }`;
        tab.onclick = () => switchDomain(domain.id);

        tab.innerHTML = `
            <i class="fas ${iconClass} ${isActive ? 'text-emerald-400 dark:text-dark-950' : 'text-slate-400 dark:text-slate-500'} text-sm"></i>
            <span>${domain.name}</span>
            <span class="px-1.5 py-0.5 text-[10px] rounded-md ${
                isActive 
                    ? 'bg-slate-800 text-emerald-300 dark:bg-dark-900 dark:text-emerald-300' 
                    : 'bg-slate-100 dark:bg-dark-800 text-slate-500 dark:text-slate-400'
            }">${pct}%</span>
        `;
        container.appendChild(tab);
    });
}

function switchDomain(domainId) {
    appState.activeDomainId = domainId;
    renderDomainTabs();
    renderCurriculum();
}

// Curriculum Content
function renderCurriculum() {
    const container = document.getElementById('content-container');
    if (!container) return;

    const domain = curriculumData.domains.find(d => d.id === appState.activeDomainId);
    if (!domain) return;

    let html = '';

    domain.levels.forEach((level, levelIndex) => {
        const accordionId = `acc-${domain.id}-${levelIndex}`;
        const iconId = `icon-${domain.id}-${levelIndex}`;

        let levelTotal = 0;
        let levelDone = 0;
        level.topics.forEach(t => {
            t.subtopics.forEach(s => {
                levelTotal++;
                if (appState.completed[s.id]) levelDone++;
            });
        });
        const levelPct = levelTotal === 0 ? 0 : Math.round((levelDone / levelTotal) * 100);

        let hasVisibleSubtopics = false;
        const filteredTopics = level.topics.map(topic => {
            const visibleSubs = topic.subtopics.filter(sub => shouldShowSubtopic(sub, topic, domain));
            if (visibleSubs.length > 0) hasVisibleSubtopics = true;
            return { ...topic, visibleSubtopics: visibleSubs };
        }).filter(t => t.visibleSubtopics.length > 0);

        if (appState.searchQuery || appState.activeFilter !== 'all') {
            if (!hasVisibleSubtopics) return;
        }

        const isExpandedByDefault = levelPct < 100 || appState.searchQuery.length > 0;

        html += `
            <div class="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-dark-900 shadow-sm overflow-hidden transition-all">
                <button 
                    class="w-full px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 hover:bg-slate-100/80 dark:bg-dark-950/60 dark:hover:bg-dark-850/60 focus:outline-none transition-colors border-b border-slate-200/60 dark:border-slate-800/60"
                    onclick="toggleAccordion('${accordionId}', '${iconId}')"
                >
                    <div class="flex items-center space-x-3">
                        <span class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">${level.level}</span>
                        <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                            ${levelDone}/${levelTotal} Solved
                        </span>
                    </div>

                    <div class="flex items-center space-x-4">
                        <div class="w-28 sm:w-40 bg-slate-200 dark:bg-dark-800 rounded-full h-2 overflow-hidden">
                            <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style="width: ${levelPct}%"></div>
                        </div>
                        <span class="text-xs font-bold text-slate-500 dark:text-slate-400 w-9 text-right">${levelPct}%</span>
                        <i id="${iconId}" class="fas ${isExpandedByDefault ? 'fa-chevron-up' : 'fa-chevron-down'} text-slate-400 text-xs"></i>
                    </div>
                </button>

                <div id="${accordionId}" class="accordion-content ${isExpandedByDefault ? 'expanded' : ''}">
                    <div class="p-4 sm:p-6 space-y-6">
        `;

        filteredTopics.forEach(topic => {
            html += `
                <div class="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-dark-950/40">
                    <div class="px-4 py-3 bg-slate-100/70 dark:bg-dark-850/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-folder-tree text-slate-400 text-xs"></i>
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">${topic.topic}</h4>
                        </div>
                        <span class="text-[11px] font-medium text-slate-400">${topic.visibleSubtopics.length} Items</span>
                    </div>

                    <div class="divide-y divide-slate-100 dark:divide-slate-800/80">
            `;

            topic.visibleSubtopics.forEach(sub => {
                const isDone = !!appState.completed[sub.id];
                const isStarred = !!appState.bookmarks[sub.id];
                const isRevision = !!appState.revisions[sub.id];
                const hasNotes = !!appState.notes[sub.id];

                html += `
                    <div class="px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-100/50 dark:hover:bg-dark-800/40 transition-colors ${
                        isDone ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : ''
                    }">
                        <div class="flex items-center space-x-3 min-w-0 flex-1">
                            <input 
                                type="checkbox" 
                                id="chk-${sub.id}" 
                                class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 border-slate-300 dark:border-slate-700 bg-white dark:bg-dark-900 cursor-pointer transition-all"
                                ${isDone ? 'checked' : ''} 
                                onchange="toggleSubtopicCompletion('${sub.id}')"
                            >
                            <label 
                                for="chk-${sub.id}" 
                                class="text-sm font-medium text-slate-800 dark:text-slate-200 truncate cursor-pointer select-none ${
                                    isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''
                                }"
                            >
                                ${sub.name}
                            </label>

                            ${hasNotes ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300" title="Has custom notes"><i class="fas fa-pencil"></i></span>` : ''}
                            ${isRevision ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" title="Flagged for Revision"><i class="fas fa-rotate"></i></span>` : ''}
                        </div>

                        <div class="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                            <button 
                                onclick="toggleBookmark('${sub.id}')" 
                                class="p-1.5 rounded-lg text-xs transition-colors ${
                                    isStarred ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-dark-800'
                                }" 
                                title="Bookmark topic"
                            >
                                <i class="${isStarred ? 'fas' : 'far'} fa-star"></i>
                            </button>

                            <button 
                                onclick="openLearnModal('${domain.id}', '${level.level}', '${topic.topic}', '${sub.id}')" 
                                class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800/80 transition-all shadow-sm"
                            >
                                <i class="fas fa-book-open text-emerald-500"></i>
                                <span>Learn & Practice</span>
                            </button>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;
    });

    if (html === '') {
        container.innerHTML = `
            <div class="text-center py-16 bg-white dark:bg-dark-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <i class="fas fa-magnifying-glass text-3xl text-slate-300 dark:text-slate-600 mb-3 block"></i>
                <h4 class="text-base font-bold text-slate-700 dark:text-slate-300">No matching topics found</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Try clearing your search query or changing active filters.</p>
                <button onclick="clearSearch()" class="mt-4 px-4 py-2 text-xs font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Reset Search & Filters
                </button>
            </div>
        `;
    } else {
        container.innerHTML = html;
    }
}

function shouldShowSubtopic(sub, topic, domain) {
    if (appState.searchQuery) {
        const q = appState.searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesTopic = topic.topic.toLowerCase().includes(q);
        const matchesDomain = domain.name.toLowerCase().includes(q);
        const matchesSummary = sub.summary && sub.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesTopic && !matchesDomain && !matchesSummary) return false;
    }

    if (appState.activeFilter === 'unsolved') return !appState.completed[sub.id];
    if (appState.activeFilter === 'completed') return !!appState.completed[sub.id];
    if (appState.activeFilter === 'bookmarked') return !!appState.bookmarks[sub.id];
    if (appState.activeFilter === 'revision') return !!appState.revisions[sub.id];
    if (appState.activeFilter === 'notes') return !!appState.notes[sub.id];

    return true;
}

function toggleAccordion(id, iconId) {
    const el = document.getElementById(id);
    const icon = document.getElementById(iconId);
    if (!el) return;

    if (el.classList.contains('expanded')) {
        el.classList.remove('expanded');
        if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    } else {
        el.classList.add('expanded');
        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
}

function toggleSubtopicCompletion(subtopicId) {
    const willBeCompleted = !appState.completed[subtopicId];
    appState.completed[subtopicId] = willBeCompleted;

    logTodayActivity(willBeCompleted);
    saveState();
    updateGlobalMetrics();
    renderDomainTabs();
    renderCurriculum();
    renderAnalyticsDashboard();

    if (willBeCompleted) {
        showToast("Topic marked as completed! 🚀", "success");
    }
}

function toggleBookmark(subtopicId) {
    appState.bookmarks[subtopicId] = !appState.bookmarks[subtopicId];
    saveState();
    updateGlobalMetrics();
    renderCurriculum();
    showToast(appState.bookmarks[subtopicId] ? "Added to Bookmarks ⭐" : "Removed from Bookmarks", "info");
}

function toggleRevision(subtopicId) {
    appState.revisions[subtopicId] = !appState.revisions[subtopicId];
    saveState();
    renderCurriculum();
    showToast(appState.revisions[subtopicId] ? "Flagged for Revision 🔄" : "Removed from Revision list", "info");
}

// Learn Modal Handlers
function openLearnModal(domainId, levelName, topicName, subtopicId) {
    currentModalSubtopicId = subtopicId;

    let subtopicObj = null;
    let foundDomain = null;
    
    for (const d of curriculumData.domains) {
        for (const l of d.levels) {
            for (const t of l.topics) {
                const found = t.subtopics.find(s => s.id === subtopicId);
                if (found) {
                    subtopicObj = found;
                    foundDomain = d;
                    break;
                }
            }
        }
    }

    if (!subtopicObj) return;

    document.getElementById('modal-domain-badge').textContent = foundDomain.name;
    document.getElementById('modal-level-badge').textContent = levelName;
    document.getElementById('modal-topic-badge').textContent = topicName;
    document.getElementById('modal-subtopic-title').textContent = subtopicObj.name;

    updateModalStarRevisionButtons(subtopicId);
    document.getElementById('modal-concept-summary').innerHTML = subtopicObj.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const keyPointsContainer = document.getElementById('modal-key-points');
    keyPointsContainer.innerHTML = '';
    subtopicObj.keyPoints.forEach(point => {
        const li = document.createElement('li');
        li.className = 'flex items-start space-x-2.5';
        li.innerHTML = `
            <i class="fas fa-check text-emerald-500 text-xs mt-1 flex-shrink-0"></i>
            <span>${point}</span>
        `;
        keyPointsContainer.appendChild(li);
    });

    document.getElementById('modal-code-snippet').textContent = subtopicObj.codeSnippet;

    const problemsContainer = document.getElementById('modal-problems-list');
    problemsContainer.innerHTML = '';
    subtopicObj.problems.forEach(prob => {
        const diffColor = prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                         (prob.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300');

        const card = document.createElement('a');
        card.href = prob.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-dark-950 dark:hover:bg-dark-850 border border-slate-200/80 dark:border-slate-800 transition-all group';
        card.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <i class="fas fa-code-commit text-xs"></i>
                </div>
                <div>
                    <h5 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${prob.title}</h5>
                    <span class="text-[10px] text-slate-400">${prob.platform}</span>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${diffColor}">${prob.difficulty}</span>
                <i class="fas fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-emerald-500 transition-colors"></i>
            </div>
        `;
        problemsContainer.appendChild(card);
    });

    const resourcesContainer = document.getElementById('modal-resources-list');
    resourcesContainer.innerHTML = '';
    subtopicObj.resources.forEach(res => {
        const item = document.createElement('a');
        item.href = res.url;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
        item.className = 'flex items-center justify-between p-2.5 rounded-lg bg-slate-50/60 hover:bg-slate-100 dark:bg-dark-950/60 dark:hover:bg-dark-850 border border-slate-200/60 dark:border-slate-800/80 text-xs transition-colors group';
        item.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-link text-purple-500 text-xs"></i>
                <span class="font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">${res.title}</span>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">${res.category || res.badge || 'Link'}</span>
        `;
        resourcesContainer.appendChild(item);
    });

    document.getElementById('modal-user-notes').value = appState.notes[subtopicId] || '';
    updateModalStatusButton(subtopicId);

    const modal = document.getElementById('learn-modal');
    modal.classList.remove('hidden');
}

function closeLearnModal() {
    const modal = document.getElementById('learn-modal');
    modal.classList.add('hidden');
    currentModalSubtopicId = null;
}

function updateModalStarRevisionButtons(subtopicId) {
    const isStarred = !!appState.bookmarks[subtopicId];
    const isRevision = !!appState.revisions[subtopicId];

    const starBtn = document.getElementById('modal-toggle-star');
    const revBtn = document.getElementById('modal-toggle-revision');

    if (starBtn) starBtn.innerHTML = `<i class="${isStarred ? 'fas' : 'far'} fa-star ${isStarred ? 'text-amber-500' : ''}"></i>`;
    if (revBtn) revBtn.innerHTML = `<i class="fas fa-arrows-rotate ${isRevision ? 'text-blue-500' : ''}"></i>`;
}

function updateModalStatusButton(subtopicId) {
    const isDone = !!appState.completed[subtopicId];
    const btn = document.getElementById('modal-status-toggle-btn');
    const text = document.getElementById('modal-status-btn-text');

    if (isDone) {
        btn.className = 'w-full py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-dark-800 dark:text-slate-300 dark:hover:bg-dark-700';
        text.textContent = 'Completed (Click to Undo)';
    } else {
        btn.className = 'w-full py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white';
        text.textContent = 'Mark as Completed';
    }
}

function toggleModalCompletionStatus() {
    if (!currentModalSubtopicId) return;
    toggleSubtopicCompletion(currentModalSubtopicId);
    updateModalStatusButton(currentModalSubtopicId);
}

function toggleModalBookmark() {
    if (!currentModalSubtopicId) return;
    toggleBookmark(currentModalSubtopicId);
    updateModalStarRevisionButtons(currentModalSubtopicId);
}

function toggleModalRevision() {
    if (!currentModalSubtopicId) return;
    toggleRevision(currentModalSubtopicId);
    updateModalStarRevisionButtons(currentModalSubtopicId);
}

function saveModalUserNotes(text) {
    if (!currentModalSubtopicId) return;
    appState.notes[currentModalSubtopicId] = text;
    saveState();
    renderCurriculum();
}

function copySnippetToClipboard() {
    const code = document.getElementById('modal-code-snippet').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyText = document.getElementById('copy-btn-text');
        copyText.textContent = 'Copied!';
        setTimeout(() => copyText.textContent = 'Copy', 2000);
        showToast("Code snippet copied to clipboard! 📋", "success");
    });
}

function updateGlobalMetrics() {
    let total = 0;
    let done = 0;
    let completedDomains = 0;

    curriculumData.domains.forEach(domain => {
        let domainTotal = 0;
        let domainDone = 0;
        domain.levels.forEach(lvl => {
            lvl.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    total++;
                    domainTotal++;
                    if (appState.completed[s.id]) {
                        done++;
                        domainDone++;
                    }
                });
            });
        });
        if (domainTotal > 0 && domainTotal === domainDone) completedDomains++;
    });

    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    const pctBadge = document.getElementById('overall-percentage-badge');
    if (pctBadge) pctBadge.textContent = `${pct}%`;

    const progBar = document.getElementById('overall-progress-bar');
    if (progBar) progBar.style.width = `${pct}%`;

    const subCounter = document.getElementById('overall-subtopic-counter');
    if (subCounter) subCounter.textContent = `${done} of ${total} Subtopics Solved`;

    const domCounter = document.getElementById('overall-domains-counter');
    if (domCounter) domCounter.textContent = `${completedDomains}/11 Domains Complete`;

    const hudDone = document.getElementById('hud-completed-count');
    if (hudDone) hudDone.textContent = `${done} / ${total}`;

    const starCount = Object.values(appState.bookmarks).filter(Boolean).length;
    const hudStar = document.getElementById('hud-bookmark-count');
    if (hudStar) hudStar.textContent = `${starCount}`;
}

function handleSearch(query) {
    appState.searchQuery = query.trim();
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
        if (appState.searchQuery) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
    }
    renderCurriculum();
}

function clearSearch() {
    appState.searchQuery = '';
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
    setFilter('all');
}

function setFilter(filterType) {
    appState.activeFilter = filterType;

    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.className = 'filter-chip px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-dark-700 transition-all';
    });

    const activeBtn = document.getElementById(`filter-btn-${filterType}`);
    if (activeBtn) {
        activeBtn.className = 'filter-chip px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-semibold transition-all shadow-sm';
    }

    renderCurriculum();
}

function filterByBookmark() {
    setFilter('bookmarked');
}

function pickRandomTopic() {
    const unsolvedList = [];
    curriculumData.domains.forEach(d => {
        d.levels.forEach(l => {
            l.topics.forEach(t => {
                t.subtopics.forEach(s => {
                    if (!appState.completed[s.id]) {
                        unsolvedList.push({ domain: d, level: l, topic: t, subtopic: s });
                    }
                });
            });
        });
    });

    if (unsolvedList.length === 0) {
        showToast("Incredible! You have completed all topics! 🏆", "success");
        return;
    }

    const random = unsolvedList[Math.floor(Math.random() * unsolvedList.length)];
    appState.activeDomainId = random.domain.id;
    renderDomainTabs();
    renderCurriculum();
    openLearnModal(random.domain.id, random.level.level, random.topic.topic, random.subtopic.id);
    showToast(`Picked random topic: ${random.subtopic.name} 🎲`, "info");
}

function openCloudSyncModal() {
    updateSyncUIFields();
    const modal = document.getElementById('cloud-sync-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeCloudSyncModal() {
    const modal = document.getElementById('cloud-sync-modal');
    if (modal) modal.classList.add('hidden');
}

function toggleBackupMenu() {
    const menu = document.getElementById('backup-dropdown');
    if (menu) menu.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('backup-dropdown');
    const btn = document.getElementById('backup-menu-btn');
    if (menu && btn && !btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

function exportProgressJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `placement_mastery_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Progress exported successfully! 📁", "success");
}

function importProgressJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.completed) {
                appState = { ...appState, ...imported };
                saveState();
                updateStreak();
                renderDomainTabs();
                renderCurriculum();
                updateGlobalMetrics();
                renderProfileCardsFromState();
                renderAnalyticsDashboard();
                showToast("Progress imported & restored! 🎉", "success");
            } else {
                showToast("Invalid backup JSON format", "error");
            }
        } catch (err) {
            showToast("Failed to parse JSON file", "error");
        }
    };
    reader.readAsText(file);
}

function confirmResetProgress() {
    if (confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
        appState.completed = {};
        appState.bookmarks = {};
        appState.revisions = {};
        appState.notes = {};
        appState.activityLog = {};
        saveState();
        renderDomainTabs();
        renderCurriculum();
        updateGlobalMetrics();
        renderAnalyticsDashboard();
        showToast("All progress reset.", "info");
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-emerald-600' : (type === 'error' ? 'bg-rose-600' : 'bg-slate-900 dark:bg-dark-800');
    
    toast.className = `flex items-center space-x-3 px-4 py-3 rounded-xl text-white text-xs font-semibold shadow-xl border border-white/10 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto ${bgColor}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info')} text-sm"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLearnModal();
            closeCloudSyncModal();
        }
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const search = document.getElementById('global-search-input');
            if (search) search.focus();
        }
    });
}
