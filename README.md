# Deep Compute Labs

## Overview

Educational repository for deep CS, ML, Cybersec.

## Requirements

- **C**: GCC or another C compiler
- **Rust**: Rust compiler and cargo (install from https://rustup.rs/)
- **Assembly**: NASM assembler and ld linker
- **CUDA**: NVIDIA CUDA Toolkit and compatible GPU

## Confirm setup

### C

```bash
gcc --version
gcc hello/C/hello.c -o hello/bin/C
./hello/bin/C
```

### Rust

```bash
rustc --version
cargo --version
rustc hello/rust/hello.rs -o hello/bin/rust
./hello/bin/rust
```

### Assembly

```bash
as --version
ld --version
as hello/assembly/hello.s -o hello/assembly/hello.o
ld hello/assembly/hello.o -o hello/bin/assembly
./hello/bin/assembly
```

### CUDA

```bash
nvcc --version
nvidia-smi
nvcc hello/cuda/hello.cu -o hello/bin/cuda
./hello/bin/cuda
```


## Theory roadmap
```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffdfd3', 'edgeLabelBackground':'#fff', 'tertiaryColor': '#fff0f0'}}}%%
mindmap
  root((Mathematical Foundations<br>for Deep CS, ML, and Cryptography))
    Overview
      Comprehensive learning plan
      Covers ML, cryptography, CS fundamentals
    Core Mathematical Foundations
      Phase 1: Essential Mathematics
        Linear Algebra
          Vectors, matrices, eigenvalues
          Applications: Neural networks, graphics
        Calculus
          Limits, derivatives, integrals
          Applications: Optimization, gradient descent
        Probability & Statistics
          Distributions, hypothesis testing
          Applications: Statistical ML, security
        Discrete Mathematics
          Logic, graph theory, combinatorics
          Applications: Algorithms, data structures
      Phase 2: Advanced Topics
        Abstract Algebra
          Groups, rings, fields
          Applications: Cryptography, quantum computing
        Number Theory
          Modular arithmetic, primes
          Applications: Public-key crypto, blockchain
        Information Theory
          Entropy, mutual information
          Applications: Compression, ML
        Optimization Theory
          Convex optimization, gradient methods
          Applications: Training ML models
    Specialized Tracks
      Machine Learning Mathematics
        Functional analysis, kernels, statistical learning
      Cryptography & Blockchain Mathematics
        Elliptic curves, zero-knowledge proofs, hashing
      Theoretical Computer Science
        Computability, complexity, automata, type theory
    Learning Approach
      Foundations First
      Practice Problems
      Applied Projects
      Paper Reading
      Interdisciplinary Connections
    Suggested Learning Projects
      Implement cryptographic primitives
      Build neural networks from scratch
      Visualization tools
      Implement ML algorithms
      Develop blockchain primitives
    Assessment Strategies
      Implement algorithms in C/Rust/CUDA
      Reproduce paper results
      Create teaching notebooks
      Contribute to open-source
```
