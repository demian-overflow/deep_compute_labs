    .intel_syntax noprefix
    .section .data

.equ PAGE_TABLE_ENTRIES, 1024
.equ PAGE_SIZE, 4096

page_table:
    .zero PAGE_TABLE_ENTRIES * 8

    .global init_pagetable
    .global map_page
    .global translate
    .global unmap_page

    .text

# void init_pagetable(void)
init_pagetable:
    push rbp
    mov rbp, rsp

    xor rsi, rsi        # index = 0
1:  cmp rsi, PAGE_TABLE_ENTRIES
    jge 2f

    lea rdi, page_table
    mov r10, rsi
    shl r10, 3
    add rdi, r10
    mov qword ptr [rdi], 0

    inc rsi
    jmp 1b
2:
    pop rbp
    ret

# void map_page(void *virt_addr, void *phys_addr)
# rdi = virt, rsi = phys
map_page:
    push rbp
    mov rbp, rsp

    mov rax, rdi
    mov r10, rax
    shr r10, 12         # r10 = vpn

    cmp r10, PAGE_TABLE_ENTRIES
    jae 1f

    lea r11, page_table
    mov rcx, r10
    shl rcx, 3
    add r11, rcx
    mov qword ptr [r11], rsi

1:
    pop rbp
    ret

# void *translate(void *virt_addr) -> returns physical address or NULL
translate:
    push rbp
    mov rbp, rsp

    mov rax, rdi
    mov r10, rax
    shr r10, 12          # r10 = vpn

    cmp r10, PAGE_TABLE_ENTRIES
    jae 2f

    lea r11, page_table
    mov rcx, r10
    shl rcx, 3
    add r11, rcx
    mov rdx, qword ptr [r11]   # rdx = entry
    cmp rdx, 0
    je 2f

    # compute offset: offset = virt & (PAGE_SIZE - 1)
    mov rax, rdi
    and rax, 4095
    add rax, rdx
    pop rbp
    ret

2:
    xor rax, rax
    pop rbp
    ret

# void unmap_page(void *virt_addr)
unmap_page:
    push rbp
    mov rbp, rsp

    mov rax, rdi
    mov r10, rax
    shr r10, 12

    cmp r10, PAGE_TABLE_ENTRIES
    jae 1f

    lea r11, page_table
    mov rcx, r10
    shl rcx, 3
    add r11, rcx
    mov qword ptr [r11], 0

1:
    pop rbp
    ret
