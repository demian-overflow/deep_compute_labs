/**
 * Note: The returned array must be malloced, assume caller calls free().
 *
 *   2 <= nums.length <= 500
 *   0 <= nums[i] <= 100
 * 
 *
 */
#include <stdlib.h>


int* smallerNumbersThanCurrent(int* nums, int numsSize, int* returnSize) {
    int* result = (int*)malloc(numsSize * sizeof(int));
    int freq[101] = {0};
    int prefix[101] = {0};

    for(int i = 0; i < numsSize; i++){
        freq[nums[i]]++;
    }

    for(int i = 1; i <= 100; i++){
        prefix[i] = prefix[i-1] + freq[i-1];
    }

    for(int i = 0 ; i < numsSize; i++){
        result[i] = prefix[nums[i]];
    }

    *returnSize = numsSize;
    return result;
}


void main () {
	smallerNumbersThanCurrent([8,1,2,2,3], 5, 0);
}
