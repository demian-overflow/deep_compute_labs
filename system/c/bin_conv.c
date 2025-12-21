#include <stdlib.h>
#include <math.h>
#include <stdio.h>



int binToDec(int* bin, int binSize) {
	int top = binSize - 1;
	int dec = 0;
	for (int i = 0; i < binSize; i++) {
		if (bin[top] == 1) {
			dec += pow(2, i);
		}
		top--;
	}
	return dec;
}


int* decToBin(int dec, int binSize) {
	int* bin = (int*)malloc(binSize * sizeof(int));
	int quotient = dec;
	for (int i = binSize - 1; i > 0; i--) {
		bin[i] = quotient % 2;
		quotient >>= 1;
	}
	return bin;
}


int binToDec8(int* bin) {
	return binToDec(bin, 8);
}


int* decToBin8(int dec) {
	return decToBin(dec, 8);
}


char** binBaseTwoToHex(int* bin, int binSize) {
	;
}

int BASE = 16;

int BIN_NIBBLE_HEX[4][16];
// hash table?

void buildBinHexTable() {
	int subbase = BASE;
	for (int i = 0; i < 4; i++) {
		subbase >>= 1; // 8 4 2 1
		int valve = subbase;
		int currValue = 0;
		for (int j = 0; j < 16; j++) {
			if (valve == 0) {
				if (currValue == 0) {
					currValue = 1;
				} else {
					currValue = 0;
				}
				valve = subbase;
			}
			BIN_NIBBLE_HEX[i][j] = currValue;
			valve--;
		}
	}
}


const char BIN_TO_HEX[16] = {
    '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
};


char bin4ToHex(const char *bin_chunk) {
    int value = 0;
    value |= (bin_chunk[0] - '0') << 3;
    value |= (bin_chunk[1] - '0') << 2;
    value |= (bin_chunk[2] - '0') << 1;
    value |= (bin_chunk[3] - '0');
    return BIN_TO_HEX[value];
}


void main () {
	int d = 7;
	int bin7[8] = {0, 0, 0, 0, 0, 1, 1, 1};
	printf("%d\n", binToDec8(bin7));
	int* r = decToBin8(d);
	for (int i = 0; i < 8; i++) {
		printf("%d", r[i]);
	}
	printf("\n");
	int* r2 = decToBin8(89);
	for (int i = 0; i < 8; i++) {
		printf("%d", r2[i]);
	}
	buildBinHexTable();
	printf("\n");
	for (int i = 0; i < 16; i++) {
		printf("%c", BIN_TO_HEX[i]);
	}
	for (int i = 0; i < 4; i++) {
		printf("\n");
		for (int j = 0; j < 16; j++) {
			printf("%d", BIN_NIBBLE_HEX[i][j]);
		}
	}
	printf("\n");
}

