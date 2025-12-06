[org 0x7c00]
; Minimal MBR / BIOS boot sector that prints a message using BIOS int 0x10 and serial
; Prints "Real-mode example: Hello!" to both video (int 0x10) and serial (port 0x3F8)

[BITS 16]

start:
    ; initialize stack
    xor ax, ax
    mov ss, ax
    mov sp, 0x7c00

    ; Initialize COM1 (0x3F8) for 8N1 at 115200 (simplified)
    mov dx, 0x3f8
    mov al, 0x00
    out dx, al

    ; Print string via BIOS int 0x10 (teletype) and also via serial
    mov si, message
print_loop:
    lodsb
    cmp al, 0
    je done_print

    ; video
    mov ah, 0x0e
    mov bh, 0x00
    int 0x10

    ; serial (outb)
    mov dx, 0x3f8
    out dx, al

    jmp print_loop

done_print:
    cli
hang:
    hlt
    jmp hang

message: db "Real-mode example: Hello!", 0x0d, 0x0a, 0

times 510-($-$$) db 0
dw 0xAA55
