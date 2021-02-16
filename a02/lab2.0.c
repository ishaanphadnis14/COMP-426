#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <math.h>

// COMP 411 Lab 2 Starter Code

int main(int argc, char** argv) {

	/* char processors[10][100];
	float costs[10];
	float clockrates[10];
	float cpis[10];
	float executiontimes[10]; */

	int a; 
	char processor[a];
	char Processors[a][10];
	float Costs[a];
	float ClockRates[a];
	float CPIs[a];
	float ExecutionTimes[a];

	printf("Please enter the number of processors [1 to 10]: \n");
	scanf("%d", &a);

	for (int i = 0; i < a; i++) {
		printf("Processor Name (no spaces): \n");
		scanf("%s", processor[i][10]);
		strcpy(Processors[i], processor);
		printf("Processor cost (US dollars): \n");
		scanf("%f", &Costs[i]);
		printf("Processor clock rate (in GHz): \n");
		scanf("%f", &ClockRates[i]);
		CPIs[i] = printf("Processor average CPI: \n");
		scanf("%f", &CPIs[i]);
	}

	for (int i = 0; i < a; i++) {
		ExecutionTimes[i] = (CPIs[i] * (1 / ClockRates[i])) / 100;
	}
		
	printf("Now ranking execution times...  from lowest to highest execution time, your results are: \n");

	float k, l, m, n;
	char o [100];
	for (int i = 0; i < a - 1; i++){
		for (int j = 0; j < a - i - 1; j++){
			if (ExecutionTimes[j] > ExecutionTimes[j + 1]){
					
					k = ExecutionTimes[j];
					ExecutionTimes[j] = ExecutionTimes[j + 1];
					ExecutionTimes[j + 1] = k;


					l = Costs[j];
					Costs[j] = Costs[j + 1];
					Costs[j + 1] = l;

					m = ClockRates[j];
					ClockRates[j] = ClockRates[j + 1];
					ClockRates[j + 1] = m;

					n = CPIs[j];
					CPIs[j] = CPIs[j + 1];
					CPIs[j + 1] = n;

					strcpy(o, Processors[j]);
					strcpy(Processors[j], Processors[j + 1]);
					strcpy(Processors[j + 1], o);

				}
			}
		}

	for (int i = 0; i < a; i++) {
		printf("%s: %0.4f\n", Processors[i], (ExecutionTimes[i] * 10000) / 10000.0);
	}


	float targetTime;
	printf("What execution time (in seconds) are you targeting? \n");
	scanf("%f", &targetTime);

	int z = 0;
	for (int i = 0; i < a; i++){
		if (targetTime > ExecutionTimes[i]){
			if (Costs[i] < Costs[z]){
				z = i;
			}
		}
	}

	printf("The cheapest processor to meet your specification is: %s at a price of $%0.2f.\n", Processors[z], Costs[z]); 

	return 0;
} 