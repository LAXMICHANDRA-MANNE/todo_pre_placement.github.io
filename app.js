/**
 * 5-Star Placement Mastery Engine
 * State Management, Interactive Knowledge Drawer, Filtering, and Tracking
 */

// Global State
let appState = {
    completed: {},
    bookmarks: {},
    revisions: {},
    notes: {},
    streak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    theme: 'dark',
    activeDomainId: 'dsa',
    activeFilter: 'all',
    searchQuery: ''
};

let currentModalSubtopicId = null;

// Domain Icon Mapping
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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupTheme();
    updateStreak();
    renderDomainTabs();
    renderCurriculum();
    updateGlobalMetrics();
    setupKeyboardShortcuts();
});

// Load state from localStorage
function loadState() {
    try {
        const saved = localStorage.getItem('placement_mastery_state_v2');
        if (saved) {
            const parsed = JSON.parse(saved);
            appState = { ...appState, ...parsed };
        } else {
            // Check legacy migration
            const legacyState = localStorage.getItem('mastery_tracker_state');
            if (legacyState) {
                appState.completed = JSON.parse(legacyState);
            }
        }
    } catch (e) {
        console.error("Failed to load local state", e);
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('placement_mastery_state_v2', JSON.stringify({
            completed: appState.completed,
            bookmarks: appState.bookmarks,
            revisions: appState.revisions,
            notes: appState.notes,
            streak: appState.streak,
            lastActiveDate: appState.lastActiveDate,
            theme: appState.theme
        }));
    } catch (e) {
        console.error("Failed to save state", e);
    }
}

// Daily Streak Engine
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

// Setup Theme (Default to Dark for sleek modern aesthetic)
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

