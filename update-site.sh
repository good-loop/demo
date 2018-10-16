#!/bin/bash

case $1 in
	production|PRODUCTION)
		printf "\nPublishing Demo site to the PRODUCTION server\n"
		TARGET='heppner.soda.sh'
	;;
	test|TEST)
		printf "\nPublishing Demo site to the TEST server\n"
		TARGET='hugh.soda.sh'
	;;
	*)
		printf "\nThis script must be run with 'test' or 'production' as the argument\n"
		exit 0
	;;
esac

PROJECT='Good-Loop Demo Site'
SSHCOMMAND="ssh winterwell@$TARGET"
TARGETDIR='/home/winterwell/demo.good-loop.com'
GITSHORTHAND="git --git-dir=$TARGETDIR/.git/ --work-tree=$TARGETDIR"

printf "\nTelling the server to update it's $PROJECT git repo\n"
printf "\t> Garbage Collecting...\n"
$SSHCOMMAND "$GITSHORTHAND gc --prune=now"
printf "\t> Pulling Origin...\n"
$SSHCOMMAND "$GITSHORTHAND pull origin master"
printf "\t> Resetting Files to version held on github\n"
$SSHCOMMAND "$GITSHORTHAND reset --hard FETCH_HEAD"

printf "\t> Optimising Images...\n"
$SSHCOMMAND "optipng $TARGETDIR/webroot/img/*.png"
$SSHCOMMAND "jpegoptim $TARGETDIR/webroot/img/*.jpg"
$SSHCOMMAND "jpegoptim $TARGETDIR/webroot/img/*.jpeg"

printf "\t> Setting permissions on the image files\n"
$SSHCOMMAND "chmod 766 $TARGETDIR/webroot/img/*.png"
$SSHCOMMAND "chmod 766 $TARGETDIR/webroot/img/*.jpg"
$SSHCOMMAND "chmod 766 $TARGETDIR/webroot/img/*.jpeg"

printf "\t> Converting Markdown to HTML...\n"
$SSHCOMMAND 'wget -cO - "https://www.winterwell.com/software/downloads/jerbil-all.jar" >> /home/winterwell/jerbil/jerbil-all.jar'
$SSHCOMMAND "cd /home/winterwell/jerbil/ && java -cp jerbil-all.jar Jerbil $TARGETDIR"

printf "\t> Getting NPM dependencies...\n"
$SSHCOMMAND 'cd /home/winterwell/demo.good-loop.com && npm i'

printf "$PROJECT Website has now been updated\n"
