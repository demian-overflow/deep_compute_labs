# pre-kernel example

This example shows how to build a tiny bare-metal x86_64 program that writes to the serial port and how to load it into guest physical memory using QEMU's `-device loader` option.

Files:
- `prekernel.s` — GAS/AT&T assembly for a small "Hello" program that writes to serial port 0x3f8.
- `Makefile` — builds `prekernel.elf` and `prekernel.bin`, runs QEMU with the loader, and provides a `gdb` helper target to connect and set the instruction pointer.

Quick steps:

```bash
# build and create the flat binary
cd system/emulation/examples/pre-kernel
make

# start qemu paused with gdb on port 1234
make run

# in another terminal, connect and set $rip then run
cd system/emulation/examples/pre-kernel
make gdb
```

Notes:
- We link the ELF with `-Ttext=0x00100000` and load the raw binary at paddr `0x00100000` with QEMU; therefore setting `$rip=0x00100000` in gdb will cause the CPU to begin executing the binary.
- Serial output is forwarded to the QEMU stdio (so `Hello from pre-kernel!` will appear on the host terminal running QEMU).
- The program ends in an infinite halt loop; to cleanly exit QEMU, open another terminal and send `q` to the QEMU monitor (or start QEMU with `-device isa-debug-exit` and write to the port to exit).
- If your QEMU doesn't support `-device loader`, use the `-kernel` or `-bios` approach with a proper bootable ELF.

"How does it work?"
1. Assembler produces an object file.
2. Linker puts the program at the requested VMA (`0x00100000`).
3. `objcopy` creates a flat binary that contains only the program image.
4. QEMU `-device loader,file=...,addr=...` copies the binary into the guest physical memory at the specified address.
5. The CPU will not automatically jump to that address by default; we use gdb to set `$rip` to the VMA and resume execution.

This example is intended for demonstration and debugging practices rather than a production bootloader.
