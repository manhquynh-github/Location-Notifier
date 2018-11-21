#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.uit.LocationNotifier/host.exp.exponent.MainActivity
