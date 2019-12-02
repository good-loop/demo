# !/bin/env bash

WATCH=$1
GOTINOTIFYTOOLS=`which inotifywait`
DIR=`pwd`;
PROJECT=`basename $DIR`
echo "PROJECT: $PROJECT"

PROJECTPATH=$DIR

# declare associative arrays
declare -A WEB
declare -A TOPLESS

# populate them
WEB[demo]=$PROJECTPATH/web-demo # non-standard!
WEB[test]=$PROJECTPATH/web-test # non-standard!

# the TOPLESS files are the top level files referenced in index.html
TOPLESS[demo]=$PROJECTPATH/src/style/demo.less;
TOPLESS[test]=$PROJECTPATH/src/style/test.less;

# define function to compile test and demo
compileAll () 
{
	# run through files
	for key in "${!TOPLESS[@]}"; do
		infile="${TOPLESS[$key]}";
		if [ -e "$infile" ]; then
			outdir="${WEB[$key]}"/style
			echo -e "converting $infile"
			outfile=main.css
			echo lessc "$infile" "$outdir/$outfile"
			lessc "$infile" "$outdir/$outfile"
		else
			echo "less file not found: $infile"
		fi
	done
}

# call it immediately
compileAll

# watch?
if [[ $WATCH == 'watch' ]]; then
	if [ "$GOTINOTIFYTOOLS" = "" ]; then
		echo "In order to watch and continuously convert less files, you will first need to install inotify-tools on this system"
		echo ""
		echo "run sudo apt-get install inotify-tools in order to install"
		exit 0
	else
	while true
	do
		# block until filesystem change detected
		inotifywait -r -e modify,attrib,close_write,move,create,delete $PROJECTPATH/src/style && \
		# then call compile function
		compileAll
	done
	fi
fi
