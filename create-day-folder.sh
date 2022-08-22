#!/usr/bin/env bash

date=$(date +"%Y-%m-%d")
declare -i folderCount
folderCount=$(ls -d1q lessons/* | wc -l)
folderCount+=1

mkdir "lessons/day_${folderCount}_${date}"
