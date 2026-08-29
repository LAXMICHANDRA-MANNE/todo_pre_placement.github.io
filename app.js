document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.getElementById('tabs-container');
    const contentContainer = document.getElementById('content-container');
    const overallProgressText = document.getElementById('overall-progress-text');
    const overallProgressBar = document.getElementById('overall-progress-bar');

    let activeDomainId = curriculumData.domains[0].id;
    let state = JSON.parse(localStorage.getItem('mastery_tracker_state')) || {};

    function saveState() {
        localStorage.setItem('mastery_tracker_state', JSON.stringify(state));
        updateOverallProgress();
        renderDomainContent(activeDomainId); // re-render to update completed styles if needed
    }

    function init() {
        // Migration check: if old state format (topic string IDs), clear or ignore. The new format uses domain__level__topic__subtopicIndex
        renderTabs();
        renderDomainContent(activeDomainId);
        updateOverallProgress();
    }

    function getSubtopicId(domainId, levelName, topicName, subtopicIndex) {
        return `${domainId}__${levelName.replace(/[^a-zA-Z0-9]/g, '')}__${topicName.replace(/[^a-zA-Z0-9]/g, '')}__${subtopicIndex}`;
    }

    function updateOverallProgress() {
        let totalSubtopics = 0;
        let completedSubtopics = 0;

        curriculumData.domains.forEach(domain => {
            domain.levels.forEach(level => {
                level.topics.forEach(topic => {
                    topic.subtopics.forEach((subtopic, index) => {
                        totalSubtopics++;
                        const subId = getSubtopicId(domain.id, level.level, topic.topic, index);
                        if (state[subId]) {
                            completedSubtopics++;
                        }
                    });
                });
            });
        });

        const percentage = totalSubtopics === 0 ? 0 : Math.round((completedSubtopics / totalSubtopics) * 100);
        overallProgressText.textContent = `${percentage}% (${completedSubtopics} / ${totalSubtopics})`;
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
    window.toggleSubtopic = function(checkboxId, subtopicId) {
        const checkbox = document.getElementById(checkboxId);
        state[subtopicId] = checkbox.checked;
        saveState();
    };

    function renderDomainContent(domainId) {
        const domain = curriculumData.domains.find(d => d.id === domainId);
        if (!domain) return;

        let html = '';
        
        domain.levels.forEach((level, levelIndex) => {
            const accordionId = `acc-${domainId}-${levelIndex}`;
            const iconId = `icon-${domainId}-${levelIndex}`;
            
            // Calculate progress for this level based on subtopics
            let levelTotal = 0;
            let levelCompleted = 0;
            level.topics.forEach(t => {
                t.subtopics.forEach((sub, subIndex) => {
                    levelTotal++;
                    const subId = getSubtopicId(domain.id, level.level, t.topic, subIndex);
                    if (state[subId]) levelCompleted++;
                });
            });
            const levelPercentage = levelTotal === 0 ? 0 : Math.round((levelCompleted / levelTotal) * 100);

            html += `
                <div class="mb-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <button class="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none transition-colors" onclick="toggleAccordion('${accordionId}', '${iconId}')">
                        <div class="flex items-center space-x-4">
                            <span class="text-lg font-bold text-gray-800">${level.level}</span>
                            <span class="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm">${levelCompleted}/${levelTotal} Done</span>
                        </div>
                        <i id="${iconId}" class="fas fa-chevron-down text-gray-500"></i>
                    </button>
                    
                    <div id="${accordionId}" class="accordion-content ${levelPercentage > 0 && levelPercentage < 100 ? 'expanded' : ''}">
                        <div class="p-6 bg-white">
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-6 shadow-inner">
                                <div class="bg-red-500 h-2 rounded-full transition-all duration-500" style="width: ${levelPercentage}%"></div>
                            </div>
                            
                            <div class="space-y-8">
            `;

            // Fix icon class logic for expanded on load
            if(levelPercentage > 0 && levelPercentage < 100) {
               setTimeout(() => {
                   const iconEl = document.getElementById(iconId);
                   if (iconEl) {
                       iconEl.classList.remove('fa-chevron-down');
                       iconEl.classList.add('fa-chevron-up');
                   }
               }, 10);
            }

            level.topics.forEach((topic, topicIndex) => {
                html += `
                                <div class="border border-gray-200 rounded-lg overflow-hidden">
                                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                        <h3 class="font-bold text-gray-800">${topic.topic}</h3>
                                    </div>
                                    <ul class="divide-y divide-gray-100">
                `;
                
                topic.subtopics.forEach((subtopic, subIndex) => {
                    const subId = getSubtopicId(domain.id, level.level, topic.topic, subIndex);
                    const isChecked = state[subId] ? 'checked' : '';
                    const rowClass = state[subId] ? 'bg-green-50/50' : 'hover:bg-gray-50';
                    const textClass = state[subId] ? 'text-gray-400 line-through' : 'text-gray-700';
                    const checkboxId = `cb-${subId}`;

                    html += `
                                        <li class="flex items-center justify-between px-4 py-3 transition-colors ${rowClass}">
                                            <div class="flex items-start space-x-3 flex-grow">
                                                <div class="flex-shrink-0 pt-0.5">
                                                    <input id="${checkboxId}" type="checkbox" class="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer transition-all" ${isChecked} onchange="toggleSubtopic('${checkboxId}', '${subId}')">
                                                </div>
                                                <label for="${checkboxId}" class="font-medium cursor-pointer flex-grow ${textClass} text-sm md:text-base leading-tight pt-0.5">
                                                    ${subtopic.name}
                                                </label>
                                            </div>
                                            <div class="flex-shrink-0 ml-4">
                                                <a href="${subtopic.resource.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-md transition-colors border border-blue-200 shadow-sm" title="Study Material">
                                                    <i class="fas fa-external-link-alt"></i>
                                                    <span class="hidden sm:inline">Learn</span>
                                                </a>
                                            </div>
                                        </li>
                    `;
                });

                html += `
                                    </ul>
                                </div>
                `;
            });

            html += `
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
