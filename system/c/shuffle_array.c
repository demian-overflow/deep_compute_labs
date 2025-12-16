#include <stdio.h>

void shuffle(int* nums, int numsSize, int n, int* shuffled) {
    for (int i = 0; i < n; i++) {
        shuffled[2 * i] = nums[i];          // First half
        shuffled[2 * i + 1] = nums[n + i];  // Second half
    }
}

int main() {
    int nums[] = {2, 5, 1, 3, 4, 7};
    int n = 3;
    int numsSize = 6;
    int shuffled[6]; // Allocate space for the shuffled array

    shuffle(nums, numsSize, n, shuffled);

    // Print the result
    for (int i = 0; i < numsSize; i++) {
        printf("%d ", shuffled[i]);
    }
    // Output: 2 3 5 4 1 7
    return 0;
}