// Render Domain Tabs
function renderDomainTabs() {
    const container = document.getElementById('domains-tabs-container');
    if (!container) return;

    container.innerHTML = '';
    curriculumData.domains.forEach(domain => {
        const iconClass = DOMAIN_ICONS[domain.id] || 'fa-folder';
        const isActive = domain.id === appState.activeDomainId;

        // Calculate progress for domain
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

// Render Main Curriculum Content
function renderCurriculum() {
    const container = document.getElementById('content-container');
    if (!container) return;

    const domain = curriculumData.domains.find(d => d.id === appState.activeDomainId);
    if (!domain) return;

    let html = '';

    domain.levels.forEach((level, levelIndex) => {
        const accordionId = `acc-${domain.id}-${levelIndex}`;
        const iconId = `icon-${domain.id}-${levelIndex}`;

        // Calculate level completion
        let levelTotal = 0;
        let levelDone = 0;
        level.topics.forEach(t => {
            t.subtopics.forEach(s => {
                levelTotal++;
                if (appState.completed[s.id]) levelDone++;
            });
        });
        const levelPct = levelTotal === 0 ? 0 : Math.round((levelDone / levelTotal) * 100);

        // Filter subtopics based on search and active filter
        let hasVisibleSubtopics = false;
        const filteredTopics = level.topics.map(topic => {
            const visibleSubs = topic.subtopics.filter(sub => shouldShowSubtopic(sub, topic, domain));
            if (visibleSubs.length > 0) hasVisibleSubtopics = true;
            return { ...topic, visibleSubtopics: visibleSubs };
        }).filter(t => t.visibleSubtopics.length > 0);

        // If search or filter is active and level has no matches, skip
        if (appState.searchQuery || appState.activeFilter !== 'all') {
            if (!hasVisibleSubtopics) return;
        }

        const isExpandedByDefault = levelPct < 100 || appState.searchQuery.length > 0;

        html += `
            <div class="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-dark-900 shadow-sm overflow-hidden transition-all">
                <!-- Level Header Accordion Trigger -->
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

                <!-- Accordion Body -->
                <div id="${accordionId}" class="accordion-content ${isExpandedByDefault ? 'expanded' : ''}">
                    <div class="p-4 sm:p-6 space-y-6">
        `;

        filteredTopics.forEach(topic => {
            html += `
                <div class="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-dark-950/40">
                    <!-- Topic Group Header -->
                    <div class="px-4 py-3 bg-slate-100/70 dark:bg-dark-850/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-folder-tree text-slate-400 text-xs"></i>
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">${topic.topic}</h4>
                        </div>
                        <span class="text-[11px] font-medium text-slate-400">${topic.visibleSubtopics.length} Items</span>
                    </div>

                    <!-- Subtopic Rows List -->
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
                        <!-- Left: Checkbox & Name -->
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

                            <!-- Badge Indicators -->
                            ${hasNotes ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300" title="Has custom notes"><i class="fas fa-pencil"></i></span>` : ''}
                            ${isRevision ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" title="Flagged for Revision"><i class="fas fa-rotate"></i></span>` : ''}
                        </div>

                        <!-- Right Actions: Star, Revision, Learn Button -->
                        <div class="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                            <!-- Star/Bookmark -->
                            <button 
                                onclick="toggleBookmark('${sub.id}')" 
                                class="p-1.5 rounded-lg text-xs transition-colors ${
                                    isStarred ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-dark-800'
                                }" 
                                title="Bookmark for quick recall"
                            >
                                <i class="${isStarred ? 'fas' : 'far'} fa-star"></i>
                            </button>

                            <!-- Learn & Practice Button (Opens Drawer) -->
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

// Subtopic Visibility Filter Matcher
function shouldShowSubtopic(sub, topic, domain) {
    // 1. Search Query Match
    if (appState.searchQuery) {
        const q = appState.searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesTopic = topic.topic.toLowerCase().includes(q);
        const matchesDomain = domain.name.toLowerCase().includes(q);
        const matchesSummary = sub.summary && sub.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesTopic && !matchesDomain && !matchesSummary) return false;
    }

    // 2. Active Filter Match
    if (appState.activeFilter === 'unsolved') return !appState.completed[sub.id];
    if (appState.activeFilter === 'completed') return !!appState.completed[sub.id];
    if (appState.activeFilter === 'bookmarked') return !!appState.bookmarks[sub.id];
    if (appState.activeFilter === 'revision') return !!appState.revisions[sub.id];
    if (appState.activeFilter === 'notes') return !!appState.notes[sub.id];

    return true;
}

// Toggle Accordion Collapse/Expand
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

// Completion Toggle
function toggleSubtopicCompletion(subtopicId) {
    appState.completed[subtopicId] = !appState.completed[subtopicId];
    saveState();
    updateGlobalMetrics();
    renderDomainTabs();
    renderCurriculum();

    if (appState.completed[subtopicId]) {
        showToast("Topic marked as completed! 🚀", "success");
    }
}

// Bookmark Toggle
function toggleBookmark(subtopicId) {
    appState.bookmarks[subtopicId] = !appState.bookmarks[subtopicId];
    saveState();
    updateGlobalMetrics();
    renderCurriculum();
    showToast(appState.bookmarks[subtopicId] ? "Added to Saved Bookmarks ⭐" : "Removed from Bookmarks", "info");
}

// Revision Toggle
function toggleRevision(subtopicId) {
    appState.revisions[subtopicId] = !appState.revisions[subtopicId];
    saveState();
    renderCurriculum();
    showToast(appState.revisions[subtopicId] ? "Flagged for Revision 🔄" : "Removed from Revision list", "info");
}

// Open Interactive Learn & Practice Modal
function openLearnModal(domainId, levelName, topicName, subtopicId) {
    currentModalSubtopicId = subtopicId;

    let subtopicObj = null;
    let foundDomain = null;
    
    // Find subtopic data
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

    // Set Header Badges
    document.getElementById('modal-domain-badge').textContent = foundDomain.name;
    document.getElementById('modal-level-badge').textContent = levelName;
    document.getElementById('modal-topic-badge').textContent = topicName;
    document.getElementById('modal-subtopic-title').textContent = subtopicObj.name;

    // Star & Revision Status
    updateModalStarRevisionButtons(subtopicId);

    // Concept Overview
    document.getElementById('modal-concept-summary').innerHTML = subtopicObj.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Key Points
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

    // Code Snippet
    document.getElementById('modal-code-snippet').textContent = subtopicObj.codeSnippet;

    // Problems List
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

    // Resources List
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

    // User Notes
    document.getElementById('modal-user-notes').value = appState.notes[subtopicId] || '';

    // Completion Status Button in Modal Footer
    updateModalStatusButton(subtopicId);

    // Show Modal
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

    if (starBtn) {
        starBtn.innerHTML = `<i class="${isStarred ? 'fas' : 'far'} fa-star ${isStarred ? 'text-amber-500' : ''}"></i>`;
    }
    if (revBtn) {
        revBtn.innerHTML = `<i class="fas fa-arrows-rotate ${isRevision ? 'text-blue-500' : ''}"></i>`;
    }
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

// Global Metrics Calculation
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

    // Update Banner Progress
    const pctBadge = document.getElementById('overall-percentage-badge');
    if (pctBadge) pctBadge.textContent = `${pct}%`;

    const progBar = document.getElementById('overall-progress-bar');
    if (progBar) progBar.style.width = `${pct}%`;

    const subCounter = document.getElementById('overall-subtopic-counter');
    if (subCounter) subCounter.textContent = `${done} of ${total} Subtopics Solved`;

    const domCounter = document.getElementById('overall-domains-counter');
    if (domCounter) domCounter.textContent = `${completedDomains}/11 Domains Complete`;

    // Update HUD Stats
    const hudDone = document.getElementById('hud-completed-count');
    if (hudDone) hudDone.textContent = `${done} / ${total}`;

    const starCount = Object.values(appState.bookmarks).filter(Boolean).length;
    const hudStar = document.getElementById('hud-bookmark-count');
    if (hudStar) hudStar.textContent = `${starCount}`;
}

// Search and Filter Handlers
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

    // Update Chip Styles
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

// Random Topic Picker (LeetCode style)
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

// Backup & Data Sync
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
        saveState();
        renderDomainTabs();
        renderCurriculum();
        updateGlobalMetrics();
        showToast("All progress reset.", "info");
    }
}

// Toast System
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

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Animate out
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLearnModal();
        }
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const search = document.getElementById('global-search-input');
            if (search) search.focus();
        }
    });
}
