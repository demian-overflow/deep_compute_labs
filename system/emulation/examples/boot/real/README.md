# Real mode example

This example is a minimal BIOS boot sector MBR that prints a message with BIOS `int 0x10` and serial port `0x3F8`.

To build & run:

```bash
cd system/emulation/examples/boot/real
make
make run
```

You should see the message on the terminal running `make run`.

Inspect with gdb:

1) Start QEMU paused and listening for gdb in the `run` target by editing the Makefile or running directly:

```bash
qemu-system-x86_64 -m 16M -fda boot.flp -nographic -serial mon:stdio -S -gdb tcp::1234
```

2) Connect with gdb:

```bash
gdb -ex "target remote :1234" -ex "file boot.flp"
# inspect memory at 0x7c00 (boot sector loaded there)
x/64xb 0x7c00
# view registers
info registers
```

Note: the CPU is in 16-bit real mode after reset; you won't be able to directly execute 32/64-bit instructions until you switch or load a proper protected/long mode environment.
