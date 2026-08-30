/**
 * Autonomous Learning & Assessment Engine (ALAE v3.0)
 * Comprehensive Multi-Format Question Bank across 11 Engineering Domains
 * MCQs, In-Browser Live Coding Challenges, System Design Scenarios, & Behavioral Interviews
 */

const QUESTION_BANK = [
    // ==========================================
    // 1. DATA STRUCTURES & ALGORITHMS (DSA)
    // ==========================================
    {
        id: 'dsa_mcq_1',
        domain: 'dsa',
        topic: 'Arrays & Two Pointers',
        type: 'mcq',
        difficulty: 2,
        difficultyLabel: 'Medium',
        points: 15,
        questionText: 'Given a sorted array of integers, which algorithmic technique allows finding two numbers that sum up to a target value in O(n) time and O(1) auxiliary space?',
        options: [
            'Binary Search on all pairs',
            'Two-Pointer Approach (Left & Right pointers moving inward)',
            'Hash Map storing complementary values',
            'Divide and Conquer with QuickSelect'
        ],
        correctIndex: 1,
        explanation: 'The Two-Pointer approach takes advantage of the sorted property: by placing one pointer at the start (left) and one at the end (right), we can adjust pointers inward in O(n) time without allocating extra memory, achieving O(1) auxiliary space.',
        aiHint: 'Notice the array is already sorted. Can you eliminate pairs systematically without allocating an extra hash table?'
    },
    {
        id: 'dsa_mcq_2',
        domain: 'dsa',
        topic: 'Dynamic Programming',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'What is the minimum number of states required to solve the 0/1 Knapsack Problem with capacity W and N items?',
        options: [
            'O(N)',
            'O(W)',
            'O(N * W)',
            'O(2^N)'
        ],
        correctIndex: 2,
        explanation: 'The 0/1 Knapsack subproblem is defined by two variables: the item index i (from 1 to N) and the remaining capacity w (from 0 to W). Thus, the state space table requires O(N * W) distinct subproblems (which can be space-optimized to O(W) using a 1D rolling array).',
        aiHint: 'Think about what parameters uniquely define each recursive decision: which item we are on, and how much weight capacity is remaining.'
    },
    {
        id: 'dsa_coding_1',
        domain: 'dsa',
        topic: 'Arrays & Hashing',
        type: 'coding',
        difficulty: 2,
        difficultyLabel: 'Medium',
        points: 40,
        questionText: 'Two Sum: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you cannot use the same element twice. Return the indices sorted in ascending order.',
        functionName: 'twoSum',
        starterCode: `function twoSum(nums, target) {
    // Write your O(n) solution here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        testCases: [
            { input: '[[2, 7, 11, 15], 9]', expected: '[0, 1]', isHidden: false },
            { input: '[[3, 2, 4], 6]', expected: '[1, 2]', isHidden: false },
            { input: '[[3, 3], 6]', expected: '[0, 1]', isHidden: false },
            { input: '[[-1, -2, -3, -4, -5], -8]', expected: '[2, 4]', isHidden: true },
            { input: '[[100, 200, 300, 400, 500], 700]', expected: '[1, 4]', isHidden: true }
        ],
        complexity: 'Time: O(n), Space: O(n)',
        aiHint: 'Use a Hash Map to store elements and their indices as you iterate. Check if (target - current_element) exists in the map.'
    },
    {
        id: 'dsa_coding_2',
        domain: 'dsa',
        topic: 'Strings & Two Pointers',
        type: 'coding',
        difficulty: 1,
        difficultyLabel: 'Easy',
        points: 25,
        questionText: 'Valid Palindrome: A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Implement `isPalindrome(s)` returning `true` or `false`.',
        functionName: 'isPalindrome',
        starterCode: `function isPalindrome(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
        testCases: [
            { input: '["A man, a plan, a canal: Panama"]', expected: 'true', isHidden: false },
            { input: '["race a car"]', expected: 'false', isHidden: false },
            { input: '[" "]', expected: 'true', isHidden: false },
            { input: '["0P"]', expected: 'false', isHidden: true },
            { input: '["ab_a"]', expected: 'true', isHidden: true }
        ],
        complexity: 'Time: O(n), Space: O(1)',
        aiHint: 'Sanitize the string first by removing non-alphanumeric characters, then compare characters from both ends moving inward.'
    },
    {
        id: 'dsa_coding_3',
        domain: 'dsa',
        topic: 'Binary Trees',
        type: 'coding',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 45,
        questionText: 'Max Subarray Sum (Kadane\'s Algorithm): Given an integer array `nums`, find the subarray with the largest sum, and return its sum. Implement `maxSubArray(nums)`.',
        functionName: 'maxSubArray',
        starterCode: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currMax);
    }
    return maxSoFar;
}`,
        testCases: [
            { input: '[[-2, 1, -3, 4, -1, 2, 1, -5, 4]]', expected: '6', isHidden: false },
            { input: '[[1]]', expected: '1', isHidden: false },
            { input: '[[5, 4, -1, 7, 8]]', expected: '23', isHidden: false },
            { input: '[[-1, -2, -3, -4]]', expected: '-1', isHidden: true },
            { input: '[[10, -3, 4, -1, 2, 1, -5, 4]]', expected: '13', isHidden: true }
        ],
        complexity: 'Time: O(n), Space: O(1)',
        aiHint: 'At each position, decide whether to start a new subarray or extend the current subarray: `curr = Math.max(nums[i], curr + nums[i])`.'
    },

    // ==========================================
    // 2. DATABASE MANAGEMENT SYSTEMS (DBMS)
    // ==========================================
    {
        id: 'dbms_mcq_1',
        domain: 'dbms',
        topic: 'Indexing & B-Trees',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'Why are B+ Trees predominantly chosen over Red-Black Trees or Hash Indexes for relational database storage engines (like InnoDB)?',
        options: [
            'B+ Trees have O(1) worst-case lookup time compared to Red-Black Trees',
            'B+ Trees have high fan-out, minimizing expensive disk I/O operations, and leaf node chaining enables fast range scans',
            'B+ Trees require zero locking during concurrent writes',
            'B+ Trees store all data keys in internal root nodes to save memory'
        ],
        correctIndex: 1,
        explanation: 'Because disk reads are orders of magnitude slower than RAM, B+ Trees store hundreds/thousands of keys per page (high fan-out), requiring very few disk seeks (typically 3-4 levels). Furthermore, all actual records/pointers reside in linked leaf nodes, enabling rapid O(log N + k) range queries.',
        aiHint: 'Consider the physical disk page layout: what data structure minimizes disk block fetches while supporting range queries (`WHERE age BETWEEN 20 AND 30`)?'
    },
    {
        id: 'dbms_mcq_2',
        domain: 'dbms',
        topic: 'Transactions & ACID',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'Which transaction isolation anomaly is prevented by `REPEATABLE READ` but allowed under `READ COMMITTED` in standard SQL?',
        options: [
            'Dirty Read',
            'Non-Repeatable Read (Fuzzy Read)',
            'Phantom Read',
            'Lost Update'
        ],
        correctIndex: 1,
        explanation: '`READ COMMITTED` prevents Dirty Reads (reading uncommitted data), but permits Non-Repeatable Reads (reading row X, then another committed transaction modifies row X, and reading row X again gives a different value). `REPEATABLE READ` uses MVCC snapshot reads to ensure repeated reads of the same row return identical values.',
        aiHint: 'Think about what happens when another transaction modifies and commits an existing row while your transaction is still running.'
    },

    // ==========================================
    // 3. OPERATING SYSTEMS (OS)
    // ==========================================
    {
        id: 'os_mcq_1',
        domain: 'os',
        topic: 'Concurrency & Deadlocks',
        type: 'mcq',
        difficulty: 2,
        difficultyLabel: 'Medium',
        points: 15,
        questionText: 'Which of the following is NOT one of Coffman\'s four necessary conditions for a deadlock to occur?',
        options: [
            'Mutual Exclusion',
            'Hold and Wait',
            'Preemption Allowed',
            'Circular Wait'
        ],
        correctIndex: 2,
        explanation: 'The 4 Coffman conditions are: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption (resources cannot be forcibly confiscated), and 4) Circular Wait. "Preemption Allowed" would actually break condition #3 and prevent deadlocks!',
        aiHint: 'If the operating system is allowed to forcibly preempt (take back) a resource from a thread, can a deadlock persist?'
    },
    {
        id: 'os_mcq_2',
        domain: 'os',
        topic: 'Virtual Memory & Paging',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'What is "Thrashing" in an operating system virtual memory subsystem?',
        options: [
            'When two threads corrupt shared memory via a race condition',
            'A state where the CPU spends more time swapping pages in and out of disk than executing useful user processes',
            'When the Translation Lookaside Buffer (TLB) cache is completely wiped on context switch',
            'Hardware memory controller overheating due to excessive memory bus frequency'
        ],
        correctIndex: 1,
        explanation: 'Thrashing occurs when the active working set of all running processes exceeds physical RAM capacity. The OS page replacement algorithm constantly causes page faults, spending virtually 100% of I/O time swapping pages to/from swap space while CPU utilization plummets toward 0%.',
        aiHint: 'What happens to system performance when the combined memory demand of processes exceeds available physical RAM?'
    },

    // ==========================================
    // 4. COMPUTER NETWORKS (CN)
    // ==========================================
    {
        id: 'net_mcq_1',
        domain: 'networks',
        topic: 'TCP/IP & Transport Layer',
        type: 'mcq',
        difficulty: 2,
        difficultyLabel: 'Medium',
        points: 15,
        questionText: 'In the TCP 3-Way Handshake, what flags are sent in sequence between Client (C) and Server (S)?',
        options: [
            'C: SYN → S: ACK → C: FIN',
            'C: SYN → S: SYN-ACK → C: ACK',
            'C: ACK → S: SYN → C: SYN-ACK',
            'C: PING → S: PONG → C: ACK'
        ],
        correctIndex: 1,
        explanation: 'TCP connection establishment: 1) Client sends SYN (with Initial Sequence Number), 2) Server replies with SYN-ACK (acknowledging client ISN and sending server ISN), 3) Client sends ACK confirming server ISN. The connection is then ESTABLISHED.',
        aiHint: 'Remember: SYNchronize, SYNchronize-ACKnowledge, ACKnowledge.'
    },
    {
        id: 'net_mcq_2',
        domain: 'networks',
        topic: 'HTTP Protocols',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'What is the primary breakthrough of HTTP/2 over HTTP/1.1 that solved the Head-of-Line (HoL) blocking problem at the application layer?',
        options: [
            'Switching from TCP to UDP',
            'Binary Framing & Multiplexing multiple bidirectional streams over a single TCP connection',
            'Deprecating SSL/TLS encryption for higher throughput',
            'Replacing JSON payload format with XML'
        ],
        correctIndex: 1,
        explanation: 'HTTP/2 introduced binary framing where requests and responses are split into independent frames interleaved over a single persistent TCP connection (Multiplexing). This eliminates HTTP/1.1 pipeline head-of-line blocking.',
        aiHint: 'How does HTTP/2 send 50 images concurrently over 1 TCP connection without waiting for each image to finish sequentially?'
    },

    // ==========================================
    // 5. SYSTEM DESIGN & ARCHITECTURE
    // ==========================================
    {
        id: 'sys_design_1',
        domain: 'backend',
        topic: 'Distributed Systems & Caching',
        type: 'system_design',
        difficulty: 4,
        difficultyLabel: 'Hard',
        points: 50,
        questionText: 'Design a Distributed Rate Limiter: Your microservices receive 100,000 requests/sec. Design a scalable rate limiter that limits each user to 100 requests/minute. Analyze the trade-offs between Token Bucket, Sliding Window Log, and Sliding Window Counter in Redis.',
        criteria: [
            'Choose between Token Bucket vs Sliding Window Counter',
            'Explain atomic operations (Redis Lua scripts / MULTI-EXEC)',
            'Handle race conditions & clock drift in distributed clusters',
            'Graceful degradation when Redis is temporarily unreachable'
        ],
        tradeoffs: 'Token Bucket is memory efficient (storing timestamp and tokens count) and permits bursts, while Sliding Window Counter gives exact rolling window guarantees with minimal memory overhead compared to storing discrete timestamps in a Sorted Set (ZSET).',
        aiHint: 'Consider storing the key `rate:user_id:minute` in Redis with atomic `INCR` and `EXPIRE` via Lua scripts to avoid race conditions.'
    },
    {
        id: 'sys_design_2',
        domain: 'backend',
        topic: 'Scalability & Message Queues',
        type: 'system_design',
        difficulty: 4,
        difficultyLabel: 'Hard',
        points: 50,
        questionText: 'Design a High-Throughput Notification Service: The system must send Push, Email, and SMS notifications to 50M users with delivery tracking and retry mechanisms for transient gateway failures. Describe the architecture and message queue partition strategy.',
        criteria: [
            'Decoupled architecture using Kafka/RabbitMQ topics per provider type',
            'Idempotency keys to avoid duplicate notifications',
            'Dead-Letter Queues (DLQ) with Exponential Backoff for failed deliveries',
            'Priority queues for critical OTPs vs promotional digests'
        ],
        tradeoffs: 'Kafka partitions partitioned by user_id guarantee in-order delivery per user while scaling consumer worker pools horizontally. Circuit breakers protect third-party SMS gateways from overloading.',
        aiHint: 'Separate critical OTP notifications from marketing blasts using dedicated high-priority queues. Use unique idempotency keys in Redis.'
    },

    // ==========================================
    // 6. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
    // ==========================================
    {
        id: 'ai_mcq_1',
        domain: 'aiml',
        topic: 'Transformers & Self-Attention',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'What is the computational complexity of the standard Scaled Dot-Product Attention mechanism with respect to sequence length N?',
        options: [
            'O(N)',
            'O(N log N)',
            'O(N^2)',
            'O(N^3)'
        ],
        correctIndex: 2,
        explanation: 'In standard Self-Attention, computing Q * K^T produces an N x N attention matrix representing pairwise token relationships, requiring O(N^2 * d) computations and O(N^2) memory footprint.',
        aiHint: 'Every token attends to every other token in the input sequence. What is the size of the attention weight matrix?'
    },

    // ==========================================
    // 7. CLOUD COMPUTING & DEVOPS
    // ==========================================
    {
        id: 'cloud_mcq_1',
        domain: 'cloud',
        topic: 'Kubernetes & Containers',
        type: 'mcq',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 20,
        questionText: 'In Kubernetes, what is the role of the Kubelet on a worker node?',
        options: [
            'Serving as the cluster-wide distributed key-value store',
            'An agent running on each node ensuring that containers described in PodSpecs are running and healthy',
            'Routing external ingress traffic across multiple cluster regions',
            'Compiling container source code into OCI image layers'
        ],
        correctIndex: 1,
        explanation: 'The Kubelet is the primary node agent that registers the node with the API server, takes PodSpecs from the control plane, and communicates with the container runtime (e.g. containerd) to start, stop, and monitor pod containers.',
        aiHint: 'Which daemon actually runs on each individual worker machine to manage local pods?'
    },

    // ==========================================
    // 8. CYBERSECURITY
    // ==========================================
    {
        id: 'sec_mcq_1',
        domain: 'security',
        topic: 'Authentication & Web Security',
        type: 'mcq',
        difficulty: 2,
        difficultyLabel: 'Medium',
        points: 15,
        questionText: 'Why is setting the `HttpOnly` flag on session cookies critical for web application security?',
        options: [
            'It forces the cookie to be transmitted over HTTPS only',
            'It prevents client-side JavaScript (`document.cookie`) from reading the cookie, mitigating token theft via Cross-Site Scripting (XSS)',
            'It automatically encrypts the cookie payload using AES-256',
            'It prevents Cross-Site Request Forgery (CSRF) attacks'
        ],
        correctIndex: 1,
        explanation: 'The `HttpOnly` cookie attribute instructs the browser that the cookie should never be accessible via JavaScript `document.cookie`. If an attacker exploits an XSS vulnerability, they cannot steal the session cookie.',
        aiHint: 'If an attacker executes malicious JavaScript in a user\'s browser, which flag blocks JS from reading the cookie?'
    },

    // ==========================================
    // 9. BEHAVIORAL & FAANG LEADERSHIP
    // ==========================================
    {
        id: 'behavioral_1',
        domain: 'behavioral',
        topic: 'Amazon LP & Conflict Resolution',
        type: 'behavioral',
        difficulty: 3,
        difficultyLabel: 'Medium',
        points: 30,
        questionText: 'Tell me about a time you had a significant technical disagreement with a teammate or senior engineer. How did you handle it and what was the outcome? (Use the STAR Framework: Situation, Task, Action, Result).',
        starFramework: {
            situation: 'Describe the technical project and context of the architectural disagreement.',
            task: 'Explain your responsibility and what decision needed to be made.',
            action: 'Detail how you gathered empirical data/benchmarks, communicated respectfully, and listened to opposing viewpoints.',
            result: 'Share the concrete metric/outcome and how you maintained strong team collaboration.'
        },
        aiHint: 'Avoid saying "I proved I was right". Highlight data-driven benchmarking, constructive listening, and "Disagree and Commit" when consensus is reached.'
    }
];

// Helper to access Question Bank
window.QUESTION_BANK = QUESTION_BANK;
