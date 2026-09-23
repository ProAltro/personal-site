import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { render } from 'preact';
import '../styles.css';

const projects = [
  {
    id: 'metasurface',
    number: '01',
    eyebrow: 'A RESEARCH SIDE QUEST',
    title: 'A paper accepted in Scientific Reports',
    highlightTitle: 'Scientific Reports',
    highlightNote: 'Nature Portfolio · paper accepted',
    short: 'What if a neural net could imagine a material that absorbs just the right waves?',
    proof: 'NATURE PORTFOLIO · ACCEPTED',
    featured: true,
    categories: ['machine learning', 'electromagnetics'],
    palette: 'peach',
    kind: 'meta',
    curiosity: 'Inverse design of realizable metasurface absorbers using progressively growing GANs.',
    details: 'I co-authored a progressively growing GAN framework that generates metasurface absorber designs while keeping fabrication constraints in view. The work combines continuous FiLM conditioning, electromagnetic-surrogate guidance, and diversity regularisation.',
    sections: [
      { label: 'THE BOTTLENECK', title: 'A good spectrum is only half the answer', body: 'Inverse design is expensive when each candidate needs iterative full-wave simulation. Generative approaches also have to obey continuous spectral targets without collapsing to near-identical shapes or producing designs that cannot be fabricated.' },
      { label: 'THE APPROACH', title: 'Condition the generator; keep physics in the loop', body: 'The framework uses a progressively growing Wasserstein GAN with gradient penalty. FiLM conditioning carries continuous spectral and fabrication constraints through the model; a surrogate-assisted spectral-alignment loss encourages electromagnetic consistency, while determinantal-point-process regularisation encourages diverse geometries for the same target.' },
      { label: 'WHAT CAME OUT', title: 'Different geometries, similar target behavior', body: 'The paper reports realizable absorber designs across 2–18 GHz, validated with electromagnetic simulations. The reported average MSE is 0.0052, diversity score 0.8730, band-alignment accuracy 0.8533, and valid-EM-design rate 89.57%.' },
    ],
    contribution: 'Worked on the model and conditioning approach, with design diversity and physical realizability as first-class constraints.',
    outcome: 'Accepted for publication in Scientific Reports, part of the Nature Portfolio.',
    stack: ['GANs', 'PyTorch', 'FiLM conditioning', 'EM surrogates', 'DPP regularisation'],
    stats: [{ value: '89.57%', label: 'valid EM designs' }, { value: '0.873', label: 'diversity score' }, { value: '2–18 GHz', label: 'design band' }],
    link: { label: 'Read the paper', href: 'https://arxiv.org/abs/2606.05849' },
  },
  {
    id: 'openems-cuda',
    number: '02',
    eyebrow: 'GPU ELECTROMAGNETICS / 2026',
    title: 'Can CUDA batch simulations without losing accuracy?',
    short: 'An openEMS FDTD extension that batches parameter sweeps on the GPU, with parity checks against the reference engine.',
    proof: '15.5 SIMULATIONS / SEC · RTX 4050 BENCH',
    featured: true,
    categories: ['systems', 'hardware'],
    palette: 'violet',
    kind: 'cuda',
    curiosity: 'A CUDA-accelerated batch FDTD engine for openEMS parameter sweeps and inverse-design loops.',
    details: 'I’m extending openEMS with fused batched FDTD kernels, CUDA Graph replay, and batched port-monitor processing. The aim is to make large electromagnetic parameter sweeps practical without changing the familiar Python-facing workflow.',
    sections: [
      { label: 'THE PROBLEM', title: 'Parameter sweeps multiply small simulation costs', body: 'Electromagnetic inverse-design loops need to evaluate many candidate structures. A sweep can contain hundreds or thousands of small FDTD jobs; launching and advancing each one independently creates avoidable host-dispatch and kernel-launch overhead.' },
      { label: 'THE IMPLEMENTATION', title: 'Batch the repeated work on the GPU', body: 'I built fused CUDA kernels for batches of simulations, captured the repeated timestep sequence with CUDA Graphs, and added batched port-monitor processing. Python bindings and runners support parameter sweeps, field snapshots, ragged grid dimensions, and independent early stopping, so the batching layer can handle simulations that do not all have identical extents or run lengths.' },
      { label: 'VALIDATION & SPEED', title: 'Measure speed against a numerical reference', body: 'The validation suite compares the fused batch path against the existing per-simulation GPU engine. E-field values match bit-for-bit in the reported parity tests. On a 16-configuration dipole benchmark using an RTX 4050 Laptop GPU, the fused, CUDA-Graph, batched-port configuration reached 15.5 simulations per second; the I time-series reduction had at most 2.2 × 10⁻⁷ relative error.' },
    ],
    contribution: 'Built the CUDA batch path, runners, Python bindings, and parity/performance checks for batched simulations.',
    outcome: 'The repository reports 15.5 simulations per second in a 16-configuration dipole benchmark on an RTX 4050 Laptop GPU. The fused E-field path matches the per-simulation GPU engine bit-for-bit in its parity tests.',
    stack: ['C++', 'CUDA', 'FDTD', 'Python', 'CUDA Graphs'],
    stats: [{ value: '15.5', label: 'simulations / second' }, { value: '0', label: 'E-field parity error' }, { value: 'RTX 4050', label: 'benchmark GPU' }],
    link: { label: 'Explore the CUDA work', href: 'https://github.com/ProAltro/openems-cuda' },
  },
  {
    id: 'compute-systems',
    number: '03',
    eyebrow: 'COMPUTATION UNDER CONSTRAINTS',
    title: 'Can you fit AI—and a large MoE model—within memory limits?',
    highlightTitle: 'Edge AI + memory systems',
    short: 'Two studies in resource-aware computing: fitting a forecasting pipeline onto an FPGA and testing what CXL expansion enables for MoE serving.',
    proof: '41% FEWER LUTs · 67% FEWER FFs',
    featured: true,
    categories: ['systems', 'hardware', 'machine learning'],
    palette: 'yellow',
    kind: 'compute',
    curiosity: 'A paired look at what happens when computation runs into a hard resource limit—and how to prove whether a systems change actually helps.',
    details: 'These are separate implementations grouped around one question: how do you make more computation possible when the available resources are not enough? One project maps a forecasting model onto an FPGA with finite logic and memory. The other explores memory placement and request-serving behavior when a large Mixture-of-Experts model exceeds GPU HBM capacity.',
    sections: [
      { label: 'EDGE AI · FPGA', title: 'A six-horizon power forecaster in RTL', body: 'For the EdgeAI FPGA Hackathon, I worked on a streaming power-forecasting pipeline in SystemVerilog. An engineered-feature path feeds a quantized temporal-convolution model and a tree ensemble, which together produce predictions for six horizons. The challenge was not simply converting model layers to RTL: the design had to fit the target device’s logic, DSP, and on-chip memory budgets.' },
      { label: 'HARDWARE OPTIMISATION', title: 'Reduce state movement and share compute', body: 'I helped replace costly shift-register and address-generation structures with circular buffers, BRAM-compatible packed storage, and registered base addresses. A 16-lane shared MAC array reuses DSP resources across convolution phases. In Vivado 2019.2 out-of-context synthesis of the TCN backbone on a Zynq-7020, these changes reduced LUT use from 87,430 to 51,506 (41%) and flip-flops from 199,188 to 65,029 (67%). The resulting block uses 28 BRAM36 blocks and 48 DSPs; at 96.8% LUT utilization, area remains a real constraint. These are synthesis results, not measured board throughput.' },
      { label: 'CXL · MoE SYSTEMS', title: 'First establish feasibility, then test performance', body: 'In Nebula-2, I built repeatable experiments for memory placement and CXL expansion around Qwen3-30B-A3B. In the simulated setup, aggregate model weights totalled 56 GiB while two GPUs provided 48 GiB of HBM, so the HBM-only run could not initialize. A CXL-expanded run placed about 27 GiB per GPU remotely and completed all eight requests. This established capacity feasibility in the simulator—not a real-hardware benchmark.' },
      { label: 'WHAT THE COMPARISON SHOWED', title: 'More capacity did not mean faster serving', body: 'Against the matched ideal-HBM reference, the simulated CXL run had 27.05× higher mean time-to-first-token and 213.05× higher mean time-per-output-token. It failed the predeclared serving policy. That negative result matters: it separates “the model can run” from “the system serves it well,” and points to latency, staging, and endpoint behavior as the next things to investigate.' },
      { label: 'WHY THESE BELONG TOGETHER', title: 'Start with the system question; find the limiting resource', body: 'The FPGA work asks how model computation and state fit into a physical device. The CXL study follows memory capacity through to serving latency. In both, I enjoy stepping back to see the whole system, then tracing the bottleneck into the implementation and checking the result against measurements. I’m open to work across systems, hardware, and applied computation.' },
    ],
    contribution: 'RTL architecture and resource optimisation for edge inference; experiment design, simulator work, and evidence checks for CXL-backed MoE capacity and serving behavior.',
    outcome: 'A resource-fitting FPGA design and a carefully bounded CXL study that distinguishes “can run” from “runs well.”',
    stack: ['SystemVerilog', 'FPGA synthesis', 'INT8 inference', 'CXL', 'MoE serving', 'Performance analysis'],
    stats: [{ value: '−41%', label: 'TCN backbone LUTs' }, { value: '−67%', label: 'TCN backbone flip-flops' }, { value: '8 / 8', label: 'simulated CXL requests completed' }, { value: '27× / 213×', label: 'TTFT / TPOT vs ideal-HBM reference' }],
    link: null,
    footer: 'Two related studies · source repos currently private',
  },
  {
    id: 'antenna',
    number: '04',
    eyebrow: 'A LITTLE ANTENNA PLAYGROUND',
    title: 'Can gradient descent shape a better antenna array?',
    short: 'Use differentiable array-factor models to explore gain, directivity, and beam steering across several array geometries.',
    categories: ['hardware', 'machine learning'],
    palette: 'blue',
    kind: 'antenna',
    curiosity: 'A gradient-based approach to optimise gain, beam steering, and efficiency.',
    details: 'This research project explores antenna-array optimisation with differentiable array-factor models. By combining physics-based models with gradient-based optimisation, the project searches for configurations that balance gain, steering performance, and efficiency.',
    sections: [
      { label: 'THE DESIGN QUESTION', title: 'Can physics make array tuning more direct?', body: 'An array’s element positions and phases shape its radiation pattern. This project studies whether differentiable array-factor models can provide useful gradients for optimising gain, steering, and efficiency, instead of relying only on black-box search.' },
      { label: 'THE EXPERIMENTS', title: 'Compare optimisers across three geometries', body: 'I worked with a spiral array for wireless-power transfer, a hexagonal array for directivity maximisation, and a grid array for beam steering. The project compares gradient-based methods with differential evolution, genetic algorithms, and particle swarm optimisation, using electromagnetic simulations to evaluate candidate designs.' },
      { label: 'INTERACTIVE ILLUSTRATION', title: 'A simple beam-steering model', body: 'The slider below redraws an idealised uniformly spaced eight-element array pattern. It is an explanatory illustration, not a plot of the research results. The repository contains the case-study layouts and their radiation-pattern visualisations.' },
    ],
    contribution: 'Developed a gradient-based optimisation approach using array-factor models and electromagnetic solvers.',
    outcome: 'The slider below is a small illustrative uniform-array beam pattern—not a plot of the project’s measured results.',
    stack: ['PyTorch', 'Array-factor models', 'EM solvers', 'Gradient optimisation'],
    stats: [{ value: '3', label: 'array case studies' }, { value: '4', label: 'optimiser families compared' }],
    link: { label: 'Poke around the code', href: 'https://github.com/ProAltro/Gradient-Based-Antenna-Array-Optimisation' },
  },
  {
    id: 'trading',
    number: '05',
    eyebrow: 'A ONE-SECOND MARKET',
    title: 'How do you run 200 trading strategies every second?',
    short: 'A Go order book and matching engine coordinated concurrent Python strategies on a one-second market clock.',
    categories: ['systems', 'backend'],
    palette: 'yellow',
    kind: 'trading',
    curiosity: 'A competition backend that kept 200+ player strategies moving at a 1-second tick.',
    details: 'Built the backend for a college tech-fest algorithmic-trading competition. The Go service handled order-book and matching logic; player strategies ran concurrently in Python and talked to the engine over Protocol Buffers.',
    sections: [
      { label: 'THE REQUIREMENT', title: 'Keep the market moving on a fixed clock', body: 'The college tech-fest competition needed to evaluate more than 200 player-written strategies concurrently while advancing the simulated market every second. Each round required the engine to collect decisions, process orders, and move to the next tick without blocking on one strategy.' },
      { label: 'THE ARCHITECTURE', title: 'A Go exchange with a Python strategy boundary', body: 'The performance-sensitive order book and matching logic run in Go. Strategies run concurrently in Python and communicate with the backend through Protocol Buffers, separating participant code from the central market engine.' },
      { label: 'MY WORK & RESULT', title: 'One backend for the whole competition', body: 'I implemented the order-book and matching path, concurrent strategy evaluation, and the Go/Python interface. During the competition, the backend supported 200+ simultaneous strategies at a one-second tick rate.' },
    ],
    contribution: 'Implemented the order book, matching logic, concurrent strategy evaluation, and the Go/Python interface.',
    outcome: 'Handled 200+ simultaneous player strategies at a one-second tick rate during the competition.',
    stack: ['Go', 'Python', 'Protocol Buffers', 'Concurrency', 'Order books'],
    stats: [{ value: '200+', label: 'concurrent strategies' }, { value: '1 sec', label: 'market tick' }],
    link: { label: 'Open the repository', href: 'https://github.com/ProAltro/algo-trading-platform' },
  },
  {
    id: 'noc',
    number: '06',
    eyebrow: 'A NETWORK FOR A GPU PARTY',
    title: 'How do you connect 64 GPUs without deadlock?',
    short: 'A second-place NoC design for the Astera Labs Nebula interconnect competition.',
    categories: ['hardware', 'systems'],
    palette: 'violet',
    kind: 'noc',
    curiosity: 'A scalable GPU interconnect designed for high-bandwidth shared-training traffic.',
    details: 'For the Nebula GPU Interconnect Design Competition, I designed and implemented a network-on-chip for systems of up to 64 GPUs. It included a custom deadlock-free arbitration scheme and AXI/CHI-compatible interconnect modules.',
    sections: [
      { label: 'THE DESIGN PROBLEM', title: 'Scale communication without stalling the fabric', body: 'The Astera Labs Nebula competition challenged teams to design a high-bandwidth interconnect for up to 64 GPUs. Shared-training traffic can create competing routes through a network, so the design needed to manage arbitration while preventing deadlock.' },
      { label: 'THE IMPLEMENTATION', title: 'Build and verify a deadlock-free NoC', body: 'I designed a network-on-chip with a custom deadlock-free arbitration scheme and AXI/CHI-compatible interconnect modules. SystemVerilog test benches exercised representative shared-GPU-training traffic patterns to check communication behavior across the fabric.' },
      { label: 'THE RESULT', title: 'Second place in hardware design', body: 'The design earned second place in the hardware-design category. The project brought together architecture, protocol interfaces, arbitration, and verification rather than treating the NoC as a diagram-only exercise.' },
    ],
    contribution: 'Designed the NoC architecture, arbitration scheme, and SystemVerilog test benches for representative shared-GPU-training traffic.',
    outcome: 'Second place in the hardware-design category of the Astera Labs Nebula competition.',
    stack: ['SystemVerilog', 'NoC design', 'AXI / CHI', 'Hardware verification'],
    stats: [{ value: '64', label: 'GPU nodes supported' }, { value: '2nd', label: 'hardware design place' }],
    link: null,
  },
  {
    id: 'sat-sim',
    number: '07',
    eyebrow: 'SATELLITE SYSTEMS / TEAM ANANT',
    title: 'Can a satellite simulator predict power and ground contact?',
    short: 'Team Anant’s Python sandbox combines orbit propagation, spacecraft components, and mission analyses.',
    categories: ['systems', 'hardware'],
    palette: 'blue',
    kind: 'orbit',
    curiosity: 'An orbit-propagation and spacecraft-analysis sandbox built with Team Anant.',
    details: 'As a member of Team Anant, BITS Pilani’s student satellite club, and a Systems Engineer, I contributed to sat-sim: a simulation sandbox for orbit propagation and spacecraft analysis. My work included refactoring the propagator and simulation structure, solar-power analysis, and telemetry, tracking, and command (TT&C) analysis.',
    sections: [
      { label: 'THE SIMULATOR', title: 'Propagate more than a point along an orbit', body: 'The Python simulator evolves position, velocity, attitude, and angular velocity. Its dynamics include atmospheric drag, J2 perturbation, solar-radiation pressure, and magnetic torque, letting analyses consider spacecraft motion and environment together.' },
      { label: 'SUBSYSTEM ANALYSIS', title: 'Connect the orbit to mission questions', body: 'Pluggable components represent solar panels, antennas, radios, and magnetorquers. Monitors evaluate generated power and eclipse periods, ground-station contact and link margin, body-axis alignment, and detumbling. Monte Carlo scripts explore how results vary across orbital and attitude conditions.' },
      { label: 'MY CONTRIBUTIONS', title: 'Orbit propagation, power, and TT&C', body: 'As a Team Anant Systems Engineer, I contributed to refactoring the propagator into a more modular simulation structure, solar-power analysis, and TT&C link/contact analysis. I also worked on magnetorquer detumbling features. The code supports the wider systems-engineering work of understanding subsystem behavior and interfaces for a 3U CubeSat mission.' },
      { label: 'MISSION SYSTEMS', title: 'Make subsystem assumptions meet in one design', body: 'My broader satellite systems work includes communications link budgets and modulation schemes, power budgeting, defining OBC state transitions, and Kalman-filter state estimation. I like this part of systems engineering because a change in one subsystem quickly becomes a question for the whole spacecraft.' },
    ],
    contribution: 'Systems Engineer and contributor to Team Anant’s satellite simulation repository: orbit propagation, modular simulation structure, power analysis, and TT&C analysis.',
    outcome: 'A pluggable sandbox for exploring orbit dynamics, spacecraft subsystems, power, and communications.',
    stack: ['Python', 'Orbit propagation', 'Spacecraft dynamics', 'Monte Carlo analysis', 'TT&C'],
    stats: [{ value: '3U', label: 'CubeSat mission context' }, { value: '6+', label: 'force, torque, and analysis models' }],
    link: { label: 'Explore Team Anant sat-sim', href: 'https://github.com/team-anant/sat-sim' },
  },
];

