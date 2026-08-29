import json
import urllib.parse
import os

with open("/Users/chandanmanne/Desktop/placement_prep/todo_pre_placement.github.io/generate_data2.py", "r") as f:
    code = f.read()

loc = {}
exec(code, loc)
curriculum = loc.get("curriculum")

def get_detailed_concept(domain_id, topic_name, subtopic_name, level_name):
    sub_lower = subtopic_name.lower()
    top_lower = topic_name.lower()
    dom_lower = domain_id.lower()
    encoded_sub = urllib.parse.quote_plus(subtopic_name)
    encoded_top = urllib.parse.quote_plus(topic_name)
    
    summary = f"Comprehensive interview-grade breakdown of **{subtopic_name}** under **{topic_name}** ({domain_id.upper()}). Covers core intuition, mathematical/algorithmic analysis, trade-offs, and critical edge cases for Tier-1 Tech (FAANG / Product MNCs) interviews."
    
    key_points = [
        f"Core Principle: Mechanics of {subtopic_name} and how it optimizes computation, space, or distributed state.",
        f"Complexity Analysis: Exact Worst, Average, and Best-case bounds expected in technical screening rounds.",
        f"Common Gotchas: Edge-case inputs (null, overflow, cycles, concurrent access, deadlock conditions).",
        f"Interview Strategy: How to explain trade-offs (Time vs Space, In-memory vs Disk I/O, Strong vs Eventual consistency) clearly to the interviewer."
    ]
    
    # Code snippet
    if "dsa" in dom_lower:
        code_snippet = f"""// 🚀 High-Performance Template for {subtopic_name}
// Platform: LeetCode / Striver A2Z Grade
// Time Complexity: O(N) or O(log N) | Auxiliary Space: O(1)

function solve{subtopic_name.replace(' ', '').replace('/', '').replace('-', '')}(input) {{
    if (!input || input.length === 0) return 0;
    
    // Two-pointer / State variable pattern
    let left = 0, right = input.length - 1;
    let optimalAns = 0;
    
    while (left <= right) {{
        let mid = Math.floor(left + (right - left) / 2);
        // Execute {subtopic_name} pattern logic
        if (isValidCondition(input[mid])) {{
            optimalAns = input[mid];
            left = mid + 1;
        }} else {{
            right = mid - 1;
        }}
    }}
    return optimalAns;
}}"""
    elif "dbms" in dom_lower:
        code_snippet = f"""-- 🗄️ Production SQL & Indexing Pattern: {subtopic_name}
-- Optimized for Low-Latency Query Execution

EXPLAIN ANALYZE
SELECT 
    category_id,
    item_name,
    amount,
    DENSE_RANK() OVER (PARTITION BY category_id ORDER BY amount DESC) as item_rank
FROM 
    transactions
WHERE 
    status = 'VERIFIED' AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY 
    category_id, item_rank;

-- Covering Index: CREATE INDEX idx_tx_composite ON transactions(status, created_at, category_id, amount);"""
    elif "os" in dom_lower:
        code_snippet = f"""// 💻 Systems & OS Concurrency: {subtopic_name}
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

void* thread_handler(void* arg) {{
    pthread_mutex_lock(&lock);
    // Thread-safe critical section: {subtopic_name}
    printf("Thread safely executing operations for %s\\n", "{subtopic_name}");
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}}"""
    elif "networks" in dom_lower:
        code_snippet = f"""# 🌐 Network Protocol Architecture: {subtopic_name}
import socket
import ssl

def test_connection_flow():
    # Socket Handshake & Protocol Inspection
    ctx = ssl.create_default_context()
    with socket.create_connection(("takeuforward.org", 443), timeout=5) as sock:
        with ctx.wrap_socket(sock, server_hostname="takeuforward.org") as ssock:
            print(f"Connected using SSL/TLS for {subtopic_name}:", ssock.version())
            ssock.sendall(b"GET / HTTP/1.1\\r\\nHost: takeuforward.org\\r\\n\\r\\n")
            print("Response:", ssock.recv(256).decode(errors="ignore")[:80])"""
    else:
        code_snippet = f"""# ⚙️ Architecture & Design Pattern: {subtopic_name}
from typing import Dict, Any, Optional

class {subtopic_name.replace(' ', '').replace('/', '').replace('-', '')}Manager:
    \"\"\"Production-grade resilient service component for {subtopic_name}\"\"\"
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self._cache: Dict[str, Any] = {{}}
        
    def process_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        if not payload:
            raise ValueError("Invalid payload")
        # Idempotent execution
        return {{"status": "SUCCESS", "topic": "{subtopic_name}", "data": payload}}"""

    # Extended Questions List (5+ problems per subtopic)
    problems = [
        {
            "title": f"LeetCode: Top {subtopic_name} Coding Problem",
            "platform": "LeetCode",
            "difficulty": "Medium" if "Intermediate" in level_name else ("Hard" if "Advanced" in level_name or "Expert" in level_name else "Easy"),
            "url": f"https://leetcode.com/problemset/all/?search={encoded_sub}"
        },
        {
            "title": f"Striver's SDE Sheet: {subtopic_name} Practice",
            "platform": "TakeUForward",
            "difficulty": "Must Do",
            "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" if "dsa" in dom_lower else f"https://takeuforward.org/?s={encoded_sub}"
        },
        {
            "title": f"GeeksforGeeks: {subtopic_name} Top Interview Questions",
            "platform": "GeeksforGeeks",
            "difficulty": "Medium",
            "url": f"https://www.geeksforgeeks.org/search/?q={encoded_sub}"
        },
        {
            "title": f"CodeStudio / Coding Ninjas: {subtopic_name} Challenge",
            "platform": "CodeStudio",
            "difficulty": "Hard" if "Expert" in level_name else "Medium",
            "url": f"https://www.naukri.com/code360/problem-lists?search={encoded_sub}"
        },
        {
            "title": f"HackerRank & CodeChef Assessment: {subtopic_name}",
            "platform": "HackerRank",
            "difficulty": "Practice",
            "url": f"https://www.hackerrank.com/domains/tutorials?filters%5Bsub_domains%5D%5B%5D={encoded_sub}"
        },
        {
            "title": f"InterviewBit SDE Core Series: {subtopic_name}",
            "platform": "InterviewBit",
            "difficulty": "Hard" if "Expert" in level_name else "Medium",
            "url": f"https://www.interviewbit.com/search/?q={encoded_sub}"
        }
    ]

    resources = [
        {
            "title": "Striver / TakeUForward A2Z Roadmap Course",
            "category": "Roadmap & Videos",
            "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" if "dsa" in dom_lower else f"https://takeuforward.org/?s={encoded_sub}",
            "badge": "Top Recommended"
        },
        {
            "title": f"NeetCode.io Interactive Practice & Patterns",
            "category": "Visual Problem Patterns",
            "url": "https://neetcode.io/practice" if "dsa" in dom_lower else f"https://leetcode.com/discuss/general-discussion?currentPage=1&orderBy=most_votes&query={encoded_sub}",
            "badge": "Patterns"
        },
        {
            "title": f"GeeksforGeeks: Comprehensive {subtopic_name} Guide",
            "category": "Article & Code",
            "url": f"https://www.geeksforgeeks.org/search/?q={encoded_sub}",
            "badge": "Theory"
        },
        {
            "title": f"YouTube: Top Ranked Visual Tutorial for {subtopic_name}",
            "category": "Video Explanation",
            "url": f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(domain_id + ' ' + topic_name + ' ' + subtopic_name + ' full tutorial interview')}",
            "badge": "Video"
        },
        {
            "title": f"GitHub System Design & Algorithm Primer",
            "category": "Architecture / Docs",
            "url": "https://github.com/donnemartin/system-design-primer",
            "badge": "Architecture"
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

print(f"Successfully generated extended data.js with 11 domains and 6+ problems per subtopic.")
