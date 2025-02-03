#!/bin/bash

if [ -z "$1" ]; then
	printf "No arguments supplied"
	exit 1
else
	for dir in "$@"; do
		mkdir "ex$dir"
	done
fi
