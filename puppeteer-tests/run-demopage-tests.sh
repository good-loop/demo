#!/bin/bash

########
### Satisfy NPM contingencies
#######
printf "\nGetting NPM Packages to Run Jest Tests...\n"
npm i

#########
### Run the tests
#########
RES=$(cd ~/winterwell/wwappbase.js/test-base/res/ && find -iname "*.js")
#Jest will babel any test files itself,
#but anything it sees as "outside of its runtime" (config files)
#need to be babeled by us
printf "\nBabeling config files..."
for js_file in ${RES[*]}; do
	babel ~/winterwell/wwappbase.js/test-base/res/$js_file --out-file ~/winterwell/wwappbase.js/test-base/babeled-res/$js_file
done

printf "\nLaunching Jest... \n"
cd /home/$USER/winterwell/demo/puppeteer-tests/
#Probably want to send it to a test directory other than __tests__. 
#Won't really be able to separate good-loop and adserver tests otherwise
npm run jest -- --config ./jest.config.json