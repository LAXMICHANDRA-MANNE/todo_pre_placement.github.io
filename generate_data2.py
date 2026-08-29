import json
import urllib.parse

# Original curriculum from the user's text
curriculum = {
    "domains": [
        {
            "id": "dsa",
            "name": "Data Structures & Algorithms",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Arrays", "subtopics": "1D/2D/Multi-dimensional, Declaration & Initialization, Traversal & Insertion, Deletion & Rotation, Reversal"},
                        {"topic": "Strings", "subtopics": "Immutability & StringBuilder, Palindrome & Anagram, Substring, Pattern matching (Naive)"},
                        {"topic": "Linked Lists", "subtopics": "Singly & Doubly, Circular, Traversal & Insertion, Deletion & Reversal, Cycle detection (Floyd's)"},
                        {"topic": "Stacks", "subtopics": "LIFO, Array-based, LinkedList-based, Push/Pop/Peek, Infix/Postfix/Prefix conversion"},
                        {"topic": "Queues", "subtopics": "FIFO, Circular, Deque, Enqueue/Dequeue, Priority Queue (Min/Max heap basics)"},
                        {"topic": "Recursion", "subtopics": "Base case & Recursive case, Factorial & Fibonacci, Tower of Hanoi, Backtracking basics"},
                        {"topic": "Sorting Basics", "subtopics": "Bubble Sort, Selection Sort, Insertion Sort, O(n²) algorithms, In-place vs Stable"},
                        {"topic": "Searching", "subtopics": "Linear Search, Binary Search (iterative/recursive), Time complexity analysis"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Advanced Sorting", "subtopics": "Merge Sort, Quick Sort, Heap Sort, Divide & Conquer, Pivot selection, 3-way partitioning, Timsort"},
                        {"topic": "Hashing", "subtopics": "HashMaps, HashSets, HashTables, Collision resolution (Chaining/Open Addressing), Load factor & Rehashing"},
                        {"topic": "Trees (Basic-Advanced)", "subtopics": "BST, AVL, Red-Black Trees, Insertion & Deletion, Rotation & Balance factors, In-order/Pre/Post traversal"},
                        {"topic": "Binary Heaps", "subtopics": "Min-Heap & Max-Heap, Priority Queue, Heapify, Extract Min/Max, Decrease/Increase key, Build heap (O(n))"},
                        {"topic": "Graphs (Basic)", "subtopics": "Adjacency Matrix, Adjacency List, BFS, DFS, Connected components, Cycle detection (Undirected)"},
                        {"topic": "Greedy Algorithms", "subtopics": "Activity Selection, Huffman Coding, Fractional Knapsack, Interval Scheduling, Coin Change"},
                        {"topic": "Dynamic Programming (Basic)", "subtopics": "Memoization vs Tabulation, Fibonacci, Climbing Stairs, Grid Paths (2D DP)"},
                        {"topic": "Bit Manipulation", "subtopics": "AND/OR/XOR/NOT, Shifts, Bit masking, Subset generation, Power of 2 checks, Counting bits"},
                        {"topic": "Divide & Conquer", "subtopics": "Merge Sort & Quick Sort, Binary Search, Master's theorem, Karatsuba multiplication"},
                        {"topic": "Sliding Window", "subtopics": "Fixed size, Variable size, Maximum sum subarray, Longest substring without repeat"},
                        {"topic": "Two Pointers", "subtopics": "Opposite direction, Same direction, 3Sum, Trapping Rainwater, Pair with given sum"},
                        {"topic": "Trie", "subtopics": "Insert & Search, Prefix Search, Autocomplete, Spell checker, Word break"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Graph Algorithms", "subtopics": "Dijkstra, Bellman-Ford, Floyd-Warshall, Single-source shortest path, All-pairs shortest path, Negative cycles"},
                        {"topic": "Advanced Graph", "subtopics": "MST (Kruskal/Prim), Topological Sort, DAG applications, Disjoint Set Union (DSU/Union-Find), Path compression"},
                        {"topic": "Advanced Trees", "subtopics": "Fenwick Tree (BIT), Segment Tree, Sparse Table, Range queries, Lazy propagation, Point/Range updates, GCD queries"},
                        {"topic": "Advanced DP", "subtopics": "0/1 Knapsack, LCS, LIS, Matrix Chain, DP optimization (Knuth / Divide & Conquer), Bitmask DP"},
                        {"topic": "Backtracking", "subtopics": "N-Queens, Sudoku, Hamiltonian Cycle, Graph coloring, Knight's tour, Permutation generation"},
                        {"topic": "String Algorithms", "subtopics": "KMP, Rabin-Karp, Z-algorithm, Pattern matching, Rolling hash, String matching optimization"},
                        {"topic": "Advanced Data Structures", "subtopics": "Treap, Suffix Array, Suffix Automaton, Randomized BST, String processing, Pattern matching"},
                        {"topic": "Computational Geometry", "subtopics": "Convex Hull, Closest Pair, Line Sweep, Graham scan, Andrew's monotone chain, Intersection detection"},
                        {"topic": "Advanced Searching", "subtopics": "A*, Beam Search, Ternary Search, Heuristic search, State space search, Optimization"},
                        {"topic": "Flow Networks", "subtopics": "Max Flow (Ford-Fulkerson / Dinic's), Min Cut theorem, Bipartite matching, Max bipartite matching"},
                        {"topic": "Mathematical", "subtopics": "FFT, NTT, CRT, Matrix Exponentiation, Polynomial multiplication, Large integer multiplication"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Advanced Flow", "subtopics": "Push-Relabel, MCMF (Min Cost Max Flow), Capacity scaling, Flow decomposition, Circulation"},
                        {"topic": "Advanced String", "subtopics": "Suffix Automaton, Palindromic Tree (Eertree), Online string algorithms, Applications in bioinformatics"},
                        {"topic": "Advanced Geometry", "subtopics": "Polygon triangulation, Half-plane intersection, Computational geometry library implementation"},
                        {"topic": "Advanced DP", "subtopics": "DP on Trees, Digit DP, DP with bitmask, Tree diameter, Maximum independent set, Counting problems"},
                        {"topic": "Advanced Graphs", "subtopics": "Strongly Connected Components (SCC), 2-SAT, Tarjan's, Kosaraju's, Articulation points, Bridges"},
                        {"topic": "Persistent DS", "subtopics": "Persistent Segment Tree, Persistent Trie, Versioning in data structures, Rollback functionality"},
                        {"topic": "Advanced Trees", "subtopics": "Link-Cut Tree, Euler Tour Tree, Centroid Decomposition, Dynamic tree problems, Path queries, Subtree queries"},
                        {"topic": "Advanced Hashing", "subtopics": "Universal hashing, Cryptographic hashing, Perfect hashing, FIPS standards, Bloom filters (advanced)"},
                        {"topic": "Advanced Search", "subtopics": "Simulated Annealing, Genetic Algorithms, MCTS, Heuristic optimization, Game playing AI"},
                        {"topic": "Advanced Graph", "subtopics": "Minimum cut, Maximum closure problem, Project selection, Image segmentation applications"},
                        {"topic": "Advanced DP Opt", "subtopics": "DP optimization (Convex hull trick / Li Chao tree), DP with monotonicity, Online queries"},
                        {"topic": "Advanced Flow (Cont)", "subtopics": "Multi-commodity flow, Circulation with demands, Generalized flow, Network design problems"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Algorithm Design", "subtopics": "Combinatorial optimization, Approximation algorithms, NP-Hard problems, PTAS/FPTAS, Randomized algorithms"},
                        {"topic": "Parallel Algorithms", "subtopics": "MapReduce, GPU algorithms, Distributed DSA, CUDA, OpenMP, Spark, Parallel sorting/Merge"},
                        {"topic": "Advanced Math", "subtopics": "Berlekamp-Massey, Linear recurrence, Polynomial hashing, Algebraic algorithms, Interpolation, Fast evaluation"},
                        {"topic": "Spectral Algorithms", "subtopics": "Spectral graph theory, PageRank, Eigenvalue computation, Laplacian matrices"},
                        {"topic": "Quantum Algorithms", "subtopics": "Grover's Search, Shor's Algorithm, Quantum computing fundamentals, Qiskit implementation"},
                        {"topic": "Advanced Strings", "subtopics": "Heavy-Light Decomposition, Link-Cut Trees, Dynamic graph algorithms, Path queries"},
                        {"topic": "Advanced Geometry", "subtopics": "Delaunay triangulation, Voronoi diagrams, Computational geometry applications in GIS / gaming"},
                        {"topic": "Information Theory", "subtopics": "Compression algorithms (LZ / Arithmetic coding), Shannon entropy, Huffman coding advanced, Burrows-Wheeler"},
                        {"topic": "Advanced Analysis", "subtopics": "Amortized analysis (potential method), Competitive analysis, Online algorithms, Cache-oblivious algorithms"}
                    ]
                }
            ]
        },
        {
            "id": "dbms",
            "name": "Database Management Systems",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Database Fundamentals", "subtopics": "Database vs DBMS, File system vs DB, Data models (Network/Hierarchical/Relational)"},
                        {"topic": "SQL Basics", "subtopics": "DDL/DML/DCL/TCL, CREATE/ALTER/DROP, INSERT/UPDATE/DELETE, SELECT"},
                        {"topic": "Constraints", "subtopics": "PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, Table/Referential integrity"},
                        {"topic": "Basic Joins", "subtopics": "INNER/LEFT/RIGHT/FULL OUTER, Cross join, Self join, Equi join vs Non-equi join"},
                        {"topic": "Functions", "subtopics": "Aggregate (COUNT/SUM/AVG/MAX/MIN), String/Date/Math functions, GROUP BY, HAVING"},
                        {"topic": "ER Modeling", "subtopics": "Entities, Attributes, Relationships (1:1/1:N/M:N), ER diagrams, Cardinality, Participation constraints"},
                        {"topic": "Normalization", "subtopics": "1NF/2NF/3NF/BCNF, Functional dependencies, Anomalies (Insert/Update/Delete)"},
                        {"topic": "Indexing Basics", "subtopics": "Primary index, Clustered vs Non-clustered, B-Tree index basics, Index creation, Performance"},
                        {"topic": "Views", "subtopics": "Simple views, Materialized views, DML operations on views, View security"},
                        {"topic": "Subqueries", "subtopics": "Nested, Correlated, Scalar, EXISTS, ANY, ALL, IN, WITH clause (CTE basics)"},
                        {"topic": "Transactions", "subtopics": "ACID properties, BEGIN/COMMIT/ROLLBACK, Basic isolation (Read Uncommitted)"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Advanced SQL", "subtopics": "Window functions (ROW_NUMBER/RANK/LEAD/LAG), PARTITION BY, ORDER BY, Frame clauses (ROWS/RANGE)"},
                        {"topic": "Complex Queries", "subtopics": "Recursive CTEs, Hierarchical queries, Employee manager hierarchy, Bill of materials"},
                        {"topic": "Advanced Indexing", "subtopics": "Composite indexes, Covering indexes, Partial indexes, Index selection strategies, Index scan vs Index seek"},
                        {"topic": "Query Optimization", "subtopics": "EXPLAIN/EXPLAIN ANALYZE, Query execution plans, Cost-based vs Rule-based optimizers, Cardinality estimation"},
                        {"topic": "Transactions & Isolation", "subtopics": "Isolation levels (Read Committed/Repeatable Read/Serializable), Read phenomena (Dirty/Non-repeatable/Phantom)"},
                        {"topic": "Concurrency Control", "subtopics": "Locking (2PL/Strict 2PL/Rigorous 2PL), Deadlock detection, Lock escalation, Lock modes (Shared/Exclusive/Update)"},
                        {"topic": "MVCC", "subtopics": "Multi-Version Concurrency Control, Version chains, Visible tuples, Tuple visibility, Vacuuming"},
                        {"topic": "Advanced Joins", "subtopics": "Hash Join, Merge Join, Nested Loop Join, Join algorithms, Join order optimization, Semi-join, Anti-join"},
                        {"topic": "Stored Procedures", "subtopics": "Input/Output parameters, Cursors, Error handling, Dynamic SQL, Performance considerations"},
                        {"topic": "Triggers", "subtopics": "Statement vs Row-level, BEFORE/AFTER/INSTEAD OF, Audit trails, Business logic enforcement"},
                        {"topic": "Sharding", "subtopics": "Horizontal sharding (Range/Hash/List), Vertical partitioning, Shard key selection, Distributed queries"},
                        {"topic": "Replication", "subtopics": "Master-Slave, Master-Master, Chained, Sync/Async replication, Conflict resolution"},
                        {"topic": "NoSQL Basics", "subtopics": "Document (MongoDB), Key-Value (Redis), Columnar (Cassandra), CAP theorem (basic), Consistency models"},
                        {"topic": "Database Security", "subtopics": "Authentication, Authorization, GRANT/REVOKE, Roles, Permissions, Row-level security (RLS)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Distributed Transactions", "subtopics": "2PC (Two-Phase Commit), 3PC, Atomicity in distributed systems, Transaction Coordinator"},
                        {"topic": "Paxos/Raft", "subtopics": "Consensus algorithms, Leader election, Log replication, State machines, Safety & Liveness"},
                        {"topic": "Advanced Replication", "subtopics": "Multi-master replication, Synchronous async, Conflict detection/resolution (Last-write-wins/CRDTs)"},
                        {"topic": "Database Internals", "subtopics": "Storage engines (B-Tree vs LSM Tree), Write-Ahead Log (WAL), Checkpoints, Buffer manager"},
                        {"topic": "LSM Tree", "subtopics": "Structure (Memtable/SSTable/Bloom filters), Compaction strategies (Size-tiered/Leveled), Read amplification"},
                        {"topic": "Advanced Indexing", "subtopics": "Bitmap indexes, Hash indexes, GiST, SP-GiST, Full-text search (GIN), Spatial indexing (R-tree)"},
                        {"topic": "Optimizer Internals", "subtopics": "Dynamic programming, Genetic algorithms, Join enumeration, Cost models (Disk I/O/CPU/Network)"},
                        {"topic": "Parallel Query", "subtopics": "Intra-query parallelism, Inter-query parallelism, Parallel scans, Parallel joins, Partition-wise joins"},
                        {"topic": "Advanced Sharding", "subtopics": "Consistent hashing, Directory-based sharding, Dynamic rebalancing, Hotspot mitigation"},
                        {"topic": "Eventual Consistency", "subtopics": "CRDTs (Conflict-Free Replicated Data Types), RGA, OR-Set, GCounter, PNCounter"},
                        {"topic": "Vectorized Execution", "subtopics": "SIMD, Columnar execution, Batch processing, Tuple-at-a-time vs Vector-at-a-time"},
                        {"topic": "Query Compilation", "subtopics": "JIT compilation, LLVM-based, Code generation, Data skipping, Runtime filters"},
                        {"topic": "Change Data Capture", "subtopics": "Debezium, GoldenGate, Kafka CDC, Event sourcing, Database triggers (log-based)"},
                        {"topic": "Advanced Security", "subtopics": "Transparent Data Encryption (TDE), Column-level encryption, Key management, Vault integration, Masking"},
                        {"topic": "NewSQL/HTAP", "subtopics": "Hybrid Transactional/Analytical Processing, TiDB, CockroachDB, Spanner architecture"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Distributed Transactions (Adv)", "subtopics": "Saga pattern, TCC (Try-Confirm-Cancel), Compensation, Outbox pattern, Idempotency"},
                        {"topic": "Consensus Algorithms", "subtopics": "Raft (detailed), Multi-Paxos, PBFT, Leadership election, Log management, Commitment"},
                        {"topic": "HTAP Systems", "subtopics": "Row vs Column storage, Vectorization, MPP, Materialized views, Columnar compression, Adaptive indexing"},
                        {"topic": "Cloud Databases", "subtopics": "Aurora architecture (Log is DB), Spanner (TrueTime), Serverless DB, Storage-compute separation"},
                        {"topic": "Disaster Recovery", "subtopics": "RPO, RTO, Geo-redundancy, Backup/Restore, Point-in-time recovery, Log shipping, Replica promotion"},
                        {"topic": "Database Monitoring", "subtopics": "Metrics (Queries/sec, Latency, Connections), Slow query log, Performance insights, Indexing advisors"},
                        {"topic": "Advanced MVCC", "subtopics": "Snapshot isolation, Serializable Snapshot Isolation (SSI), Predicate locks, Snapshot maintenance, Garbage collection"},
                        {"topic": "Foreign Data Wrappers", "subtopics": "PostgreSQL FDW, Polyglot persistence, Data federation, Cross-database queries"},
                        {"topic": "Advanced Partitioning", "subtopics": "Composite partitioning, Subpartitioning, Hash + List, Partition pruning, Partition-wise joins, Global indexes"},
                        {"topic": "Resource Management", "subtopics": "Connection pooling, Query queueing, Admission control, Workload management, Resource groups, Cgroup isolation"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Database Theory", "subtopics": "Relational algebra, Relational calculus, Tuple calculus, Domain calculus, Query equivalence"},
                        {"topic": "Transaction Theory", "subtopics": "Serializability theory, View serializability, Conflict serializability, Precedence graph, Locking theorems"},
                        {"topic": "Advanced Consensus", "subtopics": "Byzantine Fault Tolerance (BFT), Proof of Work/Stake, Blockchain applications, Federated consensus"},
                        {"topic": "Vectorization", "subtopics": "Advanced vectorized execution, Data skipping, SIMD instructions, CPU vectorization, Query compilation optimization"},
                        {"topic": "Query Optimizer", "subtopics": "CBO (Cost-based Optimization) internals, Histograms, Statistics, Join ordering, Dynamic programming optimization"},
                        {"topic": "Storage Engineering", "subtopics": "New storage media (NVMe/PMEM/Optane), Write optimization, Read amplification, Compression, Deduplication"},
                        {"topic": "Replication Theory", "subtopics": "Replication protocols, State machine replication, Viewstamped replication, Chain replication"},
                        {"topic": "Database Fuzzing", "subtopics": "Query fuzzing, Mutation testing, SQL injection testing, Crash-resistant databases"},
                        {"topic": "Algorithm Design", "subtopics": "Compaction strategies (Tiered/Leveled/FIFO), Space amplification, Write amplification, Read amplification"},
                        {"topic": "Advanced Modelling", "subtopics": "Temporal databases, Spatial databases, R-tree variants, Spatio-temporal queries, Bitemporal data"},
                        {"topic": "Machine Learning for DB", "subtopics": "Learned indexes (Bloom filters/Hash maps), Automatic tuning, Anomaly detection, Workload analysis"}
                    ]
                }
            ]
        },
        {
            "id": "os",
            "name": "Operating Systems",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "OS Fundamentals", "subtopics": "Kernel, Shell, System calls, User mode vs Kernel mode, Interrupts, Trap, System calls (open/read/write)"},
                        {"topic": "Process Management", "subtopics": "Process (states/PCB), Process creation (fork/exec), Zombie, Orphan processes, Process termination"},
                        {"topic": "CPU Scheduling", "subtopics": "FCFS, SJF, SRTF, Round Robin, Priority, Context switching, Multi-level queue scheduling"},
                        {"topic": "Process Synchronization", "subtopics": "Critical section, Mutex, Semaphores, Producer-consumer, Reader-writer, Dining philosophers"},
                        {"topic": "Deadlocks", "subtopics": "Necessary conditions (Hold & Wait/Circular wait), Deadlock prevention, Avoidance (Banker's), Detection, Recovery"},
                        {"topic": "Memory Management", "subtopics": "Contiguous allocation, Paging, Segmentation, MMU, TLB, Page tables, Page hits/misses"},
                        {"topic": "Virtual Memory", "subtopics": "Demand paging, Page replacement (FIFO/LRU/Optimal), Page fault, Swap space, Thrashing"},
                        {"topic": "File Systems", "subtopics": "File attributes, Directories (Single-level/Two-level), File operations, Access methods (Sequential/Direct)"},
                        {"topic": "I/O Systems", "subtopics": "I/O hardware, Polling, Interrupt-driven I/O, DMA (Direct Memory Access), Device drivers, Buffering"},
                        {"topic": "Shell Basics", "subtopics": "Bash/Shell scripting (variables/loops/conditions), File permissions, Redirection, Pipes, Background processes"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Advanced CPU Scheduling", "subtopics": "MLFQ (Multi-Level Feedback Queue), CFS (Completely Fair Scheduler), Load balancing, Real-time scheduling (SCHED_FIFO/SCHED_RR)"},
                        {"topic": "Advanced Synchronization", "subtopics": "Monitors, Condition variables, Spinlocks, Read-Write locks, Barrier synchronization, Futex"},
                        {"topic": "Advanced Deadlock", "subtopics": "Deadlock detection algorithms (Wait-for graph), Starvation, Livelock, Deadlock handling in distributed systems"},
                        {"topic": "Advanced Memory Mgmt", "subtopics": "Multi-level paging, Inverted page tables, TLB (Translation Lookaside Buffer), Huge pages, NUMA awareness, Memory mapping (mmap)"},
                        {"topic": "Advanced Virtual Memory", "subtopics": "Working set model, Page fault handling, Copy-on-Write (COW), Memory overcommit, OOM Killer, Swappiness tuning"},
                        {"topic": "Advanced File Systems", "subtopics": "Journaling (EXT3/4 / NTFS), Log-structured FS (LFS / ZFS), File system consistency, Inode structure, Superblock"},
                        {"topic": "I/O Advanced", "subtopics": "Interrupt handling (Bottom half/Tasklets/SoftIRQs), I/O scheduling (Deadline/CFQ/Noop), AIO (Asynchronous I/O)"},
                        {"topic": "IPC Advanced", "subtopics": "Pipes (Named/Unnamed), Message Queues (POSIX/SysV), Shared memory (mmap/System V shm), Semaphores (POSIX/SysV)"},
                        {"topic": "Process Communication", "subtopics": "Signals (SIGINT/SIGTERM/SIGKILL), Sockets (UNIX/TCP/UDP), Signal handling, Re-entrant functions, Signal masks"},
                        {"topic": "Threads", "subtopics": "User threads vs Kernel threads, Pthreads API, Thread pools, Thread-local storage, TLS, Stack overflow"},
                        {"topic": "Virtualization", "subtopics": "Type-1 vs Type-2 hypervisors, Para-virtualization, Hardware-assisted virtualization (Intel VT-x / AMD-V)"},
                        {"topic": "Containers", "subtopics": "Docker (namespaces/cgroups), Dockerfile, Docker Compose, Container networking, Volumes, Build optimization"},
                        {"topic": "Linux Commands", "subtopics": "ps, top, kill, grep, awk, sed, systemd, Process monitoring, Log management, Package management (apt/yum)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Kernel Internals", "subtopics": "Linux kernel architecture, Kernel modules, System call handling, VFS (Virtual File System), Device driver model"},
                        {"topic": "Advanced Scheduling", "subtopics": "CFS internals (Red-black tree/Virtual runtime), Load balancing in multi-core, Real-time scheduling (SCHED_DEADLINE)"},
                        {"topic": "Advanced Memory", "subtopics": "SLAB/SLUB allocator, Buddy allocator, Page cache, Memory compaction, KSM (Kernel Same-page Merging), CMA (Contiguous Memory)"},
                        {"topic": "Virtual Memory Advanced", "subtopics": "Transparent Huge Pages (THP), NUMA (Non-Uniform Memory Access), Memory cgroups (cgroups v2), ZRAM/ZSWAP, Swap on SSD"},
                        {"topic": "Advanced IPC", "subtopics": "D-Bus, UNIX domain sockets (SEQPACKET), ZeroMQ, Nanomsg, Shared memory with futex/semaphores"},
                        {"topic": "I/O Advanced", "subtopics": "io_uring (Submission/Completion Queues), AIO (libaio), Direct I/O (O_DIRECT), Memory-mapped I/O, mmap performance"},
                        {"topic": "Advanced File Systems", "subtopics": "XFS, BTRFS (COW/Snapshots), ZFS (Zpool/ZIL/ARC), Ceph (Distributed FS), HDFS, Lustre"},
                        {"topic": "Performance Analysis", "subtopics": "perf (performance events), Ftrace (function tracing), SystemTap (dynamic tracing), LTTng (Linux Trace Toolkit)"},
                        {"topic": "eBPF (Basics)", "subtopics": "eBPF architecture, BPF maps, BPF programs, eBPF hooks (kprobe/tracepoint/XDP)"},
                        {"topic": "Security (Advanced)", "subtopics": "SELinux, AppArmor, Smack, Tomoyo, Capabilities, Seccomp (Secure Computing Mode), LSM (Linux Security Modules)"},
                        {"topic": "Networking (OS Level)", "subtopics": "Netfilter, iptables/nftables, Connection tracking, Network namespaces, veth pairs, Bridge, OVS"},
                        {"topic": "Container Runtime", "subtopics": "runc, containerd, CRI-O, OCI (Open Container Initiative), Rootless containers, Container security, Image distribution"},
                        {"topic": "Kubernetes (Basic)", "subtopics": "Pod, Deployment, Service, ConfigMap/Secret, Kubelet, Control plane, Scheduler, API Server"},
                        {"topic": "Observability", "subtopics": "Prometheus metrics, Grafana dashboards, Loki logs, OpenTelemetry (Traces/Metrics/Logs)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "eBPF Advanced", "subtopics": "BPF Compiler Collection (BCC), bpftrace, Cilium, XDP (eXpress Data Path), TCP BBR, DDoS protection"},
                        {"topic": "Kernel Development", "subtopics": "Writing kernel modules, Character/Block device drivers, IOCTL, Memory mapping (mmap), Kernel debugging (kgdb/crash)"},
                        {"topic": "System Design (OS)", "subtopics": "Kernel boot process (UEFI/BIOS), Init system (systemd), User space vs Kernel space optimization, Red Hat/CentOS/Ubuntu internals"},
                        {"topic": "Memory Management (Exp)", "subtopics": "Kernel memory allocation (kmalloc/vmalloc/get_free_pages), Memory barriers, Atomic operations, RCU (Read-Copy-Update)"},
                        {"topic": "Synchronization", "subtopics": "Spinlocks, Mutex (in kernel), Semaphores, RCU, Lock-free algorithms, Per-CPU variables, Memory ordering (mb/rmb/wmb)"},
                        {"topic": "Advanced Containers", "subtopics": "Kubernetes operators, Custom Resource Definitions (CRDs), Admission controllers, Service meshes (Istio/Linkerd)"},
                        {"topic": "Security Advanced", "subtopics": "Zero Trust architecture in OS, Secure boot, TPM, UEFI Secure Boot, Measured Boot, Boot integrity"},
                        {"topic": "Performance Tuning", "subtopics": "Kernel parameters (/proc/sys), CPU governor, CFS tuning, NUMA tuning, I/O scheduler tuning, Network tuning (sysctl)"},
                        {"topic": "Disaster Recovery", "subtopics": "System backup (rsync/dd), Forensics, Recovery mode, Boot repair, GRUB recovery, Kernel panic debugging"},
                        {"topic": "Virtualization Advanced", "subtopics": "KVM, QEMU, VirtIO (paravirtualized drivers), PCI passthrough, SR-IOV, Live migration"},
                        {"topic": "Cloud OS", "subtopics": "AWS Nitro, Firecracker (microVMs), Google gVisor, OS-level virtualization, Kata Containers, Confidential computing"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Kernel Architecture", "subtopics": "x86/ARM64 interrupt handling, Exception handlers, System call implementation (syscalls), Fast path vs Slow path"},
                        {"topic": "Advanced Memory", "subtopics": "Memory protection keys (MPK), ASLR (Address Space Layout Randomization), KASLR, Memory isolation (Meltdown/Spectre mitigation)"},
                        {"topic": "Real-time Systems", "subtopics": "PREEMPT_RT, SCHED_DEADLINE, Priority inheritance, Priority inversion, Priority ceiling protocol, Real-time IPC"},
                        {"topic": "Advanced eBPF", "subtopics": "BPF CO-RE (Compile Once - Run Everywhere), BPF BTF, BPF performance optimization, BPF in networking/security"},
                        {"topic": "Container Orchestration", "subtopics": "Kubernetes internals (etcd/Controller Manager), Custom schedulers, Kubelet internals, CRI (Container Runtime Interface), CNI"},
                        {"topic": "Advanced Security (Master)", "subtopics": "Mandatory Access Control (MAC), Flask architecture, Kernel hardening (Kernel Self Protection Project), SBOM"},
                        {"topic": "Storage Engineering", "subtopics": "NVMe support, Multi-queue I/O, Persistent memory (PMEM), DAX (Direct Access), NVDIMM, SCM (Storage Class Memory)"},
                        {"topic": "Distributed Systems OS", "subtopics": "Unikernels, Microkernels (seL4/L4), Exokernels, Multi-kernel OS, Barrelfish"},
                        {"topic": "Fuzzing", "subtopics": "Kernel fuzzing (Syzkaller), KASAN (Kernel Address Sanitizer), UBSAN (Undefined Behavior Sanitizer), KCOV (Code Coverage)"},
                        {"topic": "OS Verification", "subtopics": "Formal verification (seL4), Model checking, SPIN, Promela, Rust for kernel development"},
                        {"topic": "Quantum OS", "subtopics": "Quantum computing OS concepts, QEMU quantum simulation, Quantum error correction, Quantum gate operations"}
                    ]
                }
            ]
        },
        {
            "id": "networks",
            "name": "Computer Networks",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Network Basics", "subtopics": "OSI Model (7 layers), TCP/IP Model (4 layers), Protocols, Encapsulation, Decapsulation, PDU"},
                        {"topic": "Physical Layer", "subtopics": "Signaling, Encoding, Cabling (UTP/Fiber), Bandwidth, Throughput, Bit rate, Baud rate"},
                        {"topic": "Data Link Layer", "subtopics": "MAC addresses, Ethernet frame, CSMA/CD, Switches, Hubs, Bridge, VLAN (basic)"},
                        {"topic": "Network Layer", "subtopics": "IP addressing (IPv4/IPv6), Subnetting, CIDR, Classes (A/B/C), Public vs Private IP, Subnet mask"},
                        {"topic": "ARP", "subtopics": "Address Resolution Protocol, RARP, ARP cache, ARP request/response, Proxy ARP"},
                        {"topic": "Routing Basics", "subtopics": "Static routing, Dynamic routing (RIP), Routing table, Default gateway, Routing metrics"},
                        {"topic": "Transport Layer", "subtopics": "TCP (Connection-oriented), UDP (Connectionless), TCP 3-way handshake, UDP header, Ports, Socket"},
                        {"topic": "Application Layer", "subtopics": "DNS (Domain Name System), HTTP, SMTP, FTP, DHCP, DNS resolution, HTTP request/response, SMTP commands"},
                        {"topic": "Network Devices", "subtopics": "Router, Switch, Gateway, Access Point, Repeater, Routing vs Switching, Store-and-forward, Cut-through"},
                        {"topic": "Network Tools", "subtopics": "ping, traceroute, nslookup, netstat, ipconfig/ifconfig, ARP cache, Network interfaces, Packet sniffing (basic)"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "TCP Deep Dive", "subtopics": "3-way handshake, 4-way termination, TCP header (Flags), Sequence numbers, ACK numbers, MSS, Window size"},
                        {"topic": "TCP Flow Control", "subtopics": "Sliding window, Receive buffer, Send buffer, Window scaling, Zero-window probing, Nagle's algorithm"},
                        {"topic": "TCP Congestion Control", "subtopics": "Slow start, Congestion avoidance, Fast retransmit, Fast recovery, AIMD (Additive Increase/Multiplicative Decrease)"},
                        {"topic": "TCP Variants", "subtopics": "Tahoe, Reno, NewReno, CUBIC, BBR, Algorithm details, Use cases (datacenter vs internet)"},
                        {"topic": "UDP", "subtopics": "UDP header, Datagram, Ports, Checksum calculation, UDP multicast, UDP broadcast"},
                        {"topic": "DNS Advanced", "subtopics": "Recursive vs Iterative, Authoritative vs Caching, DNSSEC, Anycast, DNS load balancing (Round Robin)"},
                        {"topic": "DHCP", "subtopics": "DHCP Discover/Offer/Request/ACK, DHCP relay, DHCP lease, DORA process, DHCP options"},
                        {"topic": "Routing Protocols", "subtopics": "OSPF (Link-state), BGP (Path-vector), EIGRP, Distance-vector vs Link-state, Autonomous Systems"},
                        {"topic": "IPv6", "subtopics": "IPv6 header, Address types (Unicast/Anycast/Multicast), Neighbor Discovery, SLAAC, IPv6 transition (Tunneling/Dual-stack)"},
                        {"topic": "Network Security Basics", "subtopics": "Firewalls (Stateless/Stateful), NAT (SNAT/DNAT), DMZ, Port forwarding, VPN (IPSec/SSL/TLS)"},
                        {"topic": "Load Balancing", "subtopics": "L4 (TCP/UDP), L7 (HTTP) load balancing, Algorithms (Round Robin/Least Connections/IP Hash)"},
                        {"topic": "CDN", "subtopics": "Content Delivery Networks, Edge servers, PoP (Points of Presence), Caching strategies, Origin shield, Cache invalidation"},
                        {"topic": "HTTP/1.1", "subtopics": "Methods (GET/POST/PUT/DELETE), Status codes (1xx-5xx), Headers (Host/Content-Type/Cache-Control), Keep-alive"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "TCP Optimization", "subtopics": "SACK (Selective ACK), DSACK, Timestamp options, Path MTU discovery, TCP Fast Open, TFO cookies"},
                        {"topic": "Congestion Control Adv", "subtopics": "DCTCP (Data Center TCP), BBRv2, Packet pacing, ECN (Explicit Congestion Notification)"},
                        {"topic": "Network Performance", "subtopics": "Latency vs Throughput, Bandwidth-delay product, Bufferbloat, Queue management (RED/CoDel)"},
                        {"topic": "HTTP/2", "subtopics": "Multiplexing, Server push, Header compression (HPACK), Streams, Framing, Flow control, Priorities"},
                        {"topic": "HTTP/3 & QUIC", "subtopics": "QUIC protocol, 0-RTT, Connection migration, UDP-based, Stream multiplexing, Forward error correction"},
                        {"topic": "WebSockets", "subtopics": "Full-duplex, WebSocket handshake, Frame format, Use cases (chat/gaming/live updates)"},
                        {"topic": "gRPC", "subtopics": "Protocol Buffers, RPC, HTTP/2 transport, Streaming (Unary/Server/Client/Bidirectional), Load balancing"},
                        {"topic": "Advanced Load Balancing", "subtopics": "Consistent hashing, Ring hashing, Maglev hashing, Weighted algorithms, Health checks, Connection draining"},
                        {"topic": "Advanced DNS", "subtopics": "EDNS0, DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), Split DNS, DNS hijacking detection, DNSSEC validation"},
                        {"topic": "BGP Advanced", "subtopics": "eBGP vs iBGP, BGP attributes (AS Path/MED/Local Pref), Route selection, Communities, BGP security (RIP/BGPsec)"},
                        {"topic": "MPLS", "subtopics": "Multiprotocol Label Switching, Label switching, LDP (Label Distribution Protocol), Traffic engineering"},
                        {"topic": "Network Virtualization", "subtopics": "VLAN (802.1Q), VXLAN, NVGRE, GRE, Overlay networks, L2/L3 tunnels, EVPN"},
                        {"topic": "SDN", "subtopics": "Software-Defined Networking (OpenFlow), SDN controllers, ONOS, OpenDaylight, Network automation (Ansible)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "TCP Internals", "subtopics": "TCP state machine (FIN_WAIT/TIME_WAIT/CLOSE_WAIT), TIME_WAIT issues, Socket reuse, TCP keepalive"},
                        {"topic": "High-Perf Networking", "subtopics": "Kernel bypass (DPDK/PF_RING/Netmap), Zero-copy networking, RDMA, InfiniBand"},
                        {"topic": "XDP", "subtopics": "XDP hooks, AF_XDP sockets, XDP redirect, Packet processing at NIC driver level, Cloudflare's use of XDP"},
                        {"topic": "Service Mesh", "subtopics": "Istio, Linkerd, Envoy Proxy, mTLS, Circuit breaking, Retry budgets, Fault injection, Traffic splitting"},
                        {"topic": "Network Security Adv", "subtopics": "DDoS mitigation (SYN flood/UDP amplification), WAF, Bot protection, Rate limiting, Challenge-response"},
                        {"topic": "ZTNA (Zero Trust)", "subtopics": "Zero Trust Network Access, SASE, BeyondCorp, Identity-based access, MFA, Continuous authentication"},
                        {"topic": "Advanced Cryptography", "subtopics": "TLS 1.3 (Handshake/0-RTT), Cipher suites, Perfect forward secrecy, ECDHE, Certificate pinning"},
                        {"topic": "Network Forensics", "subtopics": "Packet analysis (tcpdump/Wireshark), PCAP analysis, Flow logging (NetFlow/sFlow/IPFIX), Threat hunting"},
                        {"topic": "Multicast Routing", "subtopics": "IGMP (Internet Group Management Protocol), PIM-SM, PIM-DM, MBONE, Application-layer multicast"},
                        {"topic": "Segment Routing", "subtopics": "SR-MPLS, SRv6, TI-LFA (Topology-Independent Loop-free Alternate), Traffic engineering, Fast reroute, Segment list"},
                        {"topic": "Network Programmability", "subtopics": "P4 language, Programmable data planes, P4Runtime, Tofino, Barefoot Networks"},
                        {"topic": "Wireless Networks", "subtopics": "Wi-Fi 6 (802.11ax), 5G NR (New Radio), IoT protocols, MIMO, OFDMA, Beamforming, BLE, LoRaWAN"},
                        {"topic": "Data Center Networking", "subtopics": "Clos architecture, Spine-leaf topology, ECMP (Equal-Cost Multipath), VXLAN, Segment routing, Congestion control in DC"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "TCP BBR", "subtopics": "BBR state machine, BBR pacing, BBR gains, BBRv2, Inter-protocol fairness, Deployment challenges"},
                        {"topic": "Advanced Routing", "subtopics": "Segment routing (SR-MPLS/SRv6), PCEP (Path Computation Element), SR policies, Path computation, Traffic engineering with SR"},
                        {"topic": "Network Automation", "subtopics": "Intent-based networking, Network as Code, Terraform for networking, Ansible, Python network automation"},
                        {"topic": "5G Core", "subtopics": "5G architecture (Control/User plane separation), Network slicing, MEC (Multi-access Edge Computing), Mobile backhaul"},
                        {"topic": "Quantum Networking", "subtopics": "Quantum key distribution (QKD), Quantum repeaters, Entanglement-based networks, Post-quantum cryptography"},
                        {"topic": "Optical Networking", "subtopics": "DWDM (Dense Wavelength Division Multiplexing), OTN, Coherent transmission, Optical switching, ROADM"},
                        {"topic": "Network AI/ML", "subtopics": "Predictive analytics, Anomaly detection, Traffic classification, ML in network security (fraud detection/threat intelligence)"},
                        {"topic": "IPv6 Advanced", "subtopics": "IPv6 extension headers, Segment routing, SRv6, IPv6-only networking, IPv6 security (RA guard)"},
                        {"topic": "Advanced BGP", "subtopics": "BGP Flowspec, BGP EVPN, BGP ADD-PATH, BGP route reflection, BGP optimization (Best path selection)"},
                        {"topic": "Network Observability", "subtopics": "eBPF for networking, Cilium, Tetragon, Network performance monitoring, Distributed tracing, Root cause analysis"},
                        {"topic": "Edge Networking", "subtopics": "Edge computing, Kubernetes at edge (K3s/EdgeX), CDN edge, Cloudflare Workers, IoT gateways"},
                        {"topic": "Advanced Firewalling", "subtopics": "Application-aware firewall, Next-gen firewall (NGFW), Deep packet inspection (DPI), SSL/TLS interception, User identification"}
                    ]
                }
            ]
        },
        {
            "id": "aiml",
            "name": "Artificial Intelligence / Machine Learning",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "ML Fundamentals", "subtopics": "Supervised, Unsupervised, Reinforcement Learning, Training/Test split, Overfitting, Underfitting, Bias-Variance"},
                        {"topic": "Linear Regression", "subtopics": "Simple, Multiple, Polynomial, OLS, Gradient Descent, MSE, R² Score"},
                        {"topic": "Logistic Regression", "subtopics": "Binary Classification, Sigmoid function, Log loss, Decision boundary, Odds ratio"},
                        {"topic": "k-NN (k-Nearest Neighbors)", "subtopics": "Distance metrics (Euclidean/Manhattan), Feature scaling, Curse of dimensionality"},
                        {"topic": "Decision Trees", "subtopics": "ID3, C4.5, CART, Entropy, Information gain, Gini impurity, Pruning"},
                        {"topic": "Naive Bayes", "subtopics": "Bayes theorem, Conditional independence, Gaussian, Multinomial, Bernoulli NB"},
                        {"topic": "SVM (Basic)", "subtopics": "Linear SVM, Hinge loss, Support vectors, Decision boundary, Margin"},
                        {"topic": "K-Means Clustering", "subtopics": "Euclidean distance, Centroids, Elbow method, Silhouette score"},
                        {"topic": "PCA", "subtopics": "Variance explained, Eigenvalues, Dimensionality reduction, Feature extraction"},
                        {"topic": "Neural Networks (Basic)", "subtopics": "Perceptron, Activation functions (Sigmoid/Tanh), Feedforward, Backpropagation, Loss functions"},
                        {"topic": "Python Libraries", "subtopics": "NumPy, Pandas, Matplotlib, Scikit-learn, Data manipulation, Visualization, Basic models"},
                        {"topic": "Evaluation Metrics", "subtopics": "Accuracy, Precision, Recall, F1-Score, Confusion matrix, AUC-ROC, Log loss"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Tree Ensembles", "subtopics": "Random Forest, Extra Trees, Gradient Boosting, Bagging, Boosting, Feature importance, Out-of-bag samples"},
                        {"topic": "GBM", "subtopics": "XGBoost, LightGBM, CatBoost, Tree pruning, Leaf-wise vs Level-wise, Regularization"},
                        {"topic": "SVM Advanced", "subtopics": "Kernel trick (RBF/Polynomial/Sigmoid), Soft margin, C parameter, Gamma, SVM for regression (SVR)"},
                        {"topic": "Dimensionality Reduction", "subtopics": "PCA, t-SNE, UMAP, LDA, Feature selection (Filter/Wrapper/Embedded)"},
                        {"topic": "Neural Networks (Int)", "subtopics": "Dropout, Batch normalization, Xavier/He initialization, Optimizers (SGD/Adam/RMSprop), Learning rate scheduling"},
                        {"topic": "CNNs", "subtopics": "Convolution, Pooling (Max/Average), Strides, Padding, Leaky ReLU, Batch norm, Transfer learning"},
                        {"topic": "RNNs", "subtopics": "Sequence modeling, LSTM, GRU, Vanishing gradients, Bidirectional RNNs, Stacked RNNs"},
                        {"topic": "NLP Basics", "subtopics": "Bag of Words, TF-IDF, N-grams, Stemming (Porter), Lemmatization, Stopwords"},
                        {"topic": "Word Embeddings", "subtopics": "Word2Vec (CBOW/Skip-gram), GloVe, FastText, Embedding dimension, Context window"},
                        {"topic": "Attention Mechanism", "subtopics": "Bahdanau/Luong attention, Self-attention, Query, Key, Value, Scaled dot-product"},
                        {"topic": "Transformers (Basic)", "subtopics": "Encoder-Decoder architecture, Multi-head attention, Positional encoding, Layer normalization, Feed-forward"},
                        {"topic": "Time Series", "subtopics": "ARIMA, SARIMA, Prophet, Moving averages, ACF, PACF, Stationarity, Differencing"},
                        {"topic": "Feature Engineering", "subtopics": "Feature scaling (Standard/MinMax/Robust), Encoding (One-hot/Label), Feature creation (Polynomial/Interaction), Imputation"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "LLMs", "subtopics": "GPT (1/2/3/4), LLaMA, PaLM, BERT, T5, Auto-regressive vs Auto-encoding, Training objectives (MLM/CLM)"},
                        {"topic": "Fine-tuning", "subtopics": "Parameter-Efficient Fine-Tuning (PEFT), LoRA, QLoRA, Adapters, Prefix Tuning, Prompt Tuning, IA3"},
                        {"topic": "RLHF", "subtopics": "Reinforcement Learning from Human Feedback, PPO, DPO, Reward modeling, Proximal Policy Optimization, KL divergence"},
                        {"topic": "Inference Optimization", "subtopics": "KV-caching, Continuous batching, Flash Attention (1&2), PagedAttention (vLLM), Speculative decoding"},
                        {"topic": "Quantization", "subtopics": "GPTQ, AWQ, GGUF, NF4, FP8, Weight quantization (INT4/8), Activation quantization"},
                        {"topic": "RAG Architecture", "subtopics": "Vector databases (Pinecone/Weaviate/Milvus/Chroma), Chunking strategies, Embedding models, Retrieval strategies"},
                        {"topic": "RAG Advanced", "subtopics": "HyDE, Self-RAG, CRAG (Corrective RAG), RAPTOR, Graph RAG, Multi-query retrieval, Re-ranking (Cross-encoder)"},
                        {"topic": "Agentic AI", "subtopics": "ReAct pattern, Tool calling, Planning (LLM-Planner), Tree of Thoughts, Graph of Thoughts, Multi-agent coordination"},
                        {"topic": "Multi-modal AI", "subtopics": "CLIP, Flava, DALL-E, Stable Diffusion, Text-to-Video, Vision transformers, Diffusion models (DDPM/Stable Diffusion)"},
                        {"topic": "MLOps", "subtopics": "MLflow (Experiment tracking/Model registry), DVC (Data versioning), Feature stores (Feast/Tecton), Model monitoring"},
                        {"topic": "Model Deployment", "subtopics": "Batch inference, Real-time inference, ONNX, TensorRT, Triton Inference Server, TorchServe, FastAPI"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "LLM Internals", "subtopics": "Transformer architecture (Attention is All You Need), Encoder/Decoder, Self-attention, Multi-Query Attention, Grouped-Query Attention"},
                        {"topic": "Training at Scale", "subtopics": "Distributed training (Data/Model/Pipeline Parallelism), ZeRO (Zero Redundancy Optimizer), FSDP, 3D parallelism"},
                        {"topic": "Advanced Fine-tuning", "subtopics": "RLHF (InstructGPT), DPO (Direct Preference Optimization), PPO implementation, Reward hacking, Alignment tax"},
                        {"topic": "Embedding Models", "subtopics": "Contrastive learning, SimCSE, Sentence-BERT, E5, GTE, MTEB, Hard negative mining, In-batch negatives, Bi-encoders"},
                        {"topic": "Vector Databases", "subtopics": "HNSW, IVF, PQ (Product Quantization), DiskANN, Billion-scale similarity search, Qdrant, Vespa"},
                        {"topic": "Advanced RAG", "subtopics": "Multimodal RAG, Streaming RAG, Agentic RAG, Self-reflective RAG, Evaluation (RAGAS/ARES)"},
                        {"topic": "Efficient Attention", "subtopics": "Flash Attention (FlashAttention-2), FlashAttention-3, Memory-efficient attention, Sparse attention, Linear attention"},
                        {"topic": "LLM Compression", "subtopics": "Pruning (Magnitude/SparseGPT), Knowledge Distillation (DistilBERT), Model distillation (TinyBERT), Weight sharing (ALBERT)"},
                        {"topic": "Generative Models", "subtopics": "GANs (StyleGAN/CycleGAN), VAEs, Flow-based models, Diffusion models (DALL-E 2/3 / Imagen), Score-based models"},
                        {"topic": "Graph Neural Networks", "subtopics": "GCN (Graph Convolutional Networks), GAT, GraphSAGE, Message passing, Graph pooling, Node classification"},
                        {"topic": "Reinforcement Learning", "subtopics": "DQN (Deep Q-Network), PPO, SAC (Soft Actor-Critic), Actor-Critic, Multi-agent RL, Imitation learning"},
                        {"topic": "Time Series Advanced", "subtopics": "LSTM for TS, Transformer for TS (Informer/Autoformer), Anomaly detection, Forecasting (M4/M5 competitions)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Advanced Transformers", "subtopics": "RoPE (Rotary Positional Embeddings), SwiGLU activation, RMSNorm, ALiBi, Attention with Linear Biases, Longformer"},
                        {"topic": "LLM Architecture", "subtopics": "MoE (Mixture of Experts), Switch Transformer, Sparsity in LLMs, Expert routing, Load balancing"},
                        {"topic": "Advanced Training", "subtopics": "MegaScale, ColossalAI, DeepSpeed (Zero-3 offload), Gradient checkpointing, Activation recomputation, Mixed precision (FP16/BF16/FP8)"},
                        {"topic": "Post-training", "subtopics": "Instruction tuning (FLAN/T0), Preference tuning, Constitutional AI, Superalignment (OpenAI), AI safety"},
                        {"topic": "Interpretability", "subtopics": "SHAP (Shapley values), LIME, Integrated Gradients, Attention visualization, Mechanistic interpretability, Feature attribution"},
                        {"topic": "Multi-agent Systems", "subtopics": "Decentralized AI, Multi-agent RL, Emergent behavior, Cooperative, Competitive, Communication in agents"},
                        {"topic": "Causal Inference", "subtopics": "Causal graphs, Do-calculus, Pearl's framework, Confounding, Mediation, Counterfactuals, Instrumental variables"},
                        {"topic": "Bayesian ML", "subtopics": "Bayesian inference, Gaussian processes, Variational inference, MCMC, Bayesian optimization, Hyperparameter tuning"},
                        {"topic": "Privacy-preserving ML", "subtopics": "Federated learning, Differential privacy (DP-SGD), Homomorphic encryption, Secure Multi-Party Computation (MPC)"},
                        {"topic": "AutoML", "subtopics": "Neural Architecture Search (NAS), Auto-optimizers, Hyperparameter optimization (Optuna/Ray Tune), Evolutionary optimization"},
                        {"topic": "AI for Science", "subtopics": "AlphaFold (Protein folding), Drug discovery, Quantum ML, Physics-informed neural networks (PINNs), Equivariant networks"},
                        {"topic": "ML Systems", "subtopics": "Distributed training (Ray/Horovod/TensorFlow Distributed), ML orchestration (Airflow/Kubeflow), Data pipeline automation"}
                    ]
                }
            ]
        },
        {
            "id": "programming",
            "name": "Programming & Development",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Python", "subtopics": "Syntax, Variables, Data types (int/float/str/bool/list/tuple/dict/set), Control flow (if/else/for/while), Functions, Scope"},
                        {"topic": "OOPS Basics", "subtopics": "Classes, Objects, Methods, Constructors (__init__), Inheritance, Encapsulation, Polymorphism (method overriding)"},
                        {"topic": "Exception Handling", "subtopics": "try/except, raise, finally, else, Custom exceptions, Exception hierarchy"},
                        {"topic": "File I/O", "subtopics": "Reading/writing (txt/csv/json), with context, File modes (r/w/a/r+), Buffering"},
                        {"topic": "Git Basics", "subtopics": "init, add, commit, push, pull, clone, branch, Git workflow (staging/committing), Gitignore"},
                        {"topic": "Shell Scripting", "subtopics": "Variables, Loops (for/while), Conditionals (if/case), Command substitution, Functions in bash"},
                        {"topic": "Basic Frameworks", "subtopics": "Flask (routes/templates), Django (views/URLs/models), FastAPI (Pydantic/async)"},
                        {"topic": "Testing", "subtopics": "Unit testing (unittest/pytest), Assertions, Test fixtures, Basic coverage"},
                        {"topic": "C++ Basics", "subtopics": "Syntax, Classes, Pointers, References, Standard Library (vector/string/iostream)"},
                        {"topic": "Java Basics", "subtopics": "JVM, Main method, Arrays, Strings, Collections (ArrayList/HashMap), Exception handling"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Design Patterns", "subtopics": "Singleton, Factory, Observer, Strategy, Builder, Adapter, Creational, Structural, Behavioral patterns"},
                        {"topic": "SOLID Principles", "subtopics": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion"},
                        {"topic": "Architecture Patterns", "subtopics": "MVC, MVVM, Clean Architecture, Hexagonal Architecture, MVP, Layered Architecture"},
                        {"topic": "Concurrency", "subtopics": "Multithreading (Python threading/Java Threads/C++ std::thread), Synchronization (Lock/Semaphore/Condition), Race conditions"},
                        {"topic": "Async Programming", "subtopics": "Async/await (Python asyncio), JavaScript Promises, Event loop, Coroutines, Async tasks (Celery)"},
                        {"topic": "API Development", "subtopics": "RESTful principles, HTTP methods, Status codes, Versioning, Authentication (JWT/Basic Auth), Rate limiting"},
                        {"topic": "Database Integration", "subtopics": "ORMs (SQLAlchemy/Django ORM/Hibernate), Raw SQL, Connection pooling, Migration (Alembic), Query optimization"},
                        {"topic": "Testing Advanced", "subtopics": "Integration testing, Mocking (Mockito/unittest.mock), Test-driven development (TDD), Test coverage (pytest-cov)"},
                        {"topic": "Git Advanced", "subtopics": "Branching strategies (GitFlow/GitHub Flow), Rebase, Merge vs Rebase, Cherry-pick, Interactive rebase"},
                        {"topic": "CI/CD Basics", "subtopics": "GitHub Actions, GitLab CI, CircleCI, Build, Test, Deploy pipeline, Artifacts"},
                        {"topic": "Containerization", "subtopics": "Dockerfile (FROM/RUN/COPY/CMD), Multi-stage builds, Docker Compose (networks/volumes), Docker registry"},
                        {"topic": "Container Orchestration", "subtopics": "Kubernetes basics (Pod/Service/Deployment/ConfigMap/Secret), Ingress, Persistent volumes, StatefulSets"},
                        {"topic": "Web Framework Adv", "subtopics": "FastAPI (async/dependency injection), Django REST Framework (serializers/viewsets), Middleware, Authentication/permissions"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Distributed Systems", "subtopics": "CAP theorem, Consistency models (Linearizable/Sequential/Causal), Partition tolerance, Distributed consensus (Raft/Paxos)"},
                        {"topic": "Scalability Patterns", "subtopics": "Sharding (Database), Horizontal/Vertical scaling, Load balancing, Caching strategies (CDN/Redis/Memcached)"},
                        {"topic": "Resiliency Patterns", "subtopics": "Circuit breaker, Retry with exponential backoff, Timeout, Bulkhead, Fallback, Health checks, Chaos engineering"},
                        {"topic": "Event-Driven Arch", "subtopics": "Event sourcing, CQRS (Command Query Responsibility Segregation), Outbox pattern, SAGA (Orchestration/Choreography), Idempotency"},
                        {"topic": "Messaging Systems", "subtopics": "Kafka (Producers/Consumers/Topics/Partitions), RabbitMQ (Queues/Exchanges), Exactly-once semantics, Message ordering, Dead-letter queue"},
                        {"topic": "Caching Advanced", "subtopics": "Cache invalidation (Write-through/Write-back/Write-behind), Distributed caching (Redis Cluster), Cache stampede"},
                        {"topic": "API Gateway", "subtopics": "Kong, NGINX, Envoy, HAProxy, Rate limiting, Circuit breaking, Routing, Authentication"},
                        {"topic": "Service Mesh", "subtopics": "Istio (Envoy proxy), Linkerd, mTLS, Traffic splitting, Fault injection, Telemetry"},
                        {"topic": "Observability", "subtopics": "Prometheus (Metrics), Grafana (Dashboards), Loki (Logs), Distributed tracing (Jaeger/Zipkin), OpenTelemetry"},
                        {"topic": "Security (Advanced)", "subtopics": "OAuth 2.0 (Authorization Code PKCE), OIDC (OpenID Connect), JWT (RS256/HS256), Zero Trust, RBAC vs ABAC"},
                        {"topic": "Performance Eng", "subtopics": "Profiling (cProfile/Java Flight Recorder/perf), Memory leaks, CPU bottlenecks, I/O optimization"},
                        {"topic": "Infrastructure as Code", "subtopics": "Terraform (Resource/Data/Provider/Modules/State), Terragrunt, Pulumi, CloudFormation, Crossplane"},
                        {"topic": "Kubernetes Advanced", "subtopics": "Operators (CRDs), Admission controllers, RBAC, Service accounts, Pod security policies, Network policies"},
                        {"topic": "C++ Advanced", "subtopics": "Smart pointers (unique_ptr/shared_ptr/weak_ptr), Move semantics, Templates (Function/Class), STL (algorithms/containers), Lambdas"},
                        {"topic": "Java Advanced", "subtopics": "Generics, Streams API, CompletableFuture, Reflection, JVM (Garbage collection/JIT compilation), Java Memory Model"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Distributed Systems Adv", "subtopics": "Linearizability vs Sequential, Strong vs Eventual consistency, Vector clocks, Lamport timestamps, Clock synchronization"},
                        {"topic": "Consensus Algorithms", "subtopics": "Raft (Leader election/Log replication/Commitment), Multi-Paxos, PBFT (Practical Byzantine Fault Tolerance), ZAB (ZooKeeper Atomic Broadcast)"},
                        {"topic": "Distributed Transactions", "subtopics": "Saga (Compensation), TCC (Try-Confirm-Cancel), 2PC, 3PC, Outbox pattern, Idempotency, Distributed locking (Redlock)"},
                        {"topic": "Event Sourcing", "subtopics": "Event store (EventStoreDB), Projections, CQRS, Stream processing (Kafka Streams/Flink), Exactly-once semantics"},
                        {"topic": "Messaging Advanced", "subtopics": "Kafka (Streams API/KSQL/Connectors), RabbitMQ (Consistent Hashing), Partition rebalancing, Delivery semantics, Exactly-once with transactions"},
                        {"topic": "Performance Tuning", "subtopics": "Garbage collection tuning (G1GC/ZGC/Shenandoah), JVM tuning, Python GIL optimization (multiprocessing)"},
                        {"topic": "Security Architecture", "subtopics": "Zero Trust (ZTNA/SASE), BeyondCorp model, OAuth 2.0 (Authorization Server/Resource Server), IDP integration"},
                        {"topic": "Advanced Kubernetes", "subtopics": "Custom Resource Definitions (CRDs), API aggregation, Advanced scheduling (Affinity/Anti-affinity/Taints/Tolerations), CSI"},
                        {"topic": "Observability Advanced", "subtopics": "OpenTelemetry (Manual instrumentation), Context propagation, SLO/SLI (Service Level Objectives/Indicators), Error budgets"},
                        {"topic": "Chaos Engineering", "subtopics": "Gremlin, Chaos Mesh, Litmus, Fault injection (Network/CPU/Memory), GameDays"},
                        {"topic": "Eventual Consistency", "subtopics": "CRDTs (Conflict-free Replicated Data Types), Read repair, Anti-entropy, Hinted handoff, Merkle trees"},
                        {"topic": "Code Quality", "subtopics": "Code review best practices, Static analysis (SonarQube/ESLint), Secure coding (OWASP Top 10), Technical debt management"},
                        {"topic": "High-Performance APIs", "subtopics": "10k+ QPS systems, Edge caching, Connection pooling, Reactive programming (RxJava/Project Reactor), Non-blocking I/O"},
                        {"topic": "Microservices Patterns", "subtopics": "API Gateway, Circuit Breaker, Service Discovery (Eureka/Consul), Client-side load balancing (Ribbon), Fallback strategies"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Distributed Systems Th", "subtopics": "FLP Impossibility, Byzantine faults, Quorum systems, Consensus lower bounds, Partition recovery, CAP theorem proofs"},
                        {"topic": "Advanced Raft", "subtopics": "Joint consensus, Membership changes, Log compaction, Read-only queries, Linearizable reads, Follower reads"},
                        {"topic": "Distributed Trans (Master)", "subtopics": "Percolator (Google's distributed transaction model), Spanner's TrueTime, 2PC with Paxos/Raft, Atomic commit protocols"},
                        {"topic": "Event Sourcing Advanced", "subtopics": "Event versioning, Schema evolution, Event replay, Time-travel queries, Event store optimization"},
                        {"topic": "Stream Processing", "subtopics": "Flink (Stateful processing/Checkpointing/Savepoints), Kafka Streams (KTable/KStream), Exactly-once semantics"},
                        {"topic": "Performance Engineering", "subtopics": "CPU profiling (Flamegraphs), Memory profiling (Heap dumps/Valgrind), I/O profiling (IOPS/Latency), Network profiling (TCP tuning)"},
                        {"topic": "Advanced Security", "subtopics": "Zero Trust Architecture (ZTA), Zero Trust Network Access (ZTNA), Mutual TLS, SPIFFE (Secure Production Identity Framework for Everyone)"},
                        {"topic": "Kubernetes Internals", "subtopics": "etcd (storage/watch), Controller Manager (Reconcile loop), Scheduler (Predicates/Priority functions), Kubelet (Pod lifecycle)"},
                        {"topic": "Distributed Tracing", "subtopics": "OpenTelemetry (W3C Trace Context/Baggage), Sampling (Head/Tail), Trace analysis (Jaeger/Tempo), Root cause detection"},
                        {"topic": "Chaos Engineering Adv", "subtopics": "Service-level chaos, Stateful chaos (Kafka/PostgreSQL), Automated game days, Chaos experiments as code"},
                        {"topic": "Platform Engineering", "subtopics": "Internal Developer Platform (IDP), Backstage, Infrastructure as Code (Crossplane), Golden paths"},
                        {"topic": "Software Architecture", "subtopics": "Evolutionary architecture, Domain-Driven Design (DDD), Event storming, Bounded contexts, Tactical patterns (Aggregates/Value Objects)"},
                        {"topic": "Cloud-Native Patterns", "subtopics": "Sidecar (Service Mesh), Ambassador (API Gateway), Adapter, Init container, Job/CronJob, Pod lifecycle management"}
                    ]
                }
            ]
        },
        {
            "id": "cloud",
            "name": "Cloud Computing (Bonus)",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Cloud Models", "subtopics": "Cloud models (IaaS/PaaS/SaaS/FaaS)"},
                        {"topic": "AWS", "subtopics": "EC2, S3, RDS, VPC, IAM, SNS, SQS"},
                        {"topic": "Azure", "subtopics": "VMs, Blob Storage, SQL Database, Functions, AKS"},
                        {"topic": "GCP", "subtopics": "Compute Engine, Cloud Storage, BigQuery, GKE"},
                        {"topic": "Basic IAM", "subtopics": "Users, Groups, Roles, Policies, MFA"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Serverless", "subtopics": "Lambda, Functions, Cloud Run"},
                        {"topic": "Auto-scaling", "subtopics": "EC2 Auto Scaling, Instance Groups"},
                        {"topic": "Load balancing", "subtopics": "ALB, NLB, Application Gateway"},
                        {"topic": "Caching", "subtopics": "ElastiCache, CloudFront, Azure CDN"},
                        {"topic": "Database", "subtopics": "DynamoDB, Cosmos DB, Cloud Spanner"},
                        {"topic": "Monitoring", "subtopics": "CloudWatch, Azure Monitor, Stackdriver"},
                        {"topic": "Networking", "subtopics": "VPC Peering, VPN, Direct Connect, ExpressRoute"},
                        {"topic": "DevOps on Cloud", "subtopics": "CodePipeline, CodeBuild, CodeDeploy, GitHub Actions"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Multi-cloud", "subtopics": "Multi-cloud strategies, Vendor lock-in mitigation"},
                        {"topic": "IaC", "subtopics": "Terraform for cloud (AWS/Azure/GCP providers)"},
                        {"topic": "Cloud Design Patterns", "subtopics": "Bulkhead, Circuit Breaker, Saga"},
                        {"topic": "Serverless architectures", "subtopics": "Event-driven, Fan-out/Fan-in"},
                        {"topic": "Cost optimization", "subtopics": "Spot instances, Reserved, Savings plans"},
                        {"topic": "Cloud security", "subtopics": "IAM best practices, AWS WAF/Shield, Inspector"},
                        {"topic": "Hybrid cloud", "subtopics": "Outposts, Azure Stack, Anthos"},
                        {"topic": "Disaster recovery", "subtopics": "RPO/RTO, Multi-region, Backup strategies"},
                        {"topic": "Serverless monitoring", "subtopics": "X-Ray, Distributed tracing"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Enterprise Architecture", "subtopics": "Enterprise architecture on cloud"},
                        {"topic": "Cloud-native App Dev", "subtopics": "Cloud-native application development (12-factor app)"},
                        {"topic": "Kubernetes on cloud", "subtopics": "EKS, AKS, GKE - advanced"},
                        {"topic": "Service mesh on cloud", "subtopics": "Istio, Linkerd"},
                        {"topic": "Cloud security", "subtopics": "Zero Trust, Cloud-native security"},
                        {"topic": "Cost management", "subtopics": "Advanced cost management (Reserved/Savings/Spot)"},
                        {"topic": "Cloud automation", "subtopics": "Terraform Enterprise, Pulumi"},
                        {"topic": "Performance", "subtopics": "Performance benchmarking on cloud"},
                        {"topic": "DR Automation", "subtopics": "Disaster recovery automation (Chaos engineering)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Hyperscale", "subtopics": "Hyperscale architectures (AWS S3/DynamoDB internals)"},
                        {"topic": "Google Spanner", "subtopics": "Google Spanner (TrueTime/Global distribution)"},
                        {"topic": "Amazon Aurora", "subtopics": "Amazon Aurora (Log is the database)"},
                        {"topic": "Azure Cosmos DB", "subtopics": "Azure Cosmos DB (Multi-model/Global distribution)"},
                        {"topic": "Cloud-native Networking", "subtopics": "Cilium, Calico"},
                        {"topic": "Advanced Security", "subtopics": "Privileged Access Management"},
                        {"topic": "FinOps", "subtopics": "Financial Operations in cloud"},
                        {"topic": "Cloud migration", "subtopics": "Cloud migration strategies (6 Rs: Rehost/Replatform/Refactor/etc)"},
                        {"topic": "Quantum computing", "subtopics": "Quantum computing on cloud (AWS Braket/Azure Quantum)"}
                    ]
                }
            ]
        },
        {
            "id": "security",
            "name": "Security (Bonus)",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Fundamentals", "subtopics": "CIA Triad (Confidentiality/Integrity/Availability), Authentication vs Authorization"},
                        {"topic": "Cryptography", "subtopics": "Encryption (Symmetric/Asymmetric), Hashing (SHA/MD5), SSL/TLS basics (Certificates/Handshake), Password hashing (bcrypt/Argon2/PBKDF2)"},
                        {"topic": "Network Security", "subtopics": "Firewalls (Stateless/Stateful)"},
                        {"topic": "Web Security", "subtopics": "OWASP Top 10 (Injection/XSS/CSRF/Broken Auth/etc)"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Infrastructure", "subtopics": "Public Key Infrastructure (PKI), Certificate Authorities (CA), Transport Layer Security (TLS 1.2/1.3) - deep dive"},
                        {"topic": "Authentication Auth", "subtopics": "OAuth 2.0 flows (Authorization Code/Client Credentials/PKCE), OpenID Connect (OIDC), SAML 2.0, JWT (RS256/HS256/ES256) - security best practices"},
                        {"topic": "Web Security", "subtopics": "CORS, CSP, HSTS, X-Frame-Options"},
                        {"topic": "Network Security", "subtopics": "VPC Security Groups, NACLs, Firewall Rules"},
                        {"topic": "Identity Access", "subtopics": "Identity and Access Management (IAM), RBAC, ABAC"},
                        {"topic": "System Hardening", "subtopics": "CIS Benchmarks, NIST guidelines"},
                        {"topic": "Vulnerability Mgmt", "subtopics": "Vulnerability scanning (Nessus/OpenVAS/Trivy), Secret management (Vault/AWS Secrets Manager/Doppler)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Zero Trust", "subtopics": "Zero Trust Architecture (ZTA), BeyondCorp model, Zero Trust Network Access (ZTNA), SASE (Secure Access Service Edge)"},
                        {"topic": "Segmentation", "subtopics": "Secure Multi-Tenancy, Micro-segmentation"},
                        {"topic": "Threat Modeling", "subtopics": "STRIDE, DREAD, Attack trees"},
                        {"topic": "DevSecOps", "subtopics": "SAST, DAST, IAST, RASP"},
                        {"topic": "Container Security", "subtopics": "Image scanning, Admission controllers, Kubernetes security (Pod Security Standards/Network policies)"},
                        {"topic": "Cloud Security", "subtopics": "AWS IAM, Azure AD, GCP IAM - advanced"},
                        {"topic": "Incident Response", "subtopics": "Playbooks, Tabletop exercises, Forensics"},
                        {"topic": "Compliance Supply", "subtopics": "Security compliance (SOC 2/HIPAA/PCI DSS/GDPR), Supply chain security (SBOM/Software attestation)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Zero Trust Implementation", "subtopics": "Zero Trust Architecture implementation"},
                        {"topic": "Threat Hunting", "subtopics": "Threat hunting (MITRE ATT&CK framework)"},
                        {"topic": "Advanced Cryptography", "subtopics": "Post-quantum, Homomorphic encryption"},
                        {"topic": "Secure SDLC", "subtopics": "Secure software development (SSDF/Secure SDLC)"},
                        {"topic": "Threat Intelligence", "subtopics": "STIX/TAXII, MISP"},
                        {"topic": "Penetration Testing", "subtopics": "Manual, Automation"},
                        {"topic": "Architecture Governance", "subtopics": "Cloud security architecture (Well-Architected Framework), Identity governance (IGA), Privileged Access Management (PAM)"},
                        {"topic": "Advanced Monitoring", "subtopics": "SIEM, UEBA, SOAR"},
                        {"topic": "Disaster Recovery", "subtopics": "Disaster recovery planning (Cybersecurity)"},
                        {"topic": "Data Governance", "subtopics": "Data classification, DLP"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Security Research", "subtopics": "Zero-day, CVE, Bug bounty"},
                        {"topic": "Advanced Cryptography", "subtopics": "ZKP, MPC, FHE, Homomorphic"},
                        {"topic": "Quantum Security", "subtopics": "Post-quantum crypto, QKD"},
                        {"topic": "Security Automation", "subtopics": "Security as Code, Compliance automation (Regulatory as Code)"},
                        {"topic": "AI in Security", "subtopics": "Security Copilot, AI-driven threat detection"},
                        {"topic": "Cyber Threat Intel", "subtopics": "Cyber threat intelligence (CTI) - advanced"},
                        {"topic": "Architecture Review", "subtopics": "Security architecture review (Enterprise-wide)"},
                        {"topic": "Frameworks", "subtopics": "Cybersecurity frameworks (NIST CSF/ISO 27001/COBIT), Security maturity model (CMMC/NIST maturity)"},
                        {"topic": "Responsible Disclosure", "subtopics": "Bug bounty program management, Responsible disclosure, Coordinated Vulnerability Disclosure (CVD)"}
                    ]
                }
            ]
        },
        {
            "id": "web3",
            "name": "Web3 / Blockchain (Bonus)",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Blockchain Basics", "subtopics": "Decentralization, Immutability, Consensus"},
                        {"topic": "Bitcoin", "subtopics": "UTXO model, Mining, Proof of Work"},
                        {"topic": "Ethereum", "subtopics": "Accounts, Smart contracts, Gas"},
                        {"topic": "Wallets & Transactions", "subtopics": "MetaMask, Ledger, TrustWallet, Nonce, Signing, Broadcast"},
                        {"topic": "Nodes & Consensus", "subtopics": "Full Node, Light Node, Archive Node, PoW, PoS, DPoS"},
                        {"topic": "Smart Contracts Basics", "subtopics": "Solidity basics (Variables/Functions/Events), ERC-20, ERC-721, ERC-1155, Remix IDE, Hardhat basics, Web3.js, Ethers.js"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "EVM Internals", "subtopics": "Ethereum Virtual Machine (EVM) internals"},
                        {"topic": "DApps", "subtopics": "Decentralized Applications (DApps) architecture"},
                        {"topic": "Smart Contract Dev", "subtopics": "Smart contract patterns (Reentrancy guard/Access control), Smart contract security (Vulnerabilities/Audits), Gas optimization techniques, Upgradable contracts (UUPS/Transparent/Beacon)"},
                        {"topic": "Oracles", "subtopics": "Chainlink, API3, Pyth"},
                        {"topic": "DeFi Basics", "subtopics": "Decentralized Finance (DeFi) basics, Decentralized Exchanges (DEX) - Uniswap/SushiSwap, Stablecoins (DAI/USDC/USDT)"},
                        {"topic": "NFTs & Storage", "subtopics": "NFTs (Non-Fungible Tokens) - marketplaces/royalties, IPFS, Arweave (Decentralized storage)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Layer 2 Scaling", "subtopics": "Rollups - Optimistic, ZK-Rollups, State channels (Lightning Network/Raiden)"},
                        {"topic": "ZK-Rollups", "subtopics": "zkSync, StarkNet, Scroll"},
                        {"topic": "Optimistic Rollups", "subtopics": "Arbitrum, Optimism, Base"},
                        {"topic": "Sidechains Bridges", "subtopics": "Sidechains (Polygon/Boba/Metis), Bridges (Wormhole/LayerZero/Axelar), Cross-chain messaging (IBC/CCIP)"},
                        {"topic": "Advanced DeFi", "subtopics": "Yield farming, Liquidity pools, AAVE (Flash loans), Compound (Interest rates), Curve (Stable swaps), Balancer (Weighted pools)"},
                        {"topic": "Zero-Knowledge Proofs", "subtopics": "zk-SNARKs, zk-STARKs, PLONK, Privacy-preserving protocols (Aztec/Zcash)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "DeFi Protocol Design", "subtopics": "DeFi protocol design (Uniswap V3 concentrated liquidity)"},
                        {"topic": "Advanced ZK", "subtopics": "Advanced ZK circuits (Circom/Cairo), ZK-rollup architecture (zkSync Era/StarkNet)"},
                        {"topic": "MEV", "subtopics": "MEV (Miner/Maximal Extractable Value) - strategies/protection"},
                        {"topic": "Governance DAOs", "subtopics": "On-chain governance (Snapshot/Aragon/Compound), DAO (Decentralized Autonomous Organization) design"},
                        {"topic": "Wallets Accounts", "subtopics": "Multi-sig wallets (Safe/ Gnosis Safe), Account Abstraction (ERC-4337)"},
                        {"topic": "Security Interop", "subtopics": "Network security (51% attacks/Sybil attacks), Cross-chain interoperability (LayerZero/Axelar)"},
                        {"topic": "Asset Tokenization", "subtopics": "Real-world assets, Security tokens"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "ZK Research", "subtopics": "Zero-Knowledge Proofs research (ZK-SNARKs/ZK-STARKs), Advanced cryptography (Pairing curves/KZG commitments), Intent-based architectures (ERC-4337), Co-processors (ZK coprocessors/Axiom), ZK Machine Learning (zkML)"},
                        {"topic": "Advanced Crypto", "subtopics": "Fully Homomorphic Encryption in Web3"},
                        {"topic": "Protocol Design", "subtopics": "Protocol design (Cosmos SDK/Substrate)"},
                        {"topic": "Modular Blockchains", "subtopics": "Modular blockchains (Celestia/Dymension), Data availability layers (EigenDA/Celestia), Rollup frameworks (OP Stack/Arbitrum Orbit/zkSync Hyperchain)"},
                        {"topic": "MEV Research", "subtopics": "MEV research (PBS/MEV-boost/MEV-Share)"},
                        {"topic": "Decentralized Infra", "subtopics": "Decentralized infrastructure (Worldcoin/Filecoin/Akash)"},
                        {"topic": "Crypto-economics", "subtopics": "Crypto-economics design, Formal verification of smart contracts"}
                    ]
                }
            ]
        },
        {
            "id": "datascience",
            "name": "Data Science (Bonus)",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Data Types Exploration", "subtopics": "Data types (Numerical/Categorical/Text), Data exploration (Summary statistics/EDA)"},
                        {"topic": "Python for DS", "subtopics": "Pandas (DataFrames/Series/GroupBy), NumPy (Arrays/Broadcasting)"},
                        {"topic": "Data Visualization", "subtopics": "Matplotlib, Seaborn, Plotly"},
                        {"topic": "Statistics Probability", "subtopics": "Statistics (Mean/Median/Mode/Standard Deviation), Probability (Distributions/Bayes theorem), Correlation (Pearson/Spearman), Hypothesis testing (t-test/Chi-square/ANOVA)"},
                        {"topic": "Data Cleaning", "subtopics": "Data cleaning (Missing values/Outliers), Data preprocessing (Encoding/Scaling)"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "Feature Engineering", "subtopics": "Polynomial features, Binning, Log transform, Feature selection (Filter/Wrapper/Embedded methods)"},
                        {"topic": "Dimensionality Reduction", "subtopics": "PCA, t-SNE, UMAP, LDA"},
                        {"topic": "Time Series", "subtopics": "Time series analysis (Decomposition/ACF/PACF), Forecasting (ARIMA/SARIMA/Prophet/Exponential smoothing)"},
                        {"topic": "Anomaly Clustering", "subtopics": "Anomaly detection (Isolation Forest/DBSCAN/Z-score), Clustering (K-means/Hierarchical/DBSCAN/Gaussian Mixture)"},
                        {"topic": "Advanced EDA", "subtopics": "Automated EDA, Sweetviz, Pandas Profiling"},
                        {"topic": "Data Storytelling", "subtopics": "Dashboard design, Tableau, PowerBI"},
                        {"topic": "Experimentation", "subtopics": "A/B testing (Design/Statistical significance)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Big Data Processing", "subtopics": "Spark, Hadoop, Dask, Ray"},
                        {"topic": "Data Pipelines", "subtopics": "Feature stores (Feast/Tecton/Vertex AI Feature Store), Data pipelines (ETL/ELT/Airflow/Prefect/Dagster), Data versioning (DVC/LakeFS/Delta Lake)"},
                        {"topic": "Data Lakes Warehousing", "subtopics": "Data lakes (Delta Lake/Apache Iceberg/Hudi), Data warehousing (Snowflake/Redshift/BigQuery)"},
                        {"topic": "Advanced Forecasting", "subtopics": "Time series forecasting (LSTM/XGBoost for TS/Prophet)"},
                        {"topic": "Advanced Inference", "subtopics": "Bayesian inference (MCMC/PyMC/Stan), Causal inference (DiD/RDD/Instrumental variables)"},
                        {"topic": "NLP Advanced", "subtopics": "Text mining (Sentiment/Topic modeling/NER), Advanced NLP (BERT/Transformers/Embeddings)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "Real-time Pipelines", "subtopics": "Real-time data pipelines (Kafka Streams/Flink)"},
                        {"topic": "Data Governance", "subtopics": "Data quality frameworks (Great Expectations/Deequ), Data governance (Data catalog/Lineage/Metadata), Data mesh (Domain-driven data ownership), Data observability (Monte Carlo/Soda/Datadog)"},
                        {"topic": "AutoML", "subtopics": "Feature engineering automation (Featuretools), AutoML for DS (Optuna/Hyperopt/Auto-sklearn)"},
                        {"topic": "Responsible AI", "subtopics": "Responsible AI (Fairness/Bias/Explainability), Differential privacy for data sharing"},
                        {"topic": "Synthetic Multi-modal", "subtopics": "Synthetic data generation (GANs/SDV), Multi-modal data analysis (Images + Text + Tabular)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Advanced Causal", "subtopics": "Advanced causal inference (Causal graphs/Do-calculus), Causal discovery (PC/FCI/GES algorithms)"},
                        {"topic": "Advanced Modeling", "subtopics": "Gaussian processes (Bayesian optimization), Deep generative models (VAEs/Diffusion for data)"},
                        {"topic": "Data-centric AI", "subtopics": "Data quality research (Data hygiene/Anomaly resolution), Data-centric AI (Focus on data quality over algorithms), Automated data pipeline optimization, Continuous integration for data (Data CI/CD)"},
                        {"topic": "Data Quality metrics", "subtopics": "Data quality metrics (Completeness/Accuracy/Timeliness), ML+DS integration (Bringing ML to data pipelines), Data contract management (Schema evolution/Backwards compatibility)"}
                    ]
                }
            ]
        },
        {
            "id": "backend",
            "name": "Backend Development (Bonus)",
            "levels": [
                {
                    "level": "⭐ Basic",
                    "topics": [
                        {"topic": "Backend Fundamentals", "subtopics": "HTTP/HTTPS protocols, RESTful APIs, Environment variables, .env files"},
                        {"topic": "Frameworks", "subtopics": "Python (Flask/Django/FastAPI), Node.js (Express/NestJS), Java (Spring Boot basics), C# (.NET Core/ASP.NET)"},
                        {"topic": "Database Auth", "subtopics": "Database integration (SQL/ORMs), Authentication (JWT/Sessions/Cookies)"},
                        {"topic": "Documentation Testing", "subtopics": "API documentation (Swagger/OpenAPI), Basic testing (Unit tests/Integration tests), Logging (Basic/File-based)"}
                    ]
                },
                {
                    "level": "⭐⭐ Intermediate",
                    "topics": [
                        {"topic": "API Design", "subtopics": "API design (REST best practices/HATEOAS), Versioning (URL/Header/Query parameter), Rate limiting (Token bucket/Leaky bucket)"},
                        {"topic": "Architecture", "subtopics": "Caching strategies (Redis/Memcached/CDN), Message queues (RabbitMQ/SQS/Celery), Asynchronous processing (Background jobs/Workers), WebSockets (Real-time/Socket.IO)"},
                        {"topic": "Microservices Basics", "subtopics": "Microservices architecture basics, Service discovery (Eureka/Consul/Zookeeper), Load balancing (L4/L7)"},
                        {"topic": "Database Security", "subtopics": "Database connection pooling, Security (CORS/CSP/OAuth)"},
                        {"topic": "DevOps Containerization", "subtopics": "CI/CD for backend (GitHub Actions/Jenkins), Containerization (Docker/Docker Compose)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐ Advanced",
                    "topics": [
                        {"topic": "Microservices Patterns", "subtopics": "Microservices patterns (Saga/CQRS/Event sourcing), Event-driven architecture (Kafka/RabbitMQ), API Gateway (Kong/Envoy/NGINX), Circuit breaker (Hystrix/Resilience4j), Retry with backoff (Exponential/Jitter)"},
                        {"topic": "Observability Profiling", "subtopics": "Distributed tracing (Jaeger/Zipkin), Performance profiling (Memory/CPU)"},
                        {"topic": "Optimization", "subtopics": "Database optimization (Indexing/Query tuning), Caching patterns (Write-through/Write-behind), Graceful shutdown, Health checks"},
                        {"topic": "Experimentation", "subtopics": "Feature flags (LaunchDarkly/Split.io), A/B testing in backend"},
                        {"topic": "Advanced Frameworks", "subtopics": "Serverless backend (AWS Lambda/Azure Functions), GraphQL (Apollo/Hasura)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐ Expert",
                    "topics": [
                        {"topic": "High-Performance APIs", "subtopics": "High-performance APIs (10k+ QPS), Distributed systems design"},
                        {"topic": "Service Mesh Observability", "subtopics": "Service mesh (Istio/Linkerd/Consul), Chaos engineering (Gremlin/Chaos Mesh), Observability stack (Prometheus/Grafana/Loki), Distributed tracing (W3C Trace Context)"},
                        {"topic": "Security Scalability", "subtopics": "Backend security (Zero Trust/ZTNA), Scalability patterns (Sharding/Replication), Eventual consistency patterns (CRDTs/Vector clocks)"},
                        {"topic": "Advanced Patterns", "subtopics": "Backend for Frontend (BFF) pattern, GraphQL federation (Apollo Federation), Database migration strategies (Blue/Green/Canary)"},
                        {"topic": "Resilience", "subtopics": "Disaster recovery (Backup/Restore/Replica), Performance tuning (Garbage collection/Threading)"}
                    ]
                },
                {
                    "level": "⭐⭐⭐⭐⭐ Master",
                    "topics": [
                        {"topic": "Global Scale Design", "subtopics": "Distributed consensus (Raft/Paxos), Design for high availability (99.99% uptime), Global-scale backend design"},
                        {"topic": "Advanced Observability", "subtopics": "Advanced observability (eBPF/OpenTelemetry)"},
                        {"topic": "SRE Practices", "subtopics": "Auto-scaling (Kubernetes HPA/VPA), Self-healing systems, Backend reliability engineering (SRE practices), Capacity planning and forecasting"},
                        {"topic": "Global State", "subtopics": "Distributed caching at global scale, Data consistency at global scale, Event-driven microservices at scale"},
                        {"topic": "Platform Engineering", "subtopics": "Platform engineering (Internal Developer Platforms), Backend security architecture (Zero Trust enterprise), Advanced performance engineering (Profiling at scale)"}
                    ]
                }
            ]
        }
    ]
}

new_curriculum = {"domains": []}

for domain in curriculum["domains"]:
    new_domain = {"id": domain["id"], "name": domain["name"], "levels": []}
    for level in domain["levels"]:
        new_level = {"level": level["level"], "topics": []}
        for topic in level["topics"]:
            subtopics_str = topic["subtopics"]
            # Split by comma
            sub_list = [s.strip() for s in subtopics_str.split(",")]
            new_subtopics = []
            for sub in sub_list:
                if not sub:
                    continue
                # Generate a Google search query link for the resource
                query = f"{domain['name']} {topic['topic']} {sub}".replace("&", "and")
                encoded_query = urllib.parse.quote_plus(query)
                url = f"https://www.google.com/search?q={encoded_query}"
                new_subtopics.append({
                    "name": sub,
                    "resource": {
                        "title": "Search Resource",
                        "url": url
                    }
                })
            new_level["topics"].append({"topic": topic["topic"], "subtopics": new_subtopics})
        new_domain["levels"].append(new_level)
    new_curriculum["domains"].append(new_domain)

js_content = f"const curriculumData = {json.dumps(new_curriculum, indent=4)};\n"

with open("/Users/chandanmanne/Desktop/placement_prep/todo_pre_placement.github.io/data.js", "w") as f:
    f.write(js_content)
