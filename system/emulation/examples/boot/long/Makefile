# Makefile for long-mode guidance
# This helper is not expected to fully build a kernel, but shows common steps
default:
	@echo "Targets: build-iso, qemu-kernel"

build-iso:
	@echo "This will try to build a grub ISO with a sample 64-bit kernel (if you have a kernel and grub-mkrescue installed)."
	@echo "You should provide a bzImage in this directory (named 'bzImage') and an initramfs 'initramfs.cpio.gz'"
	@if [ -f bzImage -a -f initramfs.cpio.gz ]; then \
		mkdir -p iso/boot/grub; cp bzImage initramfs.cpio.gz iso/boot/; printf 'set default=0\nset timeout=5\nmenuentry "mykernel" {\n multiboot /boot/bzImage\n module /boot/initramfs.cpio.gz\n}' > iso/boot/grub/grub.cfg; grub-mkrescue -o long-demo.iso iso; echo "Built long-demo.iso"; else echo "Place 'bzImage' and 'initramfs.cpio.gz' in this dir before calling build-iso"; fi

qemu-kernel:
	@echo "Start QEMU with -kernel and initramfs (custom kernel needed)"
	@echo "qemu-system-x86_64 -m 1G -kernel ./bzImage -initrd ./initramfs.cpio.gz -append 'root=/dev/ram console=ttyS0' -nographic -serial mon:stdio"

hello64.bin: hello64.s
	$(NASM) -f bin -o $@ $^

run-loader: hello64.bin
	$(QEMU) -m 256M -device loader,file=hello64.bin,addr=0x00100000 -nographic -serial mon:stdio -S -gdb tcp::1234

.PHONY: build-iso qemu-kernel