const milestones = [
  {
    id: 'deshaw',
    number: 'SUMMER 2026',
    eyebrow: 'FIELD NOTES · QUANT SYSTEMS',
    title: 'D. E. Shaw',
    highlightTitle: 'D. E. Shaw',
    highlightNote: 'Summer 2026 · Technology Development Intern',
    proof: 'TECHNOLOGY DEVELOPMENT INTERN',
    palette: 'blue',
    curiosity: 'A summer spent thinking about how machines find each other on a network.',
    details: 'On the Quant Systems Development team, I worked on extending service discovery into a network-restricted domain. I evaluated identity, firewall, DNS, proxy-routing, and TLS requirements, and built an eBPF program to connect a VM’s L3 network space to a grid network for userspace testing.',
    contribution: 'Infrastructure research and an eBPF networking tool. Details here stay at the level of my resume; no internal systems or implementation specifics.',
    outcome: 'Technology Development Intern · Quant Systems Development.',
    stack: ['eBPF', 'Linux networking', 'DNS', 'TLS'],
    link: null,
    footer: 'A summer internship · June–July 2026',
  },
  {
    id: 'graviton',
    number: 'UP NEXT',
    eyebrow: 'A NEW CHAPTER LOADING',
    title: 'Graviton Research Capital',
    highlightTitle: 'Graviton Research Capital',
    highlightNote: 'Current placement offer',
    proof: 'PLACEMENT OFFER',
    palette: 'yellow',
    curiosity: 'The next chapter is starting to take shape.',
    details: 'I’ve received a placement offer from Graviton Research Capital. More to come when I can share the details.',
    contribution: 'A new direction I’m excited about.',
    outcome: 'Placement offer · Graviton Research Capital.',
    stack: [],
    link: null,
    footer: 'A new chapter loading',
  },
];

