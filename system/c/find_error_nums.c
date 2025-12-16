int* findErrorNums(int* nums, int numsSize, int* returnSize) {
    int* errNums = (int*)malloc(2 * sizeof(int));
    int* seen = (int*)calloc(numsSize + 1, sizeof(int));

    for (int i = 0; i < numsSize; i++) {
        if (seen[nums[i]] == 1) {
            errNums[0] = nums[i]; // Duplicate
        }
        seen[nums[i]] = 1;
    }

    for (int i = 1; i <= numsSize; i++) {
        if (seen[i] == 0) {
            errNums[1] = i; // Missing
            break;
        }
    }

    free(seen);
    *returnSize = 2;
    return errNums;
}

