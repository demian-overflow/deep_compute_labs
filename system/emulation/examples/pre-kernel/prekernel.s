.section .text
.global _start

# Simple bare-metal 64-bit program that writes a message to serial port 0x3F8
# Built for a fixed VMA (e.g., 0x00100000) and meant to be loaded to that PADDR

_start:
    lea msg(%rip), %rsi
1:
    movb (%rsi), %al
    testb %al, %al
    je 2f
    mov $0x3f8, %dx
    outb %al, %dx
    inc %rsi
    jmp 1b
2:
    cli
.cycle:
    hlt
    jmp .cycle

.section .rodata
msg:
    .ascii "Hello from pre-kernel!\n\0"