const sideProjects = [
  {
    id: 'micromouse',
    number: 'ROBOT THINGS',
    eyebrow: 'A MOUSE THAT SOLVES MAZES',
    title: 'How does a micromouse sense, steer, and report over BLE?',
    curiosity: 'A Raspberry Pi Pico W robot with motor feedback, inertial sensing, and a wireless control-and-monitoring link.',
    details: 'This micromouse brings together embedded control and a laptop-facing toolchain. The robot uses motor encoders for motion feedback, an MPU6050 for orientation, and three ultrasonic sensors for nearby obstacles. A BLE client supports monitoring and control while the firmware runs on the Pico W.',
    sections: [
      { label: 'SENSING & MOTION', title: 'Feedback from wheels, orientation, and obstacles', body: 'The Raspberry Pi Pico W coordinates two motor-and-encoder assemblies, an MPU6050 inertial measurement unit, and three ultrasonic sensors for front, left, and right distance readings. These inputs provide the ingredients for inspecting movement and nearby maze geometry.' },
      { label: 'FIRMWARE & TOOLING', title: 'Control the robot and inspect what it senses', body: 'MicroPython firmware handles the robot-side drivers and control loop. A Python BLE client lets a laptop inspect sensor snapshots, send commands, tune navigation parameters, and transfer JSON logs, making it easier to debug the physical system without relying on the robot alone.' },
    ],
    contribution: 'MicroPython firmware, sensor and motor drivers, and a Python BLE client.',
    outcome: 'A robot you can drive and inspect from a laptop.',
    stack: ['Raspberry Pi Pico W', 'MicroPython', 'BLE', 'IMU', 'Ultrasonic sensors'],
    link: { label: 'Meet the mouse', href: 'https://github.com/ProAltro/micromouse' },
    footer: 'Hardware side quest',
  },
  {
    id: 'huffzip',
    number: 'BITS & BYTES',
    eyebrow: 'A SMALL COMPRESSION EXPERIMENT',
    title: 'Can LZ77 and Huffman coding work better together?',
    curiosity: 'A C++ compressor that combines repeated-string references with frequency-based bit coding.',
    details: 'Huffzip is a compressor and decompressor built to make the mechanics of coding schemes concrete. An optional LZ77 pass replaces repeated sequences with references; Huffman coding then assigns shorter bit codes to frequent symbols. A Huffman-only mode makes the two-stage pipeline easy to compare.',
    sections: [
      { label: 'THE PIPELINE', title: 'Remove repetition before encoding symbols', body: 'The encoder can first represent repeated input sequences with LZ77 references, reducing redundancy across the byte stream. It then builds a Huffman tree from symbol frequencies and writes the resulting variable-length codes. A Huffman-only option provides a comparison path without the LZ77 pre-pass.' },
      { label: 'THE FILE FORMAT', title: 'Make the compressed stream self-describing', body: 'The custom format records a signature, compression mode, CRC-32 checksum, compressed and original sizes, and the frequency table needed to reconstruct the Huffman tree, followed by bit-packed data. Verbose mode reports entropy and average code length to help inspect how the coding choices affect the result.' },
    ],
    contribution: 'Implemented the compression/decompression pipeline and coding analysis.',
    outcome: 'A working encode/decode path with integrity checking and a format that exposes the compression metadata.',
    stack: ['C++', 'Huffman coding', 'LZ77', 'CRC-32'],
    link: { label: 'Open huffzip', href: 'https://github.com/ProAltro/huffzip' },
    footer: 'A compression rabbit hole',
  },
  {
    id: 'audio-watermark',
    number: 'DSP PROJECT',
    eyebrow: 'DIGITAL SIGNAL PROCESSING · ECE F434',
    title: 'Can you hide an image in audio—and recover it after attacks?',
    curiosity: 'A team project in audio watermarking, combining wavelets, Tchebichef moments, and chaotic encryption.',
    details: 'We implemented and evaluated an image-in-audio watermarking method. A binary image watermark is encrypted with a modified localized nonlinear chaotic map lattice (MLNCML), embedded into low-frequency audio coefficients using a three-level Haar wavelet transform and Discrete Tchebichef Moment Transform, then recovered by reversing those steps.',
    sections: [
      { label: 'THE SIGNAL PATH', title: 'Encode the image into low-frequency audio structure', body: 'The system encrypts the binary watermark with an MLNCML-generated key stream, divides the audio into 256 segments, and applies a three-level Haar DWT. It embeds watermark bits in the low-frequency A3 subband by modifying the relative norms of even and odd DTMT coefficients. Extraction compares those norms and decrypts the recovered bit sequence.' },
      { label: 'MY CONTRIBUTION', title: 'Refactor the pipeline and make each stage testable', body: 'I contributed a major refactor of the Python implementation: separating embedding and extraction, reorganising the DWT/DTMT and chaotic-map modules, moving file handling into utilities, and adding unit tests for the transforms, encryption, and extractor. I also revised the extraction path and helped organise the attack outputs and evaluation workflow.' },
      { label: 'ROBUSTNESS RESULTS', title: 'Measure both watermark recovery and audio quality', body: 'On the tested track, the no-attack baseline recovered the watermark exactly (BER 0, normalized correlation 1.000). Correlation remained 0.993 after 20 dB Gaussian noise and 0.998 after 128 kbps MP3 compression. The study also found clear limits: correlation fell to 0.002 after ±20% time scaling and 0.035 after simulated re-recording. The report measured audio-quality metrics as well as watermark similarity, rather than treating every extraction failure in isolation.' },
    ],
    contribution: 'Collaborated on the DSP implementation and evaluation; authored a substantial modular refactor and tests across the embedding, extraction, and transform code.',
    outcome: 'A reproducible implementation and attack-by-attack robustness study that identifies both resilient conditions and failure modes.',
    stack: ['Python', 'Haar DWT', 'DTMT', 'Chaotic encryption', 'Audio analysis'],
    link: { label: 'Explore the DSP project', href: 'https://github.com/Meghadri25/dsp-project' },
    footer: 'Team course project · audio watermarking',
  },
  {
    id: 'postman-auth',
    number: 'CLUB TOOLING',
    eyebrow: 'RECRUITMENT PLATFORM · POSTMAN',
    title: 'How does a club recruitment portal handle sign-in?',
    curiosity: 'An authentication microservice for the BITS Postman recruitment platform.',
    details: 'I built part of the authentication service for the Postman club recruitment platform. It is a Go microservice using Gin and SQLC, with Google OAuth-backed sessions and separate authentication paths for applicants and club heads.',
    sections: [
      { label: 'THE SERVICE', title: 'Authentication as a separate platform service', body: 'The service provides the login boundary for the recruitment platform rather than embedding authentication in every feature. It is written in Go with Gin for HTTP handling and SQLC for database access.' },
      { label: 'LOGIN & SESSION FLOW', title: 'Support OAuth sessions and club roles', body: 'I added Google OAuth session support, session-token verification, logout, and club-head login. These flows let the rest of the platform validate a user session and distinguish the portal’s administrative users.' },
    ],
    contribution: 'Implemented authentication service foundations and session-related flows for the recruitment platform.',
    outcome: 'A Go-based auth service supporting OAuth sessions, token verification, logout, and club-head access.',
    stack: ['Go', 'Gin', 'SQLC', 'Google OAuth', 'Sessions'],
    link: null,
    footer: 'BITS Postman recruitment platform · source repo private',
  },
  {
    id: 'anant-website',
    number: 'CLUB TOOLING',
    eyebrow: 'TEAM ANANT · WEB',
    title: 'How do you make a satellite team’s work explorable?',
    curiosity: 'A Next.js website for Team Anant, with subsystem pages, interactive details, and recruitment information.',
    details: 'I built and extended the Team Anant website to help explain the student satellite team and its work. The site brings subsystem information, team and publication pages, and recruitment content into one place, with interaction and motion used to make the technical material easier to explore.',
    sections: [
      { label: 'INFORMATION ARCHITECTURE', title: 'Give each subsystem a place to explain itself', body: 'The site includes dedicated pages for ADCS, EPS, OBC, payload, STS, and TT&C alongside team, publication, about, and contact pages. I updated subsystem information and worked on the recruitment experience so prospective members can navigate both the organisation and its technical areas.' },
      { label: 'INTERACTION & PRESENTATION', title: 'Add movement without losing the content', body: 'I added interactive behavior and visual effects to the Next.js site, including motion-driven components and page transitions. The goal was to make a technical student-team website feel inviting while still helping visitors find concrete subsystem information.' },
    ],
    contribution: 'Next.js site development, subsystem content updates, interactive components, and recruitment-page work.',
    outcome: 'A public-facing home for Team Anant’s satellite work and recruitment.',
    stack: ['Next.js', 'TypeScript', 'React', 'Web interaction'],
    link: { label: 'Visit the Team Anant website', href: 'https://anant-website-silk.vercel.app' },
    footer: 'Team Anant · BITS Pilani',
  },
  {
    id: 'anant-erp',
    number: 'CLUB TOOLING',
    eyebrow: 'TEAM ANANT · OPERATIONS',
    title: 'What does a satellite club need from its own ERP?',
    curiosity: 'An internal portal for projects, inventory, financial approvals, and team administration.',
    details: 'I contributed to Team Anant’s internal management portal: a small ERP-style application for the operational work around a student satellite team. It brings project tracking, inventory, pre-approvals and reimbursements, and user administration into one authenticated application.',
    sections: [
      { label: 'THE WORKFLOW', title: 'Support the work around the engineering', body: 'The portal includes project pages and status, inventory, finance summaries, pre-approval and reimbursement workflows, and user profiles. These processes help the club coordinate resources and keep operational information in one place.' },
      { label: 'MY CONTRIBUTIONS', title: 'Improve login and role administration', body: 'I contributed to the initial application and later worked on the login experience, systems-role assignment, and user removal and administration. The codebase uses Python and Flask with an authenticated portal and role-aware user management.' },
    ],
    contribution: 'Built and extended parts of the portal, including login, role assignment, and user administration.',
    outcome: 'A shared internal tool for Team Anant’s project, inventory, finance, and people workflows.',
    stack: ['Python', 'Flask', 'SQL', 'Authentication', 'Operations tooling'],
    link: null,
    footer: 'Team Anant internal tool · source repo private',
  },
  {
    id: 'qff-website',
    number: 'EVENT WEB',
    eyebrow: 'QISKIT FALL FEST · BITS PILANI',
    title: 'Can an event website make a whole festival easy to explore?',
    curiosity: 'An interactive website for the BITS Pilani Qiskit Fall Fest 2026 edition.',
    details: 'I built the event website around the official Qiskit Fall Fest 2026 organiser kit and programme. Alongside the visual identity and schedule, the site uses an interactive flocking animation to express the event theme and lets visitors move directly between programme sections.',
    sections: [
      { label: 'PROGRAMME', title: 'Turn the official schedule into a useful guide', body: 'The published programme spans 8 days, 16 sessions, and 27 taught hours. I replaced placeholder content with the organiser-provided schedule and made the daily session load legible, so the site communicates what is actually happening rather than relying on invented promotional numbers.' },
      { label: 'INTERACTION & ACCESSIBILITY', title: 'Use the visual idea to help people explore', body: 'The hero animation treats each bird as several possible flight paths; moving the pointer acts like a measurement that selects a path. I also worked on deep-linkable sections, browser back behavior, mobile layouts, reduced-motion behavior, and contrast checks across the content panels.' },
    ],
    contribution: 'Built and refined the event experience, integrating the official visual identity and accurate programme with interactive, responsive web design.',
    outcome: 'A live event site that is both a visual introduction and a practical guide to the festival programme.',
    stack: ['React', 'JavaScript', 'Canvas', 'Responsive design', 'Accessibility'],
    link: { label: 'Visit the Qiskit Fall Fest website', href: 'https://qff-website-pi.vercel.app' },
    footer: 'BITS Pilani · 8 days · 16 sessions · 27 taught hours',
  },
];

