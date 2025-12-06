# Protected mode example

This example shows a two-stage boot process: a floppy MBR boot sector loads a stage2 binary at 0x8000 and then stage2 switches the CPU to protected (32-bit) mode.

Build & run

```bash
cd system/emulation/examples/boot/protected
make
make run
```

The QEMU terminal should show the protected-mode message forwarded to serial (ttyS0). If you want to inspect the CPU state in gdb, modify the `run` target in the Makefile to start with `-S -gdb tcp::1234` and use a second terminal to run `gdb` and connect. Then inspect registers and memory:

```bash
gdb -ex "target remote :1234" -ex "file stage2.bin" -ex "x/64xb 0x8000" -ex "x/s 0x8000" -ex "info registers"
```

Notes & Caveats

- The MBR uses BIOS int 13h to read sector 2 into 0x8000 and then jumps to it; ensure your floppy image contains stage2 binary at sector 2.
- `stage2.bin` is assembled using `nasm` with `org 0x8000` so it expects to be run at that address.
- This code is intentionally minimal and demonstrates the essentials of switching to protected mode; it is not production-grade and lacks many safety checks and robust disk IO.
