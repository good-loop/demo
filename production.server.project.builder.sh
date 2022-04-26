#!/bin/bash
/home/winterwell/config/build-scripts/builder.sh \
BUILD_TYPE="production" \
PROJECT_NAME="demo" \
BRANCH_NAME="master" \
NAME_OF_SERVICE="" \
GIT_REPO_URL="github.com:good-loop/demo" \
PROJECT_ROOT_ON_SERVER="/home/winterwell/demo" \
PROJECT_USES_BOB="no" \
PROJECT_USES_NPM="yes" \
PROJECT_USES_WEBPACK="yes" \
PROJECT_USES_JERBIL="no" \
PROJECT_USES_WWAPPBASE_SYMLINK="yes"
