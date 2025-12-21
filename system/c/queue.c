#include <stdbool.h>
#include <stdlib.h>

typedef struct {
    int* stack_in;
    int* stack_out;
    int top_in;
    int top_out;
    int capacity;
} MyQueue;

MyQueue* myQueueCreate() {
    MyQueue* queue = (MyQueue*)malloc(sizeof(MyQueue));
    queue->capacity = 100; // You can adjust the capacity as needed
    queue->stack_in = (int*)malloc(queue->capacity * sizeof(int));
    queue->stack_out = (int*)malloc(queue->capacity * sizeof(int));
    queue->top_in = -1;
    queue->top_out = -1;
    return queue;
}

void myQueuePush(MyQueue* obj, int x) {
    if (obj->top_in == obj->capacity - 1) {
        // Handle stack overflow (not implemented here for simplicity)
        return;
    }
    obj->stack_in[++(obj->top_in)] = x;
}

void transferStacks(MyQueue* obj) {
    while (obj->top_in != -1) {
        obj->stack_out[++(obj->top_out)] = obj->stack_in[obj->top_in--];
    }
}

int myQueuePop(MyQueue* obj) {
    if (obj->top_out == -1) {
        if (obj->top_in == -1) {
            // Queue is empty
            return -1; // Or handle error as needed
        }
        transferStacks(obj);
    }
    return obj->stack_out[obj->top_out--];
}

int myQueuePeek(MyQueue* obj) {
    if (obj->top_out == -1) {
        if (obj->top_in == -1) {
            // Queue is empty
            return -1; // Or handle error as needed
        }
        transferStacks(obj);
    }
    return obj->stack_out[obj->top_out];
}

bool myQueueEmpty(MyQueue* obj) {
    return (obj->top_in == -1) && (obj->top_out == -1);
}

void myQueueFree(MyQueue* obj) {
    free(obj->stack_in);
    free(obj->stack_out);
    free(obj);
}
