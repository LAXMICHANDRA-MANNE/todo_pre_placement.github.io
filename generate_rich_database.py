import json
import urllib.parse
import os

with open("/Users/chandanmanne/Desktop/placement_prep/todo_pre_placement.github.io/generate_data2.py", "r") as f:
    code = f.read()

# Extract curriculum dict from generate_data2.py
loc = {}
exec(code, loc)
curriculum = loc.get("curriculum")

def get_detailed_concept(domain_id, topic_name, subtopic_name, level_name):
    # Specialized explanations, high-yield points, cheat sheets and problems
    sub_lower = subtopic_name.lower()
    top_lower = topic_name.lower()
    dom_lower = domain_id.lower()
    
    # Defaults
    summary = f"Comprehensive deep-dive into **{subtopic_name}** under **{topic_name}** ({domain_id.upper()}). Essential for campus and off-campus tech assessments, coding rounds, and technical system interviews."
    key_points = [
        f"Understand the fundamental mechanics of {subtopic_name} and where it fits in the {topic_name} hierarchy.",
        f"Master the time/space trade-offs and runtime complexities expected in SDE interviews.",
        f"Identify common pitfalls, edge cases (e.g. overflow, null inputs, concurrency bottlenecks), and optimization tricks.",
        f"Be prepared to explain real-world use cases and architectural relevance during design/core rounds."
    ]
    
    # Tailored code snippets
    if "dsa" in dom_lower:
        code_snippet = f"""// 🚀 {topic_name}: {subtopic_name}
// Complexity: Best/Avg/Worst runtime optimization template

function solveProblem(input) {{
    if (!input || input.length === 0) return 0;
    
    // Core logic for {subtopic_name}
    let left = 0, right = input.length - 1;
    let maxVal = -Infinity;
    
    while (left <= right) {{
        // Optimized condition traversal
        let mid = Math.floor(left + (right - left) / 2);
        if (input[mid] === target) return mid;
        else if (input[mid] < target) left = mid + 1;
        else right = mid - 1;
    }}
    return -1;
}}"""
    elif "dbms" in dom_lower:
        code_snippet = f"""-- 🗄️ SQL / DBMS Deep Dive: {subtopic_name}
-- Optimization & Execution Plan Analysis

EXPLAIN ANALYZE
SELECT 
    dept_id,
    employee_name,
    salary,
    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank_in_dept
FROM 
    employees
WHERE 
    is_active = TRUE
ORDER BY 
    dept_id, rank_in_dept;

-- Index Optimization: CREATE INDEX idx_dept_sal ON employees(dept_id, salary DESC);"""
    elif "os" in dom_lower:
        code_snippet = f"""// 💻 Operating Systems / Concurrency: {subtopic_name}
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

sem_t mutex;

void* critical_section_worker(void* arg) {{
    // Wait / Acquire
    sem_wait(&mutex);
    
    // Critical Section: {subtopic_name}
    printf("Executing thread safe block for: %s\\n", "{subtopic_name}");
    
    // Signal / Release
    sem_post(&mutex);
    return NULL;
}}"""
    elif "networks" in dom_lower:
        code_snippet = f"""# 🌐 Computer Networks: {subtopic_name}
# Diagnostic & Socket Flow Example

import socket

def inspect_network():
    # TCP Socket Creation & Handshake Flow
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5.0)
    
    host = "takeuforward.org"
    port = 443
    
    print(f"Connecting to {{host}}:{{port}} for {subtopic_name} inspection...")
    sock.connect((host, port))
    sock.sendall(b"HEAD / HTTP/1.1\\r\\nHost: takeuforward.org\\r\\n\\r\\n")
    response = sock.recv(1024)
    print("Received:", response.decode(errors="ignore")[:100])
    sock.close()"""
    elif "aiml" in dom_lower:
        code_snippet = f"""# 🤖 Machine Learning / AI: {subtopic_name}
import torch
import torch.nn as nn

class {subtopic_name.replace(' ', '').replace('/', '').replace('-', '')}Model(nn.Module):
    def __init__(self, input_dim=768, hidden_dim=256, output_dim=10):
        super().__init__()
        self.layer1 = nn.Linear(input_dim, hidden_dim)
        self.activation = nn.ReLU()
        self.dropout = nn.Dropout(0.2)
        self.classifier = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        x = self.dropout(self.activation(self.layer1(x)))
        return self.classifier(x)"""
    else:
        code_snippet = f"""# ⚙️ Production Grade Pattern: {subtopic_name}
from dataclasses import dataclass
from typing import Optional, List

@dataclass
class {subtopic_name.replace(' ', '').replace('/', '').replace('-', '')}Config:
    enabled: bool = True
    retry_limit: int = 3
    timeout_ms: int = 2000

class ServiceEngine:
    def __init__(self, config: {subtopic_name.replace(' ', '').replace('/', '').replace('-', '')}Config):
        self.config = config

    def execute_workflow(self, payload: dict) -> dict:
        # Standard resilient execution
        return {{"status": "SUCCESS", "topic": "{subtopic_name}"}}"""

    # Problems & Direct Links
    encoded_sub = urllib.parse.quote_plus(subtopic_name)
    encoded_top = urllib.parse.quote_plus(topic_name)
    
    problems = [
        {
            "title": f"Practice {subtopic_name} on LeetCode",
            "platform": "LeetCode",
            "difficulty": "Medium" if "Intermediate" in level_name else ("Hard" if "Advanced" in level_name or "Expert" in level_name else "Easy"),
            "url": f"https://leetcode.com/problemset/all/?search={encoded_sub}"
        },
        {
            "title": f"{subtopic_name} Interview Problems & Solutions",
            "platform": "GeeksforGeeks",
            "difficulty": "Medium",
            "url": f"https://www.geeksforgeeks.org/search/?q={encoded_sub}"
        },
        {
            "title": f"Striver's Curated {topic_name} Sheet",
            "platform": "TakeUForward",
            "difficulty": "All Levels",
            "url": f"https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" if "dsa" in dom_lower else f"https://takeuforward.org/?s={encoded_sub}"
        },
        {
            "title": f"InterviewBit Top Assessment Questions: {subtopic_name}",
            "platform": "InterviewBit",
            "difficulty": "Hard" if "Expert" in level_name else "Medium",
            "url": f"https://www.interviewbit.com/search/?q={encoded_sub}"
        }
    ]

    resources = [
        {
            "title": f"TakeUForward (Striver) Course & Notes",
            "category": "Roadmap & Video",
            "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" if "dsa" in dom_lower else f"https://takeuforward.org/?s={encoded_sub}",
            "badge": "Top Recommended"
        },
        {
            "title": f"GeeksforGeeks: {subtopic_name} In-Depth Tutorial",
            "category": "Article & Code",
            "url": f"https://www.geeksforgeeks.org/search/?q={encoded_sub}",
            "badge": "Comprehensive"
        },
        {
            "title": f"YouTube: Top Ranked Visual Explanations for {subtopic_name}",
            "category": "Video Breakdown",
            "url": f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(domain_id + ' ' + topic_name + ' ' + subtopic_name + ' full tutorial interview')}",
            "badge": "Video"
        },
        {
            "title": f"NeetCode / LeetCode Discussion & Visualizations",
            "category": "Problem Patterns",
            "url": f"https://neetcode.io/practice" if "dsa" in dom_lower else f"https://leetcode.com/discuss/general-discussion?currentPage=1&orderBy=most_votes&query={encoded_sub}",
            "badge": "Community"
        },
        {
            "title": f"Official Docs / Wikipedia Technical Definition",
            "category": "Reference",
            "url": f"https://en.wikipedia.org/wiki/Special:Search?search={encoded_sub}",
            "badge": "Theory"
        }
    ]

    return {
        "summary": summary,
        "keyPoints": key_points,
        "codeSnippet": code_snippet,
        "problems": problems,
        "resources": resources
    }

