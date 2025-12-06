BITS 64
org 0x00100000

_start:
    ; send string to serial 0x3F8
    mov rsi, message
.loop:
    mov al, [rsi]
    test al, al
    jz .done
    mov dx, 0x3f8
    out dx, al
    inc rsi
    jmp .loop
.done:
    hlt
    jmp .done

message db 'Hello from 64-bit payload!\n',0
