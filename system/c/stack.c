#include <stdlib.h>
#include <stdio.h>


int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
	;
}

int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    int* answer = (int*)malloc(temperaturesSize * sizeof(int));
    for (int i = 0; i < temperaturesSize; i++) {
        answer[i] = 0;
    }
    int* stack = (int*)malloc(temperaturesSize * sizeof(int));
    int top = -1; // Stack pointer

    for (int i = 0; i < temperaturesSize; i++) {
        while (top != -1 && temperatures[i] > temperatures[stack[top]]) {
            int prevIndex = stack[top--];
            answer[prevIndex] = i - prevIndex;
        }
        stack[++top] = i;
    }

    *returnSize = temperaturesSize;
    free(stack);
    return answer;
}


int largestRectangleArea(int* heights, int heightsSize) {
    int* stack = (int*)malloc((heightsSize + 1) * sizeof(int));
    int top = -1;
    int maxArea = 0;

    for (int i = 0; i <= heightsSize; i++) {
        int currentHeight = (i == heightsSize) ? 0 : heights[i];

        while (top != -1 && currentHeight < heights[stack[top]]) {
            int height = heights[stack[top--]];
            int width = (top == -1) ? i : (i - stack[top] - 1);
            int area = height * width;
            if (area > maxArea) {
                maxArea = area;
            }
        }
        stack[++top] = i;
    }

    free(stack);
    return maxArea;
}

// Rewrite to stack-based solution
int* plusOne(int* digits, int digitsSize, int* returnSize) {
    // Start from the last digit
    for (int i = digitsSize - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            *returnSize = digitsSize;
            return digits;
        }
        digits[i] = 0;
    }

    // If all digits are 9, we need to add a new digit
    int* incDigits = (int*)malloc((digitsSize + 1) * sizeof(int));
    incDigits[0] = 1;
    for (int i = 1; i <= digitsSize; i++) {
        incDigits[i] = 0;
    }
    *returnSize = digitsSize + 1;
    return incDigits;
}



void main() {
	int nums[4] = {2,7,11,15};
	int returnSize = 2;
	twoSumResult = twoSum(nums, 4, 9, returnSize);
	printf("\n[%d, %d]\n", twoSumResult[0], twoSumResult[1]);
	int temperatures[8] = {73,74,75,71,69,72,76,73};
	int returnSize = 8;
	int* result = dailyTemperatures(temperatures, 8, &returnSize);
	for (int i = 0; i < 8; i++) {
		printf("%d, ", result[i]);
	}
	printf("\n");
	int histogram[6] = {2,1,5,6,2,3};
	int result2 = largestRectangleArea(histogram, 6);
	printf("%d\n", result2);
}
