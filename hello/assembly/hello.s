.section .data
    msg:
        .ascii "Hello, World!\n"
        len = . - msg

.section .text
    .global _start

_start:
    # Write the message to stdout (file descriptor 1)
    movq $1, %rax       # syscall for write
    movq $1, %rdi       # file descriptor 1 (stdout)
    movq $msg, %rsi     # address of message
    movq $len, %rdx     # length of message
    syscall             # call kernel

    # Exit the program
    movq $60, %rax      # syscall for exit
    xorq %rdi, %rdi     # return code 0
    syscall             # call kernel