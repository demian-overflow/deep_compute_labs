int climbStairsRecursive(int n) {
    if (n <= 1) {
        return 1;
    }
    return climbStairs(n - 1) + climbStairs(n - 2);
}

// DP top-down
int solveMemo(int n, int* memo) {
    if (n <= 1) {
        return 1;
    }
    if (memo[n] != 0) {
        return memo[n];
    }
    memo[n] = solveMemo(n - 1, memo) + solveMemo(n - 2, memo);
    return memo[n];
}

int climbStairsMemoization(int n) {
    int* memo = (int*)calloc(n + 1, sizeof(int));
    int result = solveMemo(n, memo);
    free(memo);
    return result;
}

// DP Bottom-up
int climbStairsTabulation(int n) {
    if (n <= 1) {
        return 1;
    }
    int* dp = (int*)malloc(sizeof(int) * (n + 1));
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    int result = dp[n];
    free(dp);
    return result;
}

int climbStairs(int n) {
    if (n <= 1) {
        return 1;
    }
    int prev = 1;
    int curr = 1;
    for (int i = 2; i <= n; i++) {
        int temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    return curr;
}

// implement mbonacci
// min cost climbing stairs
//You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
//You can either start from the step with index 0, or the step with index 1.
//Return the minimum cost to reach the top of the floor.
