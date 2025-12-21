// Implement a program to generate the powerset of a given set of integers. pow(2, n) where n is a cardinality of the set.
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>


// Generate the powerset. Returns an array of int* where each int* is a subset
// of the original set. The number of subsets (2^n) is written into *size and
// the lengths of each subset are written into *subsetSizes (allocated here,
// caller must free).
int** generatePowerset(int* set, int n, int* size, int** subsetSizes) {
    if (n < 0) return NULL;

    *size = 1 << n; // 2^n subsets
    int total = *size;

    int** powerset = malloc(total * sizeof(int*));
    if (!powerset) {
        perror("malloc");
        exit(EXIT_FAILURE);
    }

    *subsetSizes = malloc(total * sizeof(int));
    if (!*subsetSizes) {
        perror("malloc");
        exit(EXIT_FAILURE);
    }

    for (int mask = 0; mask < total; ++mask) {
        int count = 0;
        for (int j = 0; j < n; ++j) if (mask & (1 << j)) ++count;

        (*subsetSizes)[mask] = count;
        if (count == 0) {
            powerset[mask] = NULL; // empty subset
            continue;
        }

        powerset[mask] = malloc(count * sizeof(int));
        if (!powerset[mask]) {
            perror("malloc");
            exit(EXIT_FAILURE);
        }

        int idx = 0;
        for (int j = 0; j < n; ++j) {
            if (mask & (1 << j)) {
                powerset[mask][idx++] = set[j];
            }
        }
    }

    return powerset;
}

int main(void) {
    int set[] = {1, 2, 3};
    int n = sizeof(set) / sizeof(set[0]);

    int size = 0;
    int* subsetSizes = NULL;
    int** powerset = generatePowerset(set, n, &size, &subsetSizes);

    printf("Powerset size: %d\n", size);
    for (int i = 0; i < size; ++i) {
        printf("{");
        if (subsetSizes[i] > 0) {
            for (int j = 0; j < subsetSizes[i]; ++j) {
                printf("%d", powerset[i][j]);
                if (j + 1 < subsetSizes[i]) printf(", ");
            }
        }
        printf("}\n");
    }

    // Free allocated memory
    for (int i = 0; i < size; ++i) {
        free(powerset[i]);
    }
    free(powerset);
    free(subsetSizes);

    return 0;
}