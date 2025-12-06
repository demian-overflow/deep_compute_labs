# Makefile for protected-mode two-stage example
NASM ?= nasm
LD ?= ld
QEMU ?= qemu-system-x86_64

IMG = boot.flp
MBR = boot.asm
STAGE2 = stage2.s
STAGE2_BIN = stage2.bin

all: $(IMG)

# build MBR (raw 512 bytes)
$(IMG): $(MBR) $(STAGE2_BIN)	
	$(NASM) -f bin -o boot.flp boot.asm
	# Append stage2 (binary) to the disk image (sector 2 onwards ignored for brevity)
	dd if=$(STAGE2_BIN) of=$(IMG) bs=512 seek=1 conv=notrunc > /dev/null 2>&1 || true

$(STAGE2_BIN): $(STAGE2)
	# Assemble stage2 to a flat binary (NASM produces a raw binary at org 0x8000)
	$(NASM) -f bin -o $(STAGE2_BIN) $(STAGE2)

run: $(IMG)
	$(QEMU) -m 64M -fda $(IMG) -nographic -serial mon:stdio

run-gdb: $(IMG)
	$(QEMU) -m 64M -fda $(IMG) -nographic -serial mon:stdio -S -gdb tcp::1234

clean:
	rm -f $(IMG) stage2.o stage2.elf $(STAGE2_BIN)

.PHONY: all run clean
