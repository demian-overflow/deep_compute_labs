    .intel_syntax noprefix
    .section .data

# Configuration constants
.equ FRAME_COUNT, 16
.equ FRAME_SIZE, 4096

    # Simulated physical memory (FRAME_COUNT * FRAME_SIZE bytes)
frames:
    .zero FRAME_COUNT * FRAME_SIZE

    # Metadata array: 0 = free, 1 = allocated
frame_meta:
    .zero FRAME_COUNT * 8  # 8 bytes per entry (uint64_t)

    .global init_frames
    .global alloc_frame
    .global free_frame

    .text

# void init_frames(void)
# Sets all frame_meta entries to 0
init_frames:
    push rbp
    mov rbp, rsp

    xor rsi, rsi        # index = 0
1:  cmp rsi, FRAME_COUNT
    jge 2f

    lea rdi, frame_meta
    mov rcx, rsi
    shl rcx, 3          # rcx = index * 8 (8-byte entries)
    add rdi, rcx
    mov qword ptr [rdi], 0

    inc rsi
    jmp 1b
2:
    pop rbp
    ret

# void *alloc_frame(void)
# Returns pointer in rax or 0 if none available
alloc_frame:
    push rbp
    mov rbp, rsp

    xor rsi, rsi        # index = 0
3:  cmp rsi, FRAME_COUNT
    jge 4f

    lea rdi, frame_meta
    mov rcx, rsi
    shl rcx, 3
    add rdi, rcx
    mov rax, qword ptr [rdi]
    cmp rax, 0
    jne 5f              # if not free, continue

    # mark allocated
    mov qword ptr [rdi], 1

    # compute frame pointer = &frames + index*FRAME_SIZE
    lea rax, frames
    mov rcx, rsi
    mov rdx, FRAME_SIZE
    mul rcx             # rax = rax * rcx; (uh-oh using lea rax, frames then mul breaks; we'll compute differently)

    # Alternative compute: rax = frames + index*FRAME_SIZE
    # compute frame pointer = frames + index * FRAME_SIZE
    lea rax, frames
    mov r10, rsi
    mov r11, FRAME_SIZE
    imul r10, r11       # r10 = index * FRAME_SIZE
    add rax, r10

    pop rbp
    ret

5:  inc rsi
    jmp 3b

4:  # none found -> return 0
    xor rax, rax
    pop rbp
    ret

# void free_frame(void *ptr)
# ptr is passed in rdi
free_frame:
    push rbp
    mov rbp, rsp

    mov rax, rdi           # rax = ptr
    lea r10, frames
    sub rax, r10           # offset = ptr - frames
    mov rcx, FRAME_SIZE
    xor rdx, rdx
    div rcx                # rax = offset / FRAME_SIZE ; rdx = offset % FRAME_SIZE
    # now rax = index

    # bounds check: index < FRAME_COUNT
    cmp rax, FRAME_COUNT
    jae 1f

    # frame_meta[index] = 0
    lea rdi, frame_meta
    mov r10, rax
    shl r10, 3
    add rdi, r10
    mov qword ptr [rdi], 0

1:
    pop rbp
    ret