const thoughts = [
  'Currently wondering if satellites get lonely.',
  'A good bug is just a very specific question.',
  'Today’s soundtrack: fans spinning up at 100%.',
  'Somewhere, a packet is taking the scenic route.',
  'I like my abstractions leaky enough to learn from.',
];

function AntennaPattern({ steering }) {
  const path = useMemo(() => {
    const points = [];
    const elements = 8;
    for (let degree = -90; degree <= 90; degree += 2) {
      const angle = (degree * Math.PI) / 180;
      const target = (steering * Math.PI) / 180;
      const psi = Math.PI * (Math.sin(angle) - Math.sin(target));
      const denominator = elements * Math.sin(psi / 2);
      const response = Math.abs(denominator) < 0.000001
        ? 1
        : Math.abs(Math.sin((elements * psi) / 2) / denominator);
      const x = 18 + ((degree + 90) / 180) * 364;
      const y = 144 - response * 112;
      points.push(`${points.length ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, [steering]);

  return (
    <svg class="beam-plot" viewBox="0 0 400 170" role="img" aria-label={`Illustrative eight-element array beam pattern steered to ${steering} degrees`}>
      <path class="plot-grid" d="M18 32H382 M18 70H382 M18 108H382 M18 146H382 M109 20V146 M200 20V146 M291 20V146" />
      <path class="beam-fill" d={`${path} L382 146 L18 146 Z`} />
      <path class="beam-line" d={path} />
      <path class="plot-axis" d="M18 146H382" />
      <text x="18" y="163">−90°</text><text x="187" y="163">0°</text><text x="355" y="163">+90°</text>
    </svg>
  );
}

function ProjectDrawing({ kind }) {
  if (kind === 'compute') {
    return (
      <svg class="project-drawing compute-drawing" viewBox="0 0 300 170" role="img" aria-label="A small FPGA chip connected to memory tiers and model data">
        <rect x="89" y="41" width="122" height="86" rx="12" fill="#fffdf5" stroke="#20203a" stroke-width="2" />
        <path d="M103 31v10m20-10v10m20-10v10m20-10v10m20-10v10m20-10v10M103 127v11m20-11v11m20-11v11m20-11v11m20-11v11m20-11v11" stroke="#20203a" stroke-width="2" />
        <path d="M110 62h80M110 79h54M110 96h68" stroke="#3549d4" stroke-width="5" stroke-linecap="round" />
        <text x="117" y="119">MAKE IT FIT</text>
        <rect x="22" y="62" width="43" height="38" rx="6" fill="#dce6ff" stroke="#20203a" />
        <text x="29" y="84">FPGA</text>
        <rect x="237" y="39" width="45" height="30" rx="6" fill="#edf0a3" stroke="#20203a" />
        <rect x="237" y="93" width="45" height="30" rx="6" fill="#ffddc7" stroke="#20203a" />
        <text x="248" y="58">HBM</text><text x="247" y="112">CXL</text>
        <path d="M65 81h23m123-26h26m-26 54h26" stroke="#f06943" stroke-width="2" stroke-dasharray="4 4" />
      </svg>
    );
  }
  if (kind === 'orbit') {
    return (
      <svg class="project-drawing orbit-drawing" viewBox="0 0 300 170" role="img" aria-label="Satellite travelling along an orbital path around Earth">
        <ellipse cx="150" cy="85" rx="112" ry="49" fill="none" stroke="#3549d4" stroke-width="2" stroke-dasharray="5 6" transform="rotate(-18 150 85)" />
        <circle cx="150" cy="85" r="34" fill="#dce6ff" stroke="#20203a" stroke-width="2" />
        <path d="M119 85h62M150 54v62" stroke="#3549d4" stroke-width="1.5" opacity=".65" />
        <circle cx="230" cy="42" r="7" fill="#f06943" stroke="#20203a" stroke-width="2" />
        <path d="M222 42h-10m36 0h-10m-8-8v-9m0 34v-9" stroke="#20203a" stroke-width="2" />
        <text x="109" y="137">ORBIT · POWER · TT&amp;C</text>
      </svg>
    );
  }
  if (kind === 'meta') {
    return (
      <svg class="project-drawing meta-drawing" viewBox="0 0 300 170" role="img" aria-label="Concept diagram of a patterned metasurface absorbing waves">
        <path class="wave-lines" d="M18 38Q44 20 70 38T122 38 M18 53Q44 35 70 53T122 53 M18 68Q44 50 70 68T122 68" />
        <path class="wave-arrow" d="M128 53H158" />
        <g class="surface-cells">
          {Array.from({ length: 24 }, (_, index) => {
            const x = 165 + (index % 6) * 20;
            const y = 29 + Math.floor(index / 6) * 25;
            return <rect key={index} x={x} y={y} width="12" height="12" rx="3" transform={`rotate(${(index % 3) * 15} ${x + 6} ${y + 6})`} />;
          })}
        </g>
        <text x="17" y="112">incoming waves</text><text x="166" y="112">designed surface</text>
        <path class="quiet-wave" d="M184 133Q204 126 224 133T264 133" />
      </svg>
    );
  }
  if (kind === 'cuda') {
    return (
      <svg class="project-drawing cuda-drawing" viewBox="0 0 300 170" role="img" aria-label="Benchmark comparison showing 15.5 simulations per second in the fastest CUDA batch configuration">
        <text x="20" y="23">SIMULATIONS / SECOND</text>
        <path class="bench-grid" d="M20 137H280 M20 102H280 M20 67H280 M20 32H280" />
        <rect class="bench-bar bench-base" x="48" y="90" width="58" height="47" rx="5" />
        <rect class="bench-bar bench-fast" x="151" y="61" width="58" height="76" rx="5" />
        <text x="54" y="82">9.5</text><text x="157" y="53">15.5</text>
        <text x="38" y="155">PER SIM</text><text x="139" y="155">CUDA BATCH</text>
        <path class="bench-arrow" d="M114 88Q135 57 149 66" />
        <text x="223" y="75">RTX</text><text x="223" y="91">4050</text>
      </svg>
    );
  }
  if (kind === 'antenna') return <AntennaPattern steering={24} />;
  if (kind === 'trading') {
    return (
      <svg class="project-drawing trading-drawing" viewBox="0 0 300 170" role="img" aria-label="Illustrative order book with matching buy and sell orders">
        <text x="20" y="27">BUY ORDERS</text><text x="197" y="27">SELL ORDERS</text>
        {[0, 1, 2, 3].map((row) => <g key={row}>
          <rect class="bid-depth" x="20" y={43 + row * 26} width={[125, 94, 111, 69][row]} height="15" rx="3" />
          <rect class="ask-depth" x="155" y={43 + row * 26} width={[92, 120, 77, 104][row]} height="15" rx="3" />
          <text x="22" y={55 + row * 26}>$ {98 - row}.0</text><text x="253" y={55 + row * 26}>$ {101 + row}.0</text>
        </g>)}
        <path class="match-line" d="M148 38V149" />
        <circle class="match-dot" cx="150" cy="76" r="6" />
      </svg>
    );
  }
  return (
    <svg class="project-drawing noc-drawing" viewBox="0 0 300 170" role="img" aria-label="Network-on-chip diagram with a highlighted packet route">
      <path class="noc-links" d="M58 38H150H242 M58 85H150H242 M58 132H150H242 M58 38V85V132 M150 38V85V132 M242 38V85V132" />
      <path class="noc-route" d="M58 132H150V85H242V38" />
      {[58, 150, 242].flatMap((x) => [38, 85, 132].map((y) => <circle key={`${x}-${y}`} class="noc-node" cx={x} cy={y} r="9" />))}
      <text x="18" y="160">PACKET ROUTE, NO DEAD ENDS</text>
    </svg>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button class={`project-card ${project.palette} ${project.featured ? 'featured' : ''}`} type="button" onClick={() => onOpen(project)} aria-label={`Explore ${project.title}`}>
      <span class="card-art"><span class="card-art-note">{project.eyebrow}</span><ProjectDrawing kind={project.kind} /><span class="card-number">{project.number}</span></span>
      <span class="card-copy">{project.proof && <span class="card-proof">{project.proof}</span>}<span class="card-title">{project.title}</span><span class="card-short">{project.short}</span><span class="card-action">VIEW PROJECT DETAILS <span aria-hidden="true">↗</span></span></span>
    </button>
  );
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog ref={dialogRef} class={`project-dialog ${project?.palette ?? ''}`} onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    }}>
      {project && <>
          <div class="dialog-chrome"><span>PROJECT DETAILS <span class="drawer-light">●</span></span><button class="close-button" type="button" onClick={() => dialogRef.current.close()}>close <span aria-hidden="true">×</span></button></div>
        <div class="dialog-inner">
          <p class="dialog-eyebrow">{project.number} / {project.eyebrow}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <p class="dialog-curiosity">{project.curiosity}</p>
          {project.stats?.length > 0 && <div class="project-stats">{project.stats.map((stat) => <div class="project-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>}
          {project.sections?.length > 0 ? <div class="case-study">{project.sections.map((section, index) => <section class="case-section" key={section.label}><div class="case-section-index"><span>{String(index + 1).padStart(2, '0')}</span><span>{section.label}</span></div><h3>{section.title}</h3><p>{section.body}</p></section>)}</div> : <p class="dialog-detail">{project.details}</p>}
          <div class="project-notes">
            <div><span class="note-label">MY PART</span><p>{project.contribution}</p></div>
            <div><span class="note-label">THE OUTCOME</span><p>{project.outcome}</p></div>
          </div>
          {project.kind === 'antenna' && <BeamSandbox />}
          {project.stack.length > 0 && <div class="stack-list" aria-label="Tools and ideas used">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>}
          <div class="dialog-footer">{project.link ? <a href={project.link.href} target="_blank" rel="noreferrer">{project.link.label} ↗</a> : <span>{project.footer}</span>}{project.footer && project.link && <span>{project.footer}</span>}<button type="button" onClick={onClose}>close project details</button></div>
        </div>
      </>}
    </dialog>
  );
}

function BeamSandbox() {
  const [steering, setSteering] = useState(24);
  return (
    <section class="beam-sandbox" aria-label="Interactive antenna beam illustration">
      <div class="sandbox-heading"><span>BEAM BENDER 3000</span><span>TOY MODEL · 8 ELEMENTS</span></div>
      <AntennaPattern steering={steering} />
      <label class="steering-control">Nudge the beam <strong>{steering}°</strong><input type="range" min="-60" max="60" value={steering} onInput={(event) => setSteering(Number(event.currentTarget.value))} /></label>
      <p>Drag the slider. The lobe follows: a tiny, idealised uniform-array pattern for curious poking.</p>
    </section>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [packetSent, setPacketSent] = useState(false);
  const highlights = [projects[0], ...milestones];

  const sendPacket = () => {
    setPacketSent(true);
    window.setTimeout(() => setPacketSent(false), 1600);
  };

  return (
    <main class="site-shell">
      <header class="topbar">
        <a class="wordmark" href="#home" aria-label="Pramit's homepage">pramit's nook<span class="wordmark-star">✳</span></a>
        <nav aria-label="Main navigation"><a href="#things">things i made</a><a href="#tiny-about">a bit about me</a><a href="/files/cv.pdf" target="_blank" rel="noreferrer">view CV ↗</a></nav>
        <a class="hello-link" href="/files/cv.pdf" download="Pramit-Pal-CV.pdf">download CV <span aria-hidden="true">↓</span></a>
      </header>

      <section class="welcome" id="home">
        <div class="welcome-copy">
          <p class="hand-note"><span>hello from the internet</span><span aria-hidden="true">✳</span></p>
          <h1>Hi, I’m Pramit.<br />I make computers<br /><span>talk to each other.</span></h1>
          <p class="welcome-blurb">ECE student at BITS Pilani. I like taking the wide-angle view, then using computation to make something happen.</p>
          <button class="thought-button" type="button" onClick={() => setThoughtIndex((thoughtIndex + 1) % thoughts.length)}><span class="thought-spark">✳</span><span>{thoughts[thoughtIndex]}</span><span class="shuffle">another thought ↻</span></button>
        </div>
        <figure class="hero-illustration"><img src="/images/antenna-array-pattern.webp" alt="Radiation-pattern heatmap from my antenna-array beam-steering case study, with the target direction marked" /><figcaption><a href="https://github.com/ProAltro/Gradient-Based-Antenna-Array-Optimisation/blob/main/results/case_study_3_grid_beamsteering/pattern_2d_heatmap.png" target="_blank" rel="noreferrer">a real beam-steering plot from my repo ↗</a><span>✳</span></figcaption></figure>
        <span class="margin-doodle doodle-one" aria-hidden="true">bzzzt!</span><span class="margin-doodle doodle-two" aria-hidden="true">✳</span>
      </section>

      <section class="highlights" aria-labelledby="highlights-title">
        <div class="highlights-heading"><p class="hand-note">first, the useful context</p><h2 id="highlights-title">Recent plot twists</h2></div>
        <div class="highlight-grid">{highlights.map((item, index) => <button class={`highlight-card highlight-${index} ${item.palette}`} key={item.id} type="button" onClick={() => setSelectedProject(item)}>
          <span class="highlight-proof">{item.proof}</span><strong>{item.highlightTitle}</strong><span class="highlight-note">{item.highlightNote}</span><span class="highlight-more">a little more ↗</span>
        </button>)}</div>
      </section>

      <section class="campus-context" aria-labelledby="campus-title">
        <div class="campus-intro"><p class="hand-note">the person behind the projects</p><h2 id="campus-title">Me, in college</h2><p>I’m drawn to broad, tangled questions—and to figuring out where computation can make a difference. At BITS, that curiosity has taken me from satellite systems to AI/ML, with plenty of organising, debating, and tinkering along the way. I’m curious by default, open to work, and always ready to explore the next interesting problem.</p></div>
        <div class="campus-cards">
          <article class="campus-card campus-anant"><span>01 · BUILDING SYSTEMS</span><h3>Team Anant</h3><p>Systems Engineer in the student satellite club, thinking across subsystem boundaries and contributing to our satellite simulation work.</p></article>
          <article class="campus-card campus-ieee"><span>02 · COMPUTATION</span><h3>IEEE BITS Pilani</h3><p>Part of the AI/ML vertical. I’m interested in computation not just as a tool, but as a way to reason about—and move forward—larger problems.</p></article>
          <article class="campus-card campus-ideas"><span>03 · PEOPLE & IDEAS</span><h3>Debate, film & literature</h3><p>The Debating Society and Matrix, the Film and Literature Club, keep me around good arguments, stories, and people who see things differently.</p></article>
        </div>
        <a class="campus-next" href="#things">Now, come explore what I’ve been making <span aria-hidden="true">↓</span></a>
      </section>

      <section class="things-section" id="things">
        <div class="section-heading"><div><p class="hand-note">the stuff i've been poking at</p><h2>Big questions, small machines</h2></div><p class="poke-hint">The first two got especially out of hand. Click for the full story.</p></div>
        <div class="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>
        <div class="sidequests"><div class="sidequests-heading"><p class="hand-note">little systems for clubs, events & everything else</p><h3>Side quests</h3></div><div class="sidequest-grid">{sideProjects.map((project) => <button class="sidequest-card" key={project.id} type="button" onClick={() => setSelectedProject(project)}><span>{project.number}</span><strong>{project.title}</strong><small>{project.curiosity}</small><span class="sidequest-more">view project details ↗</span></button>)}</div></div>
      </section>

      <section class="tiny-about" id="tiny-about">
        <div class="about-note"><span class="note-pin">✳</span><p class="hand-note">field notes</p><h2>Mostly curious.<br />Occasionally caffeinated.</h2><p>I study Electronics and Communication Engineering at BITS Pilani. I like following a question until it turns into a circuit, a system, or a few thousand lines of code.</p><p>My default mode in a group: organise the big picture, then tinker with the pieces until they work together.</p><div class="interests-stack"><div><span>OFF THE CLOCK</span><p>Tennis, sci-fi, and classics.</p></div><div><span>ON MY SHELF</span><p><em>Foundation</em> · <em>The Three-Body Problem</em> · the classics shelf is always growing.</p></div><div><span>THE KIND OF PROBLEM I LIKE</span><p>System design with a wide-angle view—and computation that gets a real outcome over the line.</p></div><div><span>BEYOND ECE</span><p>Physics and mathematics keep me curious too: relativity, quantum computing, group theory, topology, and cryptography.</p></div></div></div>
        <div class="packet-toy"><p class="hand-note">a very tiny network</p><p>Can you send a packet across without getting lost?</p><div class={`toy-network ${packetSent ? 'packet-moving' : ''}`} aria-label="Interactive network with four nodes"><span class="toy-node node-a">start</span><span class="toy-node node-b">beep</span><span class="toy-node node-c">boop</span><span class="toy-node node-d">end</span><svg viewBox="0 0 300 120" aria-hidden="true"><path d="M32 62H110V27H190V82H268" /></svg><span class="toy-packet"></span></div><button class="packet-button" type="button" onClick={sendPacket} disabled={packetSent}>{packetSent ? 'packet delivered ✓' : 'send a packet →'}</button><p class="toy-caption">A tiny nod to my satellite-team systems-engineering days.</p></div>
      </section>

      <section class="elsewhere"><span>WHEN I’M NOT DEBUGGING WAVES</span><div><a href="https://github.com/ProAltro">my github ↗</a><a href="https://www.linkedin.com/in/pramit-p-8404a4264/">professional internet ↗</a><a href="mailto:pramit.pal2005@gmail.com">email-shaped hole ↗</a><a href="/files/cv.pdf" target="_blank" rel="noreferrer">view CV ↗</a><a href="/files/cv.pdf" download="Pramit-Pal-CV.pdf">download PDF ↓</a></div></section>
      <footer><span>made with curiosity (and probably too much coffee)</span><span>© PRAMIT PAL · 2026</span></footer>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

render(<App />, document.getElementById('app'));
