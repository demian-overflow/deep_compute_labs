[org 0x7c00]
; MBR that loads a second stage from disk into 0x8000 and jumps to it (real mode)
; Stage 2 switches to protected 32-bit mode and prints a message using woutb (port I/O)

[BITS 16]

start:
    cli
    xor ax, ax
    mov ss, ax
    mov sp, 0x7c00

    mov si, msg_real
print_video:
    lodsb
    cmp al, 0
    je after_print
    mov ah, 0x0e
    mov bh, 0x00
    int 0x10
    jmp print_video
after_print:

    ; Load stage2 (sector 2) at 0x8000: set up ES:BX = 0x0000:0x8000
    mov bx, 0x0000
    mov es, bx
    mov bx, 0x8000
    ; INT 13h read: AH=02, AL=1 (sectors), CH=cyl, CL=sector, DH=head, DL=drive
    mov ah, 0x02
    mov al, 0x01
    mov ch, 0x00
    mov cl, 0x02
    mov dh, 0x00
    ; boot drive is provided in DL on entry - preserve value
    ; int 13h will read the sector into ES:BX
    int 0x13

    ; Jump to stage2 loader - still real mode but stage2 will switch to protected mode
    jmp 0x0000:0x8000

loop:

msg_real: db "MBR->Loading protected mode stage...", 0x0d,0x0a,0

times 510-($-$$) db 0
dw 0xAA55
