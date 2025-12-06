# Boot mode walkthrough examples

This folder contains minimal examples and guidance to follow CPU mode changes across reset, real mode, protected mode, and long mode on x86 running in QEMU. The purpose is to let you build and run small demonstrations and inspect CPU registers, guest physical memory, and serial output as you step through the system boot flow.

Mermaid diagram (overview):

```mermaid
flowchart LR
  Reset[Reset] --> Real[Real mode (16-bit)]
  Real --> BIOS[BIOS/UEFI firmware]
  BIOS --> Bootloader[Bootloader (MBR/EFI)]
  Bootloader --> Protected[Protected mode (32-bit)]
  Protected --> V86[V86: vm86 attribute]
  Protected --> Long[Long mode / IA-32e (64-bit)]
  Any --> SMM[System Management Mode (SMM) - separate context]
  SMM -.-> Return[Return to previous mode]
  Long --> Kernel[Guest kernel (64-bit)]
  Protected --> Kernel32[Guest kernel (32-bit)]
```

Sections:
- `real/` — minimal BIOS boot sector (MBR) that prints text using the serial port and BIOS interrupts.
- `protected/` — a tiny two-stage bootloader; stage 1 (512-byte MBR) loads stage 2, stage 2 uses a small protected-mode setup to demonstrate switching to 32-bit and printing via serial I/O.
- `long/` — instructions & skeleton for transitioning to long mode and running a minimal 64-bit payload (this is advanced and requires more steps; also provides a GRUB-based method to boot a 64-bit ELF).

How to use these examples
Each example contains a `Makefile`. Typical workflow:

```bash
cd system/emulation/examples/boot/real
make
make run  # boots QEMU and prints out from serial
```

Quick debug tips
----------------
- Start QEMU with `-S -gdb tcp::1234` to pause at reset and attach `gdb` remotely to inspect registers and memory.
- For real and protected examples, use `make run-gdb` which starts QEMU paused and waiting for gdb.
- Use the QEMU monitor's `info registers` or gdb's `info registers` to inspect CR0/CR3/EFER and CS to infer CPU mode.

For `protected`, do the same inside `protected/`.

NOTE: The serial output appears in the terminal where you run `make run`.

Files & layout
--------------
- `real/` — `boot.asm`, `Makefile`; builds a 512-byte MBR image (`boot.flp`) and runs it in QEMU.
- `protected/` — `boot.asm` (MBR), `stage2.s` (protected loader), `Makefile`; stage2 switches to protected mode.
- `long/` — documentation and skeleton; a recommended method is to use a GRUB-based disk image or implement a more advanced bootstrap that enables PAE/paging and long-mode.

Long mode / SMM / V86 notes
--------------------------
- SMM (System Management Mode) is typically not wanted for these examples. It's entered via an SMI (System Management Interrupt) and switches the CPU to a separate address space—this is usually platform-proprietary code.
- V86 (Virtual 8086) is not a distinct mode: it’s a protected-mode attribute to run 8086 code under the protection of the OS. You can only exercise V86 when in protected mode.
