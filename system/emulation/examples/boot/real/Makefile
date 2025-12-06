# Makefile for real-mode MBR example
NASM ?= nasm
QEMU ?= qemu-system-x86_64
IMG = boot.flp
ASM = boot.asm

all: $(IMG)

$(IMG): $(ASM)
	$(NASM) -f bin -o $@ $^

run: $(IMG)
	$(QEMU) -m 16M -fda $(IMG) -nographic -serial mon:stdio

run-gdb: $(IMG)
	$(QEMU) -m 16M -fda $(IMG) -nographic -serial mon:stdio -S -gdb tcp::1234

clean:
	rm -f $(IMG)

.PHONY: all run clean
