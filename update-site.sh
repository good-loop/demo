#!/bin/bash
printf "\nUpdating the Website...\n"
printf "\nHeppner is pulling the latest changes from github.com...\n"
ssh winterwell@heppner.soda.sh 'git --git-dir=/home/winterwell/demo.good-loop.com/.git/ --work-tree=/home/winterwell/demo.good-loop.com gc --prune=now'
ssh winterwell@heppner.soda.sh 'git --git-dir=/home/winterwell/demo.good-loop.com/.git/ --work-tree=/home/winterwell/demo.good-loop.com pull origin master'
ssh winterwell@heppner.soda.sh 'git --git-dir=/home/winterwell/demo.good-loop.com/.git/ --work-tree=/home/winterwell/demo.good-loop.com reset --hard FETCH_HEAD'
printf "\nwebsite updated\n"
