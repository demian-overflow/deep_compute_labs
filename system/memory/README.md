# Memory (Virtual Memory) — Overview

This document describes core concepts used by operating systems to provide virtual memory and manage pages, page tables, translation lookaside buffers (TLBs), and folios (compound pages).

---

## Virtual Memory

Virtual memory gives each process the illusion of a large, contiguous address space independent of physical memory.

```mermaid
flowchart LR
  subgraph A[Process]
    VAddr[Virtual Address]
  end
  MMU[MMU]
  Phys[Physical RAM]
  VAddr -->|translation| MMU -->|physical addr| Phys
```

Key points:
- Virtual addresses are translated to physical addresses by the MMU.
- Translation relies on page tables and caches (TLB).

---

## Pages

Memory is split into fixed-size pages (e.g., 4 KiB). The OS and CPU translate page-sized virtual blocks to physical frames.

```mermaid
flowchart LR
  V[Virtual Addr]
  PT[Page Table]
  PF[Physical Frame]
  V -->|page index| PT -->|frame| PF
```

Important fields for a page table entry (PTE) include the PFN (page frame number) and flags (present, rw, user, dirty, accessed).

---

## CPU / TLB

TLB (Translation Lookaside Buffer) is a small, fast cache inside the CPU to speed up address translation.

```mermaid
flowchart LR
  CPU[CPU]
  TLB[TLB]
  MMU[MMU]
  PT[Page Table]
  RAM[Physical RAM]
  CPU --> TLB
  TLB -->|hit| RAM
  TLB -->|miss| MMU --> PT --> RAM
```

Notes:
- TLB hits are fast; misses require a page-table walk or walk in hardware.
- Some architectures use multilevel page tables and hardware walks; others need OS intervention.

---

## Page Table

Page tables map virtual pages to physical frames; most systems use multilevel page tables to manage sparse virtual spaces.

```mermaid
graph TD
  VA[Virtual Address]
  L3(Level 3 index) --> L2(Level 2 index) --> L1(Level 1 index) --> PTE[Page Table Entry] --> PFN[Physical Frame]
  VA --> L3
```

Highlights:
- Multilevel tables reduce memory overhead for sparse virtual spaces.
- Each level indexes a portion of the virtual address.

---

## Virtual Memory Area (VMA)

A Virtual Memory Area is a contiguous range of virtual addresses in a process with a single set of permissions and attributes (e.g., code, data, stack, heap).

```mermaid
flowchart TB
  Text[Text / Code]
  Data[Initialized Data]
  Heap[Heap]
  Stack[Stack]
  Text --> Data --> Heap --> Stack
```

- Each VMA may correspond to a file mapping, anonymous memory, or machine-provided regions.
- VMAs make memory management policies (like `madvise`, `mprotect`) easier to apply over ranges.

---

## Quick Recap

- Virtual addresses are translated to physical frames using page tables and the MMU.
- Pages are the basic allocation unit; page tables and the TLB provide fast translation.
- VMAs group ranges of virtual addresses for consistent management.

---

## More Page Info

Pages carry metadata beyond mapping — refcounts, migration status, dirty/accessed bits, swap status, and flags like reserved or private.

```mermaid
flowchart LR
  Pg(Page)
  Pg --> Flags[flags: dirty, accessed, rw, user]
  Pg --> RC[refcount]
  Pg --> Swap[swap status]
```

- Refcount tracks how many holders (mappings, kernel users) refer to a page.
- Dirty/accessed are updated by the hardware or the OS after events.

---

## Compound Pages (Folios)

Compound pages (often called folios in modern kernels) combine several contiguous physical pages into a larger, atomically-managed unit (e.g., for huge pages or internal kernel operations).

```mermaid
flowchart LR
  Folio[Folio]
  Folio --> P0[Page 0]
  Folio --> P1[Page 1]
  Folio --> P2[Page 2]
```

- Folios reduce overhead when managing large, contiguous memory regions.
- Useful for huge pages, DMA buffers, or speculative prefetching.

---

## Virtual Memory Address Space (Layout)

A process address space typically has user-space and kernel-space regions with segments (text/data/heap/stack), shared mappings, and mmaps.

```mermaid
flowchart TB
  User[User Space]
  Kernel[Kernel Space]
  User --> Text --> Data --> Heap
  Heap --> Stack
  Kernel --> Modules
```

- Address layout and exact split depend on ABI and architecture (e.g., x86_64: canonical addresses, 48-bit vs 57-bit).
- ASLR (Address Space Layout Randomization) randomizes mappings to mitigate exploits.

---

## Further reading and links

- Look at your architecture's MMU specification for details (ARM, x86, RISC-V differ in details).
- Kernel sources (e.g., Linux mm layer) show real implementations of VMAs, folios, TLB shootdown, and page reclamation.

> Tip: These short mermaid diagrams are intentionally minimal; expand them per section as you need more depth.
