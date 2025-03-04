#include <stdio.h>

__global__ void cuda_hello() {
    printf("Hello, World from GPU thread %d!\n", threadIdx.x);
}

int main() {
    printf("Hello from CPU!\n");
    
    // Launch kernel with 5 threads
    cuda_hello<<<1, 5>>>();
    
    // Wait for GPU to finish
    cudaDeviceSynchronize();
    
    return 0;
} 