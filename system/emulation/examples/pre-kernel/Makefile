# Makefile to build and run the pre-kernel example

VMA ?= 0x00100000
ELF = prekernel.elf
BIN = prekernel.bin
OBJ = prekernel.o
AS = as
LD = ld
OBJCP = objcopy
QEMU = qemu-system-x86_64
QEMUPORT = 1234
QEMUMEM = 256M

all: build

build: $(BIN)

$(OBJ): prekernel.s
	$(AS) -o $@ $^

$(ELF): $(OBJ)
	$(LD) -o $@ -Ttext=$(VMA) $^

$(BIN): $(ELF)
	$(OBJCP) -O binary $^ $@

run: $(BIN)
	$(QEMU) -m $(QEMUMEM) -device loader,file=$(BIN),addr=$(VMA) -nographic -serial mon:stdio -S -gdb tcp::$(QEMUPORT)

# Connect gdb and set RIP to the VMA (so CPU begins execution at the binary entrypoint)
# Example usage: make gdb
gdb: $(ELF)
	gdb -ex "file $(ELF)" -ex "target remote :$(QEMUPORT)" -ex "set $rip=$(VMA)" -ex "continue"

clean:
	rm -f $(OBJ) $(ELF) $(BIN)

.PHONY: all build run gdb clean
