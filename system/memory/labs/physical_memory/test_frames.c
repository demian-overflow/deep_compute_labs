#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

extern void init_frames(void);
extern void *alloc_frame(void);
extern void free_frame(void *ptr);

int main(void) {
    init_frames();
    printf("init frames\n");

    void *a = alloc_frame();
    printf("alloc frame A => %p\n", a);

    void *b = alloc_frame();
    printf("alloc frame B => %p\n", b);

    free_frame(a);
    printf("free frame A => %p\n", a);

    void *c = alloc_frame();
    printf("alloc frame C => %p\n", c);

    if (c == a) {
        printf("SUCCESS: freed frame reused\n");
    } else {
        printf("NOTICE: freed frame not reused (but still OK)\n");
    }

    return 0;
}
