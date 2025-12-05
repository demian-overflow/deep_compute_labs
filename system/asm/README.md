# system/asm — Assembly Labs and Virtual Memory

This folder contains assembler-based labs and examples aimed at teaching low-level memory management and virtual memory concepts. The content and labs use GNU Assembler (gas/AT&T syntax); I'll also show how to use `nasm` (Intel syntax) where relevant.

---

## Quick start — assembling and running examples (x86-64 Linux)

### 1) Using GNU `as` + `ld` (recommended for `.s` GAS/AT&T files)

From the workspace root, run:

```bash
# assemble and link the example
as hello/assembly/hello.s -o hello/assembly/hello.o
ld hello/assembly/hello.o -o hello/bin/hello_as

# run
./hello/bin/hello_as
```

Notes:
- The sample `hello.s` uses direct syscalls for Linux x86_64. If you see relocation errors, link with `-dynamic-linker` or use `gcc` as the linker driver instead.

### 2) Using `gcc` to assemble and link

`gcc` is convenient because it handles linking flags and PIE modes for you:

```bash
# Assemble and link in one step
gcc -no-pie -o hello/bin/hello_gcc hello/assembly/hello.s
./hello/bin/hello_gcc
```

If your toolchain supports PIE by default, `-no-pie` forces a non-position-independent binary and avoids `_start` label differences.

### 3) Using NASM (Intel syntax)

You may prefer Intel syntax and `nasm`:

```nasm
; hello.nasm (Intel syntax)
section .data
    msg db "Hello, World!", 10
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall
```

Assemble and link with:

```bash
nasm -felf64 hello/assembly/hello.nasm -o hello/assembly/hello_nasm.o
ld hello/assembly/hello_nasm.o -o hello/bin/hello_nasm
./hello/bin/hello_nasm
```
