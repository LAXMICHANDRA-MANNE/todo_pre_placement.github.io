const curriculumData = {
    "domains": [
        {
            "id": "dsa",
            "name": "Data Structures & Algorithms",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Arrays",
                            "subtopics": "1D, 2D, Multi-dimensional, Declaration, Traversal, Insertion, Deletion, Rotation, Reversal"
                        },
                        {
                            "topic": "Strings",
                            "subtopics": "Immutability, StringBuilder, Palindrome, Anagram, Substring, Pattern matching (Naive)"
                        },
                        {
                            "topic": "Linked Lists",
                            "subtopics": "Singly, Doubly, Circular, Traversal, Insertion, Deletion, Reversal, Cycle detection (Floyd's)"
                        },
                        {
                            "topic": "Stacks",
                            "subtopics": "LIFO, Array-based, LinkedList-based, Push, Pop, Peek, Infix/Postfix/Prefix conversion"
                        },
                        {
                            "topic": "Queues",
                            "subtopics": "FIFO, Circular, Deque, Enqueue, Dequeue, Priority Queue (Min/Max heap basics)"
                        },
                        {
                            "topic": "Recursion",
                            "subtopics": "Base case, Recursive case, Factorial, Fibonacci, Tower of Hanoi, Backtracking basics"
                        },
                        {
                            "topic": "Sorting Basics",
                            "subtopics": "Bubble, Selection, Insertion, O(n\u00b2) algorithms, In-place vs Stable"
                        },
                        {
                            "topic": "Searching",
                            "subtopics": "Linear, Binary (iterative/recursive), Time complexity analysis"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Advanced Sorting",
                            "subtopics": "Merge Sort, Quick Sort, Heap Sort, Divide & Conquer, Pivot selection, 3-way partitioning, Timsort"
                        },
                        {
                            "topic": "Hashing",
                            "subtopics": "HashMaps, HashSets, HashTables, Collision resolution (Chaining, Open Addressing), Load factor, Rehashing"
                        },
                        {
                            "topic": "Trees",
                            "subtopics": "BST, AVL, Red-Black Trees, Insertion, Deletion, Rotation, Balance factors, In-order/Pre/Post traversal"
                        },
                        {
                            "topic": "Binary Heaps",
                            "subtopics": "Min-Heap, Max-Heap, Priority Queue, Heapify, Extract Min/Max, Decrease/Increase key, Build heap"
                        },
                        {
                            "topic": "Graphs (Basic)",
                            "subtopics": "Adjacency Matrix, Adjacency List, BFS, DFS, Connected components, Cycle detection (Undirected)"
                        },
                        {
                            "topic": "Greedy Algorithms",
                            "subtopics": "Activity Selection, Huffman Coding, Fractional Knapsack, Interval Scheduling, Coin Change"
                        },
                        {
                            "topic": "Dynamic Programming (Basic)",
                            "subtopics": "Memoization vs Tabulation, Fibonacci, Climbing Stairs, Grid Paths (2D DP)"
                        },
                        {
                            "topic": "Bit Manipulation",
                            "subtopics": "AND, OR, XOR, NOT, Shifts, Bit masking, Subset generation, Power of 2 checks, Counting bits"
                        },
                        {
                            "topic": "Divide & Conquer",
                            "subtopics": "Merge Sort, Quick Sort, Binary Search, Master's theorem, Karatsuba multiplication"
                        },
                        {
                            "topic": "Sliding Window",
                            "subtopics": "Fixed size, Variable size, Maximum sum subarray, Longest substring without repeat"
                        },
                        {
                            "topic": "Two Pointers",
                            "subtopics": "Opposite direction, Same direction, 3Sum, Trapping Rainwater, Pair with given sum"
                        },
                        {
                            "topic": "Trie",
                            "subtopics": "Insert, Search, Prefix Search, Autocomplete, Spell checker, Word break"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Graph Algorithms",
                            "subtopics": "Dijkstra, Bellman-Ford, Floyd-Warshall, Single-source shortest path, Negative cycles"
                        },
                        {
                            "topic": "Advanced Graph",
                            "subtopics": "MST (Kruskal, Prim), Topological Sort, DAG applications, Disjoint Set Union (DSU/Union-Find), Path compression"
                        },
                        {
                            "topic": "Advanced Trees",
                            "subtopics": "Fenwick Tree (BIT), Segment Tree, Sparse Table, Range queries, Lazy propagation, Point/Range updates, GCD queries"
                        },
                        {
                            "topic": "Advanced DP",
                            "subtopics": "0/1 Knapsack, LCS, LIS, Matrix Chain, DP optimization (Knuth, Divide & Conquer), Bitmask DP"
                        },
                        {
                            "topic": "Backtracking",
                            "subtopics": "N-Queens, Sudoku, Hamiltonian Cycle, Graph coloring, Knight's tour, Permutation generation"
                        },
                        {
                            "topic": "String Algorithms",
                            "subtopics": "KMP, Rabin-Karp, Z-algorithm, Pattern matching, Rolling hash, String matching optimization"
                        },
                        {
                            "topic": "Advanced Data Structures",
                            "subtopics": "Treap, Suffix Array, Suffix Automaton, Randomized BST, String processing, Pattern matching"
                        },
                        {
                            "topic": "Computational Geometry",
                            "subtopics": "Convex Hull, Closest Pair, Line Sweep, Graham scan, Andrew's monotone chain, Intersection detection"
                        },
                        {
                            "topic": "Advanced Searching",
                            "subtopics": "A*, Beam Search, Ternary Search, Heuristic search, State space search, Optimization"
                        },
                        {
                            "topic": "Flow Networks",
                            "subtopics": "Max Flow (Ford-Fulkerson, Dinic's), Min Cut theorem, Bipartite matching, Max bipartite matching"
                        },
                        {
                            "topic": "Mathematical",
                            "subtopics": "FFT, NTT, CRT, Matrix Exponentiation, Polynomial multiplication, Large integer multiplication"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Advanced Flow",
                            "subtopics": "Push-Relabel, MCMF (Min Cost Max Flow), Capacity scaling, Flow decomposition, Circulation"
                        },
                        {
                            "topic": "Advanced String",
                            "subtopics": "Suffix Automaton, Palindromic Tree (Eertree), Online string algorithms, Applications in bioinformatics"
                        },
                        {
                            "topic": "Advanced Geometry",
                            "subtopics": "Polygon triangulation, Half-plane intersection, Computational geometry library implementation"
                        },
                        {
                            "topic": "Advanced DP",
                            "subtopics": "DP on Trees, Digit DP, DP with bitmask, Tree diameter, Maximum independent set, Counting problems"
                        },
                        {
                            "topic": "Advanced Graphs",
                            "subtopics": "Strongly Connected Components (SCC), 2-SAT, Tarjan's, Kosaraju's, Articulation points, Bridges"
                        },
                        {
                            "topic": "Persistent DS",
                            "subtopics": "Persistent Segment Tree, Persistent Trie, Versioning in data structures, Rollback functionality"
                        },
                        {
                            "topic": "Advanced Trees",
                            "subtopics": "Link-Cut Tree, Euler Tour Tree, Centroid Decomposition, Dynamic tree problems, Path queries"
                        },
                        {
                            "topic": "Advanced Hashing",
                            "subtopics": "Universal hashing, Cryptographic hashing, Perfect hashing, FIPS standards, Bloom filters"
                        },
                        {
                            "topic": "Advanced Search",
                            "subtopics": "Simulated Annealing, Genetic Algorithms, MCTS, Heuristic optimization, Game playing AI"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Algorithm Design",
                            "subtopics": "Combinatorial optimization, Approximation algorithms, NP-Hard problems, PTAS, Randomized algorithms"
                        },
                        {
                            "topic": "Parallel Algorithms",
                            "subtopics": "MapReduce, GPU algorithms, Distributed DSA, CUDA, OpenMP, Spark"
                        },
                        {
                            "topic": "Advanced Math",
                            "subtopics": "Berlekamp-Massey, Linear recurrence, Polynomial hashing, Algebraic algorithms"
                        },
                        {
                            "topic": "Spectral Algorithms",
                            "subtopics": "Spectral graph theory, PageRank, Eigenvalue computation, Laplacian matrices"
                        },
                        {
                            "topic": "Quantum Algorithms",
                            "subtopics": "Grover's Search, Shor's Algorithm, Quantum computing fundamentals, Qiskit implementation"
                        }
                    ]
                }
            ]
        },
        {
            "id": "dbms",
            "name": "Database Management Systems",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Database Fundamentals",
                            "subtopics": "Database vs DBMS, File system vs DB, Data models"
                        },
                        {
                            "topic": "SQL Basics",
                            "subtopics": "DDL, DML, DCL, TCL, CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT"
                        },
                        {
                            "topic": "Constraints",
                            "subtopics": "PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK"
                        },
                        {
                            "topic": "Basic Joins",
                            "subtopics": "INNER, LEFT, RIGHT, FULL OUTER, Cross join, Self join"
                        },
                        {
                            "topic": "Functions",
                            "subtopics": "Aggregate (COUNT, SUM, AVG), GROUP BY, HAVING"
                        },
                        {
                            "topic": "ER Modeling",
                            "subtopics": "Entities, Attributes, Relationships, Cardinality"
                        },
                        {
                            "topic": "Normalization",
                            "subtopics": "1NF, 2NF, 3NF, BCNF, Functional dependencies, Anomalies"
                        },
                        {
                            "topic": "Indexing Basics",
                            "subtopics": "Primary index, Clustered vs Non-clustered, B-Tree basics"
                        },
                        {
                            "topic": "Views & Subqueries",
                            "subtopics": "Simple views, Nested, Correlated, Scalar, EXISTS, IN, CTEs"
                        },
                        {
                            "topic": "Transactions",
                            "subtopics": "ACID properties, BEGIN/COMMIT/ROLLBACK, Read Uncommitted"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Advanced SQL",
                            "subtopics": "Window functions (ROW_NUMBER, RANK, LEAD/LAG), PARTITION BY"
                        },
                        {
                            "topic": "Complex Queries",
                            "subtopics": "Recursive CTEs, Hierarchical queries"
                        },
                        {
                            "topic": "Advanced Indexing",
                            "subtopics": "Composite indexes, Covering indexes, Partial indexes"
                        },
                        {
                            "topic": "Query Optimization",
                            "subtopics": "EXPLAIN/EXPLAIN ANALYZE, Query execution plans"
                        },
                        {
                            "topic": "Transactions & Isolation",
                            "subtopics": "Read Committed, Repeatable Read, Serializable, Read phenomena"
                        },
                        {
                            "topic": "Concurrency Control & MVCC",
                            "subtopics": "Locking (2PL), Deadlocks, Version chains, Tuple visibility"
                        },
                        {
                            "topic": "Stored Procedures & Triggers",
                            "subtopics": "Input/Output parameters, Cursors, BEFORE/AFTER/INSTEAD OF"
                        },
                        {
                            "topic": "Sharding & Replication",
                            "subtopics": "Horizontal/Vertical sharding, Master-Slave, Sync/Async"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Distributed Transactions",
                            "subtopics": "2PC, 3PC, Atomicity in distributed systems"
                        },
                        {
                            "topic": "Consensus",
                            "subtopics": "Paxos/Raft, Consensus algorithms, Leader election"
                        },
                        {
                            "topic": "Database Internals",
                            "subtopics": "Storage engines, WAL, Buffer manager"
                        },
                        {
                            "topic": "LSM Tree",
                            "subtopics": "Memtable, SSTable, Compaction strategies"
                        },
                        {
                            "topic": "Query Compilation",
                            "subtopics": "JIT compilation, LLVM-based, Code generation"
                        },
                        {
                            "topic": "NewSQL/HTAP",
                            "subtopics": "Hybrid Transactional/Analytical Processing, TiDB, Spanner"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Cloud Databases",
                            "subtopics": "Aurora architecture, Spanner (TrueTime), Serverless DB"
                        },
                        {
                            "topic": "Advanced Partitioning",
                            "subtopics": "Composite partitioning, Subpartitioning, Partition pruning"
                        },
                        {
                            "topic": "Disaster Recovery",
                            "subtopics": "RPO, RTO, Geo-redundancy, Point-in-time recovery"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Transaction Theory",
                            "subtopics": "Serializability theory, View serializability, Precedence graph"
                        },
                        {
                            "topic": "Vectorization",
                            "subtopics": "Advanced vectorized execution, SIMD instructions"
                        },
                        {
                            "topic": "Machine Learning for DB",
                            "subtopics": "Learned indexes, Automatic tuning, Workload analysis"
                        }
                    ]
                }
            ]
        },
        {
            "id": "os",
            "name": "Operating Systems",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "OS Fundamentals",
                            "subtopics": "Kernel, Shell, System calls, User/Kernel mode"
                        },
                        {
                            "topic": "Process Management",
                            "subtopics": "Process states, PCB, fork/exec, Zombie/Orphan"
                        },
                        {
                            "topic": "CPU Scheduling",
                            "subtopics": "FCFS, SJF, SRTF, Round Robin, Priority, Context switching"
                        },
                        {
                            "topic": "Process Synchronization",
                            "subtopics": "Critical section, Mutex, Semaphores"
                        },
                        {
                            "topic": "Deadlocks",
                            "subtopics": "Hold & Wait, Banker's Algorithm, Detection, Recovery"
                        },
                        {
                            "topic": "Memory Management",
                            "subtopics": "Contiguous allocation, Paging, Segmentation, TLB"
                        },
                        {
                            "topic": "Virtual Memory",
                            "subtopics": "Demand paging, Page replacement (FIFO, LRU, Optimal)"
                        },
                        {
                            "topic": "File Systems",
                            "subtopics": "Directories, File operations, Access methods"
                        },
                        {
                            "topic": "Shell Basics",
                            "subtopics": "Bash/Shell scripting, File permissions, Pipes"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Advanced CPU Scheduling",
                            "subtopics": "MLFQ, CFS, Real-time scheduling"
                        },
                        {
                            "topic": "Advanced Synchronization",
                            "subtopics": "Monitors, Condition variables, Spinlocks, Read-Write locks"
                        },
                        {
                            "topic": "Advanced Virtual Memory",
                            "subtopics": "Working set model, Copy-on-Write (COW), OOM Killer"
                        },
                        {
                            "topic": "Advanced File Systems",
                            "subtopics": "Journaling (EXT3/4), Log-structured FS"
                        },
                        {
                            "topic": "IPC Advanced",
                            "subtopics": "Pipes, Message Queues, Shared memory, Sockets, Signals"
                        },
                        {
                            "topic": "Virtualization & Containers",
                            "subtopics": "Hypervisors, Docker namespaces, cgroups, Volumes"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Kernel Internals",
                            "subtopics": "Linux architecture, VFS, Device driver model"
                        },
                        {
                            "topic": "Advanced Memory",
                            "subtopics": "SLAB/SLUB allocator, Buddy allocator, KSM, NUMA"
                        },
                        {
                            "topic": "I/O Advanced",
                            "subtopics": "io_uring, Direct I/O, Memory-mapped I/O"
                        },
                        {
                            "topic": "Performance Analysis",
                            "subtopics": "perf, Ftrace, SystemTap"
                        },
                        {
                            "topic": "eBPF (Basics)",
                            "subtopics": "Architecture, BPF maps, Hooks (kprobe, tracepoint)"
                        },
                        {
                            "topic": "Kubernetes (Basic)",
                            "subtopics": "Pod, Deployment, Service, Kubelet, Control plane"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Kernel Development",
                            "subtopics": "Writing kernel modules, IOCTL, Kernel debugging"
                        },
                        {
                            "topic": "Memory Management Internals",
                            "subtopics": "kmalloc, vmalloc, Memory barriers, RCU"
                        },
                        {
                            "topic": "Cloud OS",
                            "subtopics": "AWS Nitro, Firecracker, gVisor, Confidential computing"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Real-time Systems",
                            "subtopics": "PREEMPT_RT, SCHED_DEADLINE, Priority inversion"
                        },
                        {
                            "topic": "Advanced eBPF",
                            "subtopics": "BPF CO-RE, BTF, BPF in networking/security"
                        },
                        {
                            "topic": "OS Verification",
                            "subtopics": "Formal verification (seL4), Model checking"
                        }
                    ]
                }
            ]
        },
        {
            "id": "networks",
            "name": "Computer Networks",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Network Basics",
                            "subtopics": "OSI Model (7 layers), TCP/IP Model (4 layers)"
                        },
                        {
                            "topic": "Physical/Data Link Layer",
                            "subtopics": "MAC addresses, Ethernet frame, Switches, VLAN"
                        },
                        {
                            "topic": "Network Layer",
                            "subtopics": "IP addressing (IPv4, IPv6), Subnetting, CIDR, ARP"
                        },
                        {
                            "topic": "Routing Basics",
                            "subtopics": "Static routing, Dynamic routing, Routing table"
                        },
                        {
                            "topic": "Transport Layer",
                            "subtopics": "TCP, UDP, Handshake, Ports"
                        },
                        {
                            "topic": "Application Layer",
                            "subtopics": "DNS, HTTP, SMTP, FTP, DHCP"
                        },
                        {
                            "topic": "Network Tools",
                            "subtopics": "ping, traceroute, nslookup, netstat, ipconfig"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "TCP Deep Dive",
                            "subtopics": "Sequence numbers, MSS, Window size"
                        },
                        {
                            "topic": "TCP Flow/Congestion Control",
                            "subtopics": "Sliding window, Slow start, Fast retransmit, AIMD"
                        },
                        {
                            "topic": "Routing Protocols",
                            "subtopics": "OSPF, BGP, Distance-vector vs Link-state"
                        },
                        {
                            "topic": "Network Security Basics",
                            "subtopics": "Firewalls, NAT, VPN, Port forwarding"
                        },
                        {
                            "topic": "Load Balancing & CDN",
                            "subtopics": "L4/L7 load balancing, Edge servers, Caching strategies"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "TCP Optimization",
                            "subtopics": "SACK, Fast Open, DCTCP, BBRv2"
                        },
                        {
                            "topic": "Modern Protocols",
                            "subtopics": "HTTP/2, HTTP/3, QUIC, WebSockets, gRPC"
                        },
                        {
                            "topic": "BGP Advanced",
                            "subtopics": "eBGP vs iBGP, BGP attributes (AS Path, MED)"
                        },
                        {
                            "topic": "Network Virtualization",
                            "subtopics": "VXLAN, NVGRE, GRE, Overlay networks"
                        },
                        {
                            "topic": "SDN",
                            "subtopics": "Software-Defined Networking, OpenFlow"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "High-Performance Networking",
                            "subtopics": "Kernel bypass, DPDK, RDMA"
                        },
                        {
                            "topic": "XDP (eXpress Data Path)",
                            "subtopics": "AF_XDP sockets, Packet processing at NIC"
                        },
                        {
                            "topic": "Service Mesh",
                            "subtopics": "Istio, Envoy, mTLS, Circuit breaking"
                        },
                        {
                            "topic": "Data Center Networking",
                            "subtopics": "Clos architecture, Spine-leaf topology, ECMP"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Advanced Routing",
                            "subtopics": "Segment routing (SRv6), PCEP, Traffic engineering"
                        },
                        {
                            "topic": "Network Observability",
                            "subtopics": "eBPF for networking, Cilium, Tetragon"
                        },
                        {
                            "topic": "Optical & Quantum Networking",
                            "subtopics": "DWDM, OTN, Quantum key distribution"
                        }
                    ]
                }
            ]
        },
        {
            "id": "aiml",
            "name": "Artificial Intelligence / Machine Learning",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "ML Fundamentals",
                            "subtopics": "Supervised, Unsupervised, RL, Bias-Variance"
                        },
                        {
                            "topic": "Linear & Logistic Regression",
                            "subtopics": "OLS, Gradient Descent, Sigmoid, Log loss"
                        },
                        {
                            "topic": "k-NN & Decision Trees",
                            "subtopics": "Distance metrics, ID3, C4.5, Entropy"
                        },
                        {
                            "topic": "Naive Bayes & SVM",
                            "subtopics": "Bayes theorem, Hinge loss, Support vectors"
                        },
                        {
                            "topic": "K-Means & PCA",
                            "subtopics": "Centroids, Elbow method, Dimensionality reduction"
                        },
                        {
                            "topic": "Evaluation Metrics",
                            "subtopics": "Accuracy, Precision, Recall, F1, AUC-ROC"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Tree Ensembles",
                            "subtopics": "Random Forest, XGBoost, LightGBM"
                        },
                        {
                            "topic": "Neural Networks",
                            "subtopics": "Dropout, Batch norm, Optimizers (Adam, SGD)"
                        },
                        {
                            "topic": "CNNs & RNNs",
                            "subtopics": "Convolution, Pooling, LSTM, GRU"
                        },
                        {
                            "topic": "NLP Basics",
                            "subtopics": "TF-IDF, N-grams, Word2Vec, GloVe"
                        },
                        {
                            "topic": "Attention & Transformers",
                            "subtopics": "Self-attention, Encoder-Decoder architecture"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "LLMs",
                            "subtopics": "GPT, LLaMA, BERT, Auto-regressive vs Auto-encoding"
                        },
                        {
                            "topic": "Fine-tuning & RLHF",
                            "subtopics": "PEFT, LoRA, PPO, Reward modeling"
                        },
                        {
                            "topic": "RAG Architecture",
                            "subtopics": "Vector databases, Chunking, Retrieval strategies"
                        },
                        {
                            "topic": "Agentic AI",
                            "subtopics": "ReAct, Tool calling, Multi-agent coordination"
                        },
                        {
                            "topic": "MLOps",
                            "subtopics": "MLflow, DVC, Model serving (Triton, ONNX)"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "LLM Internals",
                            "subtopics": "Transformer architecture, Flash Attention"
                        },
                        {
                            "topic": "Training at Scale",
                            "subtopics": "Distributed training, ZeRO, Pipeline Parallelism"
                        },
                        {
                            "topic": "Advanced RAG",
                            "subtopics": "Multimodal RAG, Streaming RAG, Graph RAG"
                        },
                        {
                            "topic": "Generative Models",
                            "subtopics": "GANs, Diffusion models (Stable Diffusion)"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Advanced Transformers",
                            "subtopics": "MoE, RoPE, Grouped-Query Attention"
                        },
                        {
                            "topic": "Interpretability",
                            "subtopics": "SHAP, LIME, Mechanistic interpretability"
                        },
                        {
                            "topic": "Causal Inference",
                            "subtopics": "Causal graphs, Do-calculus"
                        }
                    ]
                }
            ]
        },
        {
            "id": "programming",
            "name": "Programming & Development",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Python / Java / C++ Basics",
                            "subtopics": "Syntax, Types, OOPs Basics, Exception Handling"
                        },
                        {
                            "topic": "File I/O & Shell",
                            "subtopics": "Reading/writing files, Bash scripts"
                        },
                        {
                            "topic": "Git Basics",
                            "subtopics": "init, commit, push, pull, branch"
                        },
                        {
                            "topic": "Testing Basics",
                            "subtopics": "Unit testing, Assertions"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Design Patterns",
                            "subtopics": "Singleton, Factory, Observer, SOLID Principles"
                        },
                        {
                            "topic": "Concurrency & Async",
                            "subtopics": "Multithreading, Promises, Coroutines"
                        },
                        {
                            "topic": "API Development",
                            "subtopics": "RESTful principles, Authentication (JWT)"
                        },
                        {
                            "topic": "Containerization",
                            "subtopics": "Dockerfile, Docker Compose"
                        },
                        {
                            "topic": "CI/CD Basics",
                            "subtopics": "GitHub Actions, GitLab CI"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Distributed Systems",
                            "subtopics": "CAP theorem, Consistency models"
                        },
                        {
                            "topic": "Event-Driven Architecture",
                            "subtopics": "CQRS, Event sourcing, Message Brokers (Kafka)"
                        },
                        {
                            "topic": "Observability",
                            "subtopics": "Prometheus, Grafana, OpenTelemetry"
                        },
                        {
                            "topic": "Infrastructure as Code",
                            "subtopics": "Terraform, CloudFormation"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Consensus Algorithms",
                            "subtopics": "Raft, Multi-Paxos, Distributed locking"
                        },
                        {
                            "topic": "Distributed Transactions",
                            "subtopics": "Saga, 2PC, TCC"
                        },
                        {
                            "topic": "Chaos Engineering",
                            "subtopics": "Gremlin, Fault injection"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Distributed Systems Theory",
                            "subtopics": "FLP Impossibility, Byzantine faults"
                        },
                        {
                            "topic": "Platform Engineering",
                            "subtopics": "Internal Developer Platform (IDP), Backstage"
                        },
                        {
                            "topic": "Evolutionary Architecture",
                            "subtopics": "Domain-Driven Design (DDD)"
                        }
                    ]
                }
            ]
        },
        {
            "id": "cloud",
            "name": "Cloud Computing (Bonus)",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Cloud Models",
                            "subtopics": "IaaS, PaaS, SaaS"
                        },
                        {
                            "topic": "Core Services",
                            "subtopics": "EC2, S3, RDS, VPC, IAM"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Serverless & Auto-scaling",
                            "subtopics": "Lambda, Load balancing, ElastiCache"
                        },
                        {
                            "topic": "DevOps on Cloud",
                            "subtopics": "CodePipeline, CloudWatch"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Cloud Architecture",
                            "subtopics": "Multi-cloud, Cost optimization, Hybrid cloud"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Enterprise Cloud",
                            "subtopics": "Kubernetes on cloud (EKS/GKE), Service mesh"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Hyperscale",
                            "subtopics": "Spanner, Aurora, FinOps, Quantum on Cloud"
                        }
                    ]
                }
            ]
        },
        {
            "id": "security",
            "name": "Security (Bonus)",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Fundamentals",
                            "subtopics": "CIA Triad, Auth/Auth, SSL/TLS, Firewalls"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Web Security",
                            "subtopics": "OAuth 2.0, JWT, CORS, OWASP Top 10, IAM"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Zero Trust",
                            "subtopics": "ZTA, BeyondCorp, DevSecOps, Threat modeling"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Threat Hunting",
                            "subtopics": "MITRE ATT&CK, Pen testing, Identity governance"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Security Research",
                            "subtopics": "Zero-day, Advanced Cryptography, AI in security"
                        }
                    ]
                }
            ]
        },
        {
            "id": "web3",
            "name": "Web3 / Blockchain (Bonus)",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Blockchain Basics",
                            "subtopics": "Decentralization, Bitcoin, Ethereum, Smart contracts"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "DApps & DeFi",
                            "subtopics": "EVM, Gas optimization, Oracles, DEX"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Scaling",
                            "subtopics": "Layer 2, Rollups (Optimistic/ZK), Bridges"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Protocol Design",
                            "subtopics": "MEV, DAO design, Account Abstraction"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "ZK Research",
                            "subtopics": "ZK-SNARKs, Modular blockchains, Intent-based architectures"
                        }
                    ]
                }
            ]
        },
        {
            "id": "datascience",
            "name": "Data Science (Bonus)",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Data Exploration",
                            "subtopics": "Pandas, NumPy, Visualization, Hypothesis testing"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Modeling & Analysis",
                            "subtopics": "Feature engineering, Time series, Clustering, A/B testing"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Big Data & Pipelines",
                            "subtopics": "Spark, Feature stores, Data lakes, Causal inference"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "Data Engineering",
                            "subtopics": "Real-time pipelines, Data mesh, AutoML"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Advanced AI/Data",
                            "subtopics": "Causal discovery, Data-centric AI, Deep generative models"
                        }
                    ]
                }
            ]
        },
        {
            "id": "backend",
            "name": "Backend Development (Bonus)",
            "levels": [
                {
                    "level": "\u2b50 Basic",
                    "topics": [
                        {
                            "topic": "Web Basics",
                            "subtopics": "HTTP/REST, Node.js/Python, Databases, Auth"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50 Intermediate",
                    "topics": [
                        {
                            "topic": "Architecture",
                            "subtopics": "API design, Caching, Message queues, Microservices"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50 Advanced",
                    "topics": [
                        {
                            "topic": "Microservices Patterns",
                            "subtopics": "API Gateway, Circuit breaker, Distributed tracing"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50 Expert",
                    "topics": [
                        {
                            "topic": "High-Performance",
                            "subtopics": "10k+ QPS, Service mesh, Eventual consistency"
                        }
                    ]
                },
                {
                    "level": "\u2b50\u2b50\u2b50\u2b50\u2b50 Master",
                    "topics": [
                        {
                            "topic": "Global Scale",
                            "subtopics": "High availability, Advanced observability, Global caching"
                        }
                    ]
                }
            ]
        }
    ]
};