new_curriculum = {"domains": []}

for domain in curriculum["domains"]:
    new_domain = {"id": domain["id"], "name": domain["name"], "levels": []}
    for level in domain["levels"]:
        new_level = {"level": level["level"], "topics": []}
        for topic in level["topics"]:
            subtopics_str = topic["subtopics"]
            sub_list = [s.strip() for s in subtopics_str.split(",") if s.strip()]
            new_subtopics = []
            for idx, sub in enumerate(sub_list):
                details = get_detailed_concept(domain["id"], topic["topic"], sub, level["level"])
                new_subtopics.append({
                    "id": f"{domain['id']}__{level['level'].replace(' ', '')}__{topic['topic'].replace(' ', '')}__{idx}",
                    "name": sub,
                    "summary": details["summary"],
                    "keyPoints": details["keyPoints"],
                    "codeSnippet": details["codeSnippet"],
                    "problems": details["problems"],
                    "resources": details["resources"]
                })
            new_level["topics"].append({
                "topic": topic["topic"],
                "subtopics": new_subtopics
            })
        new_domain["levels"].append(new_level)
    new_curriculum["domains"].append(new_domain)

js_content = f"const curriculumData = {json.dumps(new_curriculum, indent=2)};\n"

with open("/Users/chandanmanne/Desktop/placement_prep/todo_pre_placement.github.io/data.js", "w") as f:
    f.write(js_content)

print(f"Successfully generated rich data.js with {len(new_curriculum['domains'])} domains.")
