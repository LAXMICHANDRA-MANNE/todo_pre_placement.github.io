document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = JSON.parse(localStorage.getItem('mastery_tracker_state')) || {};
    let activeDomainId = curriculumData.domains[0].id;

    const tabsContainer = document.getElementById('tabs-container');
    const contentContainer = document.getElementById('content-container');
    const overallProgressText = document.getElementById('overall-progress-text');
    const overallProgressBar = document.getElementById('overall-progress-bar');

    function saveState() {
        localStorage.setItem('mastery_tracker_state', JSON.stringify(state));
        updateOverallProgress();
        renderDomainContent(activeDomainId); // re-render to update completed styles if needed
    }

    function init() {
        renderTabs();
        renderDomainContent(activeDomainId);
        updateOverallProgress();
    }

    function getTopicId(domainId, levelName, topicName) {
        // Create a unique, URL-safe ID for each topic row
        return `${domainId}__${levelName.replace(/[^a-zA-Z0-9]/g, '')}__${topicName.replace(/[^a-zA-Z0-9]/g, '')}`;
    }

    function updateOverallProgress() {
        let totalTopics = 0;
        let completedTopics = 0;

        curriculumData.domains.forEach(domain => {
            domain.levels.forEach(level => {
                level.topics.forEach(topic => {
                    totalTopics++;
                    const topicId = getTopicId(domain.id, level.level, topic.topic);
                    if (state[topicId]) {
                        completedTopics++;
                    }
                });
            });
        });

        const percentage = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
        overallProgressText.textContent = `${percentage}% (${completedTopics} / ${totalTopics})`;
        overallProgressBar.style.width = `${percentage}%`;
    }

    function renderTabs() {
        tabsContainer.innerHTML = '';
        curriculumData.domains.forEach(domain => {
            const btn = document.createElement('button');
            btn.className = `tab-btn px-4 py-3 font-semibold text-sm mr-2 hover:bg-gray-50 focus:outline-none ${domain.id === activeDomainId ? 'active' : 'text-gray-500'}`;
            btn.textContent = domain.name;
            btn.onclick = () => {
                activeDomainId = domain.id;
                renderTabs();
                renderDomainContent(activeDomainId);
            };
            tabsContainer.appendChild(btn);
        });
    }

    function toggleAccordion(id, iconId) {
        const content = document.getElementById(id);
        const icon = document.getElementById(iconId);
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            content.classList.add('expanded');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }

    // Expose for inline onclick
    window.toggleAccordion = toggleAccordion;
    window.toggleTopic = function(checkboxId, topicId) {
        const checkbox = document.getElementById(checkboxId);
        state[topicId] = checkbox.checked;
        saveState();
    };

    function renderDomainContent(domainId) {
        const domain = curriculumData.domains.find(d => d.id === domainId);
        if (!domain) return;

        let html = '';
        
        domain.levels.forEach((level, levelIndex) => {
            const accordionId = `acc-${domainId}-${levelIndex}`;
            const iconId = `icon-${domainId}-${levelIndex}`;
            
            // Calculate progress for this level
            let levelTotal = level.topics.length;
            let levelCompleted = 0;
            level.topics.forEach(t => {
                const tId = getTopicId(domain.id, level.level, t.topic);
                if (state[tId]) levelCompleted++;
            });
            const levelPercentage = levelTotal === 0 ? 0 : Math.round((levelCompleted / levelTotal) * 100);

            html += `
                <div class="mb-4 border border-gray-200 rounded-lg">
                    <button class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg focus:outline-none" onclick="toggleAccordion('${accordionId}', '${iconId}')">
                        <div class="flex items-center space-x-4">
                            <span class="text-lg font-bold text-gray-800">${level.level}</span>
                            <span class="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">${levelCompleted}/${levelTotal} Done</span>
                        </div>
                        <i id="${iconId}" class="fas fa-chevron-down text-gray-500"></i>
                    </button>
                    
                    <div id="${accordionId}" class="accordion-content ${levelPercentage > 0 && levelPercentage < 100 ? 'expanded' : ''}">
                        <div class="p-6">
                            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                                <div class="bg-red-400 h-1.5 rounded-full" style="width: ${levelPercentage}%"></div>
                            </div>
                            
                            <div class="overflow-x-auto">
                                <table class="min-w-full text-left text-sm whitespace-nowrap">
                                    <thead class="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 w-16 text-center">Status</th>
                                            <th scope="col" class="px-6 py-3">Topic</th>
                                            <th scope="col" class="px-6 py-3 w-1/2">Subtopics</th>
                                            <th scope="col" class="px-6 py-3 text-center">Resources</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
            `;

            // Fix icon class logic for expanded on load
            if(levelPercentage > 0 && levelPercentage < 100) {
               setTimeout(() => {
                   document.getElementById(iconId).classList.remove('fa-chevron-down');
                   document.getElementById(iconId).classList.add('fa-chevron-up');
               }, 10);
            }

            level.topics.forEach((topic, topicIndex) => {
                const topicId = getTopicId(domain.id, level.level, topic.topic);
                const isChecked = state[topicId] ? 'checked' : '';
                const rowClass = state[topicId] ? 'completed-row' : 'hover:bg-gray-50';
                const checkboxId = `cb-${topicId}`;

                html += `
                                        <tr class="border-b border-gray-200 ${rowClass}">
                                            <td class="px-6 py-4 text-center">
                                                <input id="${checkboxId}" type="checkbox" class="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" ${isChecked} onchange="toggleTopic('${checkboxId}', '${topicId}')">
                                            </td>
                                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-normal">
                                                ${topic.topic}
                                            </td>
                                            <td class="px-6 py-4 text-gray-600 whitespace-normal">
                                                ${topic.subtopics}
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <a href="#" class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Add resource link in future">
                                                    <i class="fas fa-link"></i>
                                                </a>
                                            </td>
                                        </tr>
                `;
            });

            html += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        contentContainer.innerHTML = html;
    }

    init();
});
