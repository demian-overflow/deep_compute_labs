#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

extern void init_frames(void);
extern void *alloc_frame(void);
extern void free_frame(void *ptr);

extern void init_pagetable(void);
extern void map_page(void *virt_addr, void *phys_addr);
extern void *translate(void *virt_addr);
extern void unmap_page(void *virt_addr);

int main(void) {
    init_frames();
    init_pagetable();

    void *f1 = alloc_frame();
    void *f2 = alloc_frame();

    printf("alloc frame f1 => %p\n", f1);
    printf("alloc frame f2 => %p\n", f2);

    // choose two virtual addresses to map
    void *v1 = (void *)0x1000; // 4KB
    void *v2 = (void *)0x2000; // 8KB

    map_page(v1, f1);
    map_page(v2, f2);

    void *t1 = translate(v1);
    void *t2 = translate(v2);

    printf("translate %p => %p\n", v1, t1);
    printf("translate %p => %p\n", v2, t2);

    if (t1 == f1 && t2 == f2) {
        printf("SUCCESS: translation matched physical frames\n");
    } else {
        printf("FAIL: unexpected translations\n");
    }

    // unmap and check
    unmap_page(v1);
    void *t1u = translate(v1);
    printf("translate after unmap %p => %p\n", v1, t1u);

    return 0;
}
