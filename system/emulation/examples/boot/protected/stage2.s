; Stage2 (NASM style): runs in real mode, sets up GDT and switches to protected mode
; Assembled using nasm, linked or converted to a binary, and appended to a raw floppy image
BITS 16
org 0x8000

start:
    cli
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0x9000

    ; Load GDT descriptor (32-bit address) - will be used after switching
    lgdt [gdt_descriptor]

    ; enable protected mode via CR0
    mov eax, cr0
    or eax, 1
    mov cr0, eax

    ; far jump to protected mode code selector
    jmp 0x08:protected_entry

; switch to 32-bit mode
BITS 32
protected_entry:
    mov ax, 0x10
    mov ds, ax
    mov es, ax
    mov fs, ax
    mov gs, ax
    mov ss, ax

    ; set up serial DX register
    mov dx, 0x3F8
    mov esi, msg
print_loop32:
    lodsb
    test al, al
    jz done
    out dx, al
    jmp print_loop32
done:
    cli
hang:
    hlt
    jmp hang

; GDT and descriptor for protected mode
gdt_table:
    dq 0x0000000000000000
    dq 0x00CF9B000000FFFF
    dq 0x00CF93000000FFFF
gdt_descriptor:
    dw 3*8-1
    dd gdt_table

msg: db 'Protected-mode example: Hello from 32-bit!', 0





