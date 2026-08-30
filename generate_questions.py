import json

# Expansive ALAE v3.0 Question Bank covering all 11 Domains and Major Patterns
questions = [
    # 1. DSA - Two Pointers & Sliding Window
    {
        "id": "dsa_mcq_1",
        "domain": "dsa",
        "topic": "Arrays & Two Pointers",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 15,
        "questionText": "Given a sorted array of integers, which algorithmic technique allows finding two numbers that sum up to a target value in O(n) time and O(1) auxiliary space?",
        "options": [
            "Binary Search on all pairs",
            "Two-Pointer Approach (Left & Right pointers moving inward)",
            "Hash Map storing complementary values",
            "Divide and Conquer with QuickSelect"
        ],
        "correctIndex": 1,
        "explanation": "The Two-Pointer approach takes advantage of the sorted property: by placing one pointer at the start (left) and one at the end (right), we can adjust pointers inward in O(n) time without allocating extra memory, achieving O(1) auxiliary space.",
        "aiHint": "Notice the array is already sorted. Can you eliminate pairs systematically without allocating an extra hash table?"
    },
    {
        "id": "dsa_mcq_2",
        "domain": "dsa",
        "topic": "Sliding Window Pattern",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 20,
        "questionText": "When finding the longest substring without repeating characters, what data structure guarantees O(1) amortized window boundary updates?",
        "options": [
            "Hash Map / Direct Addressing Table storing character indices",
            "Binary Search Tree",
            "Min-Heap",
            "Monotonic Deque"
        ],
        "correctIndex": 0,
        "explanation": "A Hash Map storing character last-seen indices allows jumping the left pointer directly past the duplicate character in O(1) time.",
        "aiHint": "Think about how to immediately skip past previously seen duplicates rather than incrementing one index at a time."
    },
    {
        "id": "dsa_mcq_3",
        "domain": "dsa",
        "topic": "Dynamic Programming",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Medium",
        "points": 20,
        "questionText": "What is the minimum number of states required to solve the 0/1 Knapsack Problem with capacity W and N items?",
        "options": [
            "O(N)",
            "O(W)",
            "O(N * W)",
            "O(2^N)"
        ],
        "correctIndex": 2,
        "explanation": "The 0/1 Knapsack subproblem is defined by two variables: the item index i (from 1 to N) and the remaining capacity w (from 0 to W). Thus, the state space table requires O(N * W) distinct subproblems.",
        "aiHint": "Think about what parameters uniquely define each recursive decision: which item we are on, and how much weight capacity is remaining."
    },
    {
        "id": "dsa_mcq_4",
        "domain": "dsa",
        "topic": "Monotonic Stack Pattern",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Hard",
        "points": 25,
        "questionText": "What is the amortized time complexity of finding the Next Greater Element for all N elements in an array using a Monotonic Decreasing Stack?",
        "options": [
            "O(N^2)",
            "O(N log N)",
            "O(N)",
            "O(1)"
        ],
        "correctIndex": 2,
        "explanation": "Every element is pushed onto the stack exactly once and popped at most once across the entire traversal, resulting in 2N operations and O(N) linear time.",
        "aiHint": "Analyze the aggregate number of push and pop operations across all loop iterations."
    },
    {
        "id": "dsa_mcq_5",
        "domain": "dsa",
        "topic": "Binary Search on Answer",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Medium",
        "points": 20,
        "questionText": "In 'Koko Eating Bananas' and 'Capacity to Ship Packages Within D Days', what mathematical property allows using Binary Search on the answer space?",
        "options": [
            "The input array is guaranteed to be strictly increasing",
            "Monotonicity of the feasibility predicate function f(x)",
            "Hash collisions are uniformly distributed",
            "The search space is bounded by the Fibonacci series"
        ],
        "correctIndex": 1,
        "explanation": "If a speed/capacity x is feasible, any speed > x is also feasible (monotonic boolean predicate). This binary partition enables O(log(Max-Min)) search.",
        "aiHint": "If a candidate answer works, will all larger candidate answers also work?"
    },

    # Coding Challenges
    {
        "id": "dsa_coding_1",
        "domain": "dsa",
        "topic": "Arrays & Hashing",
        "type": "coding",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 40,
        "questionText": "Two Sum: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you cannot use the same element twice. Return the indices sorted in ascending order.",
        "functionName": "twoSum",
        "starterCode": "function twoSum(nums, target) {\n    // Write your O(n) hash map solution here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
        "testCases": [
            { "input": "[[2,7,11,15], 9]", "expected": "[0,1]", "isHidden": False },
            { "input": "[[3,2,4], 6]", "expected": "[1,2]", "isHidden": False },
            { "input": "[[3,3], 6]", "expected": "[0,1]", "isHidden": True },
            { "input": "[[-1,-2,-3,-4,-5], -8]", "expected": "[2,4]", "isHidden": True }
        ],
        "complexity": "O(n) Time | O(n) Space",
        "aiHint": "Store previously seen numbers in a Map as { value => index }. For the current number, check if (target - num) exists in your map."
    },
    {
        "id": "dsa_coding_2",
        "domain": "dsa",
        "topic": "Sliding Window",
        "type": "coding",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 40,
        "questionText": "Longest Substring Without Repeating Characters: Given a string `s`, find the length of the longest substring without duplicate characters.",
        "functionName": "lengthOfLongestSubstring",
        "starterCode": "function lengthOfLongestSubstring(s) {\n    let map = new Map();\n    let maxLen = 0;\n    let left = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (map.has(s[right]) && map.get(s[right]) >= left) {\n            left = map.get(s[right]) + 1;\n        }\n        map.set(s[right], right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
        "testCases": [
            { "input": "[\"abcabcbb\"]", "expected": "3", "isHidden": False },
            { "input": "[\"bbbbb\"]", "expected": "1", "isHidden": False },
            { "input": "[\"pwwkew\"]", "expected": "3", "isHidden": False },
            { "input": "[\"\"]", "expected": "0", "isHidden": True },
            { "input": "[\"dvdf\"]", "expected": "3", "isHidden": True }
        ],
        "complexity": "O(n) Time | O(min(m, n)) Space",
        "aiHint": "Use a sliding window [left, right]. Maintain a hash map of the last observed position of each character. When a duplicate is seen within the window, jump `left` to lastPosition + 1."
    },
    {
        "id": "dsa_coding_3",
        "domain": "dsa",
        "topic": "Interval Merging",
        "type": "coding",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 40,
        "questionText": "Merge Intervals: Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        "functionName": "mergeIntervals",
        "starterCode": "function mergeIntervals(intervals) {\n    if (!intervals || intervals.length <= 1) return intervals;\n    intervals.sort((a, b) => a[0] - b[0]);\n    const res = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const last = res[res.length - 1];\n        const curr = intervals[i];\n        if (curr[0] <= last[1]) {\n            last[1] = Math.max(last[1], curr[1]);\n        } else {\n            res.push(curr);\n        }\n    }\n    return res;\n}",
        "testCases": [
            { "input": "[[[1,3],[2,6],[8,10],[15,18]]]", "expected": "[[1,6],[8,10],[15,18]]", "isHidden": False },
            { "input": "[[[1,4],[4,5]]]", "expected": "[[1,5]]", "isHidden": False },
            { "input": "[[[1,4],[0,4]]]", "expected": "[[0,4]]", "isHidden": True }
        ],
        "complexity": "O(n log n) Time | O(n) Space",
        "aiHint": "Sort intervals by their start times first. Then iterate through and merge whenever current start <= previous end."
    },

    # 2. DBMS & SQL
    {
        "id": "dbms_mcq_1",
        "domain": "dbms",
        "topic": "Indexing & Storage Engines",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 15,
        "questionText": "Why do relational database engines (PostgreSQL, MySQL InnoDB) use B+ Trees instead of Binary Search Trees for on-disk indices?",
        "options": [
            "B+ Trees have strict O(1) hash lookup guarantees",
            "B+ Trees have high fan-out, reducing disk page I/O seeks, and all values reside in linked leaf pages for fast range scans",
            "B+ Trees consume zero memory when cached in RAM",
            "Binary Search Trees cannot support unique keys"
        ],
        "correctIndex": 1,
        "explanation": "B+ Trees have a high branching factor (fan-out of hundreds per node), keeping tree depth small (typically 3-4 levels for billions of records). This minimizes slow disk seeks. Furthermore, linked leaf pages enable sequential range scans.",
        "aiHint": "Consider the physical cost of disk I/O compared to CPU instructions and how tree branching factor influences disk seeks."
    },
    {
        "id": "dbms_mcq_2",
        "domain": "dbms",
        "topic": "Transaction Isolation & Concurrency",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Hard",
        "points": 20,
        "questionText": "Under Snapshot Isolation (MVCC), which concurrency anomaly can occur that is prevented under Strict Serializable isolation?",
        "options": [
            "Dirty Read (Read Uncommitted)",
            "Dirty Write",
            "Write Skew (e.g., On-call doctor scheduling conflict)",
            "Non-repeatable Read"
        ],
        "correctIndex": 2,
        "explanation": "Write Skew occurs when two transactions read overlapping data sets, make disjoint modifications based on stale premises, and commit without lock conflicts. Snapshot isolation detects write-write conflicts on the exact same row, but misses semantic write skew across distinct rows.",
        "aiHint": "Think of a scenario where two doctors try to take leave at the same time: both check count >= 2, and both update their own row."
    },

    # 3. Operating Systems
    {
        "id": "os_mcq_1",
        "domain": "os",
        "topic": "Process & Memory Management",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 15,
        "questionText": "What is the primary role of the Translation Lookaside Buffer (TLB) in CPU virtual memory management?",
        "options": [
            "To store kernel syscall handler addresses",
            "To cache recent Virtual Page Number to Physical Frame Number translations, avoiding multi-level page table traversals",
            "To buffer writes directly to NVMe SSDs",
            "To manage thread scheduling priorities in the CFS queue"
        ],
        "correctIndex": 1,
        "explanation": "The TLB is a high-speed hardware cache located on the CPU MMU. It stores recently translated virtual-to-physical page mappings, reducing page table walk overhead from multiple memory accesses to ~1 clock cycle.",
        "aiHint": "Think about how a 4-level page table requires 4 memory lookups for every single memory read unless accelerated."
    },
    {
        "id": "os_mcq_2",
        "domain": "os",
        "topic": "Deadlocks & Synchronization",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Hard",
        "points": 20,
        "questionText": "Which of the following is NOT one of the four necessary Coffman conditions for a deadlock to occur?",
        "options": [
            "Mutual Exclusion",
            "Hold and Wait",
            "Preemption Allowed",
            "Circular Wait"
        ],
        "correctIndex": 2,
        "explanation": "The four Coffman conditions are: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption (resources CANNOT be preempted), and 4) Circular Wait. If preemption is allowed, deadlocks cannot persist.",
        "aiHint": "Can a deadlock survive if the OS can forcefully take a locked resource away from a process?"
    },

    # 4. Computer Networks
    {
        "id": "net_mcq_1",
        "domain": "networks",
        "topic": "Transport Layer & Flow Control",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 15,
        "questionText": "In TCP congestion control, what triggers the Fast Retransmit algorithm?",
        "options": [
            "Expiration of the Retransmission Timeout (RTO) timer",
            "Receipt of 3 duplicate ACKs for the same sequence number",
            "DNS lookup TTL expiry",
            "A TCP RST packet received from the gateway"
        ],
        "correctIndex": 1,
        "explanation": "When 3 duplicate ACKs arrive at the sender, it infers that a single segment was dropped while subsequent packets arrived out of order, triggering Fast Retransmit without waiting for the slow RTO timer.",
        "aiHint": "How does a receiver notify the sender that a specific missing packet has created a gap while newer packets keep arriving?"
    },
    {
        "id": "net_mcq_2",
        "domain": "networks",
        "topic": "Application Layer & HTTP",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 15,
        "questionText": "What key enhancement in HTTP/2 eliminates Head-of-Line (HoL) blocking at the application layer compared to HTTP/1.1?",
        "options": [
            "UDP transport encapsulation (QUIC)",
            "Binary framing and stream multiplexing over a single TCP connection",
            "TLS 1.3 0-RTT handshakes",
            "GZIP compression of static payloads"
        ],
        "correctIndex": 1,
        "explanation": "HTTP/2 breaks messages into independent binary frames and interleaves them across streams over a single TCP connection, allowing concurrent requests and responses without blocking one another.",
        "aiHint": "Think about how HTTP/2 divides streams into independent binary frames."
    },

    # 5. System Design
    {
        "id": "sys_design_1",
        "domain": "backend",
        "topic": "Distributed Caching & Sharding",
        "type": "system_design",
        "difficulty": 3,
        "difficultyLabel": "Staff SDE",
        "points": 40,
        "questionText": "Design a Distributed Rate Limiting System for a Tier-1 API Gateway supporting 1,000,000 requests/sec with multi-region replication. Detail: 1) Algorithm (Token Bucket vs Sliding Window Counter), 2) Storage layer & Redis cluster synchronization, 3) Race condition handling (Lua scripts vs Redis transactions), 4) Degradation strategy when the cache cluster fails.",
        "criteria": [
            "Algorithmic precision: Sliding window counter via Redis Sorted Set (ZSET) or Atomic Token Bucket.",
            "Atomic execution: Lua scripts to prevent Check-Then-Act race conditions.",
            "Multi-region synchronization: Local in-memory token buffers with asynchronous central reconciliation.",
            "Resilience & Fallback: Fail-open / Local IP rate limiter on Redis partition."
        ],
        "tradeoffs": "Centralized Redis ensures strict accuracy across all nodes but incurs network latency (~1-2ms). Local in-memory token buckets provide sub-millisecond latency but may allow slight request bursting across edge servers."
    },
    {
        "id": "sys_design_2",
        "domain": "backend",
        "topic": "High-Throughput Distributed Storage",
        "type": "system_design",
        "difficulty": 3,
        "difficultyLabel": "Staff SDE",
        "points": 40,
        "questionText": "Design a Distributed URL Shortener (e.g. TinyURL) serving 10 billion links with 100:1 Read-to-Write ratio. Explain: 1) Base62 encoding strategy and unique ID generator (Snowflake / Range Allocation), 2) Database schema and partition key, 3) Caching strategy (LRU Redis 80/20 rule), 4) Handling 301 Permanent vs 302 Temporary redirects for analytics.",
        "criteria": [
            "ID Generation: Distributed sequence generator (Twitter Snowflake or Range Worker allocation).",
            "Storage Engine: NoSQL Key-Value store (Cassandra / DynamoDB) partitioned by hash(short_key).",
            "Redirect Semantics: 302 Temporary Redirect to enable click analytics collection on the server.",
            "Caching: Redis cluster storing top 20% most active URLs to handle 80% read volume."
        ],
        "tradeoffs": "301 Permanent Redirects allow browser-side caching (reducing server load) but make click tracking impossible. 302 redirects hit the server each time, enabling real-time analytics at the cost of additional server bandwidth."
    },

    # 6. Cybersecurity & CTF
    {
        "id": "sec_mcq_1",
        "domain": "security",
        "topic": "Web Application Security (OWASP Top 10)",
        "type": "mcq",
        "difficulty": 2,
        "difficultyLabel": "Medium",
        "points": 20,
        "questionText": "What is the most robust defense against Stored Cross-Site Scripting (XSS) vulnerabilities?",
        "options": [
            "Blacklisting `<script>` tags in user inputs",
            "Context-aware output encoding (HTML, JavaScript, CSS entities) and strict Content Security Policy (CSP)",
            "Using MD5 hashing on input parameters",
            "Storing user inputs as binary BLOBs"
        ],
        "correctIndex": 1,
        "explanation": "Context-aware output encoding guarantees that untrusted input is treated as text rather than executable script when rendered by the browser. Strict CSP provides defense-in-depth by restricting script sources.",
        "aiHint": "Think about why input blacklists fail and why output rendering context dictates encoding rules."
    },
    {
        "id": "sec_mcq_2",
        "domain": "security",
        "topic": "Cryptographic Protocols",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Hard",
        "points": 20,
        "questionText": "What property of Ephemeral Diffie-Hellman (ECDHE) ensures that past encrypted sessions remain secure even if the server's long-term private key is compromised in the future?",
        "options": [
            "Zero-Knowledge Proofs",
            "Perfect Forward Secrecy (PFS)",
            "Homomorphic Encryption",
            "Quantum Key Distribution"
        ],
        "correctIndex": 1,
        "explanation": "Perfect Forward Secrecy generates unique, short-lived session keys for every handshake. If the server's long-term certificate private key is leaked later, adversaries still cannot decrypt previously recorded traffic.",
        "aiHint": "What term describes the security property where past traffic remains safe if the private master key is exposed later?"
    },

    # 7. AI & Machine Learning
    {
        "id": "aiml_mcq_1",
        "domain": "aiml",
        "topic": "Transformers & Attention Mechanism",
        "type": "mcq",
        "difficulty": 3,
        "difficultyLabel": "Hard",
        "points": 20,
        "questionText": "What is the computational complexity of the Scaled Dot-Product Attention mechanism with respect to sequence length N and embedding dimension D?",
        "options": [
            "O(N * D)",
            "O(N^2 * D)",
            "O(N * D^2)",
            "O(N^3)"
        ],
        "correctIndex": 1,
        "explanation": "Computing the Q * K^T matrix multiplication requires O(N^2 * D) operations, and multiplying the resulting N x N attention matrix by V requires another O(N^2 * D), making standard full self-attention quadratic O(N^2 * D) in sequence length.",
        "aiHint": "Consider the size of the attention weight matrix (Query x Key) for a sequence of length N."
    },

    # 8. Behavioral & Leadership
    {
        "id": "beh_1",
        "domain": "dsa",
        "topic": "Engineering Leadership & Technical Conflict",
        "type": "behavioral",
        "difficulty": 2,
        "difficultyLabel": "FAANG Bar Raiser",
        "points": 30,
        "questionText": "Tell me about a time you disagreed with a senior engineer or product manager on a technical architecture decision (e.g. database choice, microservices vs monolith, refactoring priority). How did you present your case, analyze trade-offs, and reach alignment?",
        "starFramework": [
            "Situation: Context of the technical disagreement and the stakes involved.",
            "Task: Your objective to reach the most optimal, scalable, and risk-managed outcome.",
            "Action: Specific prototypes, benchmarks, data-driven trade-off matrices you presented.",
            "Result: The outcome, post-launch performance, and team trust established."
        ]
    }
]

js_code = f"""/**
 * Autonomous Learning & Assessment Engine (ALAE v3.0)
 * Comprehensive Multi-Format Question Bank across 11 Engineering Domains
 * MCQs, In-Browser Live Coding Challenges, System Design Scenarios, & Behavioral Interviews
 */

const QUESTION_BANK = {json.dumps(questions, indent=4)};

// Expose on global window object
if (typeof window !== 'undefined') {{
    window.QUESTION_BANK = QUESTION_BANK;
}}
"""

with open("/Users/chandanmanne/Desktop/placement_prep/todo_pre_placement.github.io/questions.js", "w") as f:
    f.write(js_code)

print(f"✅ Successfully wrote {len(questions)} multi-format questions into questions.js!")
